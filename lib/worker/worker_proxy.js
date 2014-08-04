'use strict';

/**
 * @param {Worker} worker web worker to proxy.
 */
function WorkerProxy(worker) {
  this.worker = worker;
  this.nextId = 0;
}
module.exports = WorkerProxy;

WorkerProxy.prototype = {
  /**
   * @param {String} method name of function to call.
   * @param {arguments} args arguments to pass to function.
   * @return {Promise} promise will resolve with response from worker.
   */
  callWithArgs: function(method, args) {
    var next = this.nextId++,
        worker = this.worker;

    worker.postMessage({
      id: next,
      method: method,
      args: Array.prototype.slice.call(args)
    });

    return new Promise(function(resolve, reject) {
      worker.addEventListener('message', function onmessage(event) {
        var data = event.data;
        if (data.id !== next) {
          // This is a response to a different procedure call.
          return;
        }

        // Stop listening for our response since we've received it.
        worker.removeEventListener('message', onmessage);

        if (data.response instanceof Error) {
          return reject(data.response);
        }

        resolve(data.response);
      });
    });
  }
};
