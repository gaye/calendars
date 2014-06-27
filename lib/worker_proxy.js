'use strict';

/**
 * @param {String} workerUrl url for worker javascript.
 */
function WorkerProxy(workerUrl) {
  this.next = 0;
  this.worker = new Worker(workerUrl);
}
module.exports = WorkerProxy;

WorkerProxy.prototype = {
  /**
   * Function call id.
   * @type {Number}
   */
  next: null,

  /**
   * @type {Worker}
   */
  worker: null,

  /**
   * @param {String} method name of function to call.
   * @param {Array.<Transferable>} args arguments to pass to function.
   * @return {Promise} promise will resolve with response from worker.
   */
  callWithArgs: function(method, args) {
    var next = this.next,
        worker = this.worker;
    worker.postMessage({ id: next, method: method, args: args });
    this.next += 1;

    return new Promise(function(resolve, reject) {
      worker.addEventListener('message', function onmessage(event) {
        var data = event.data;

        if (!('id' in data)) {
          // We can't match this message to a procedure call :(
          var errorMessage = 'response' in data ?
            'Worker message ' + data.response + ' missing id!' :
            'Worker message ' + data + ' missing id and response!';
          return reject(new Error(errorMessage));
        }

        if (data.id !== next) {
          // This is a response to a different procedure call.
          return;
        }

        // Stop listening for our response since we've received it.
        worker.removeEventListener('message', onmessage);

        var callback = event.response instanceof Error ? reject : resolve;
        callback.call(null, event.response);
      });
    });
  }
};
