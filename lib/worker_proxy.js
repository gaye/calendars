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
        if (data.id !== nextCall) {
          // This is a response to a different procedure call.
          return;
        }

        // Stop listening for our response since we've received it.
        worker.removeEventListener('message', onmessage);

        if (event.response instanceof Error) {
          return reject(event.response);
        }

        resolve(event.response);
      });
    });
  }
};
