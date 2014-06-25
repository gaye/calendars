/**
 * @fileoverview Proxy api responses to main thread from worker.
 */
'use strict';

module.exports = function(api) {
  self.addEventListener('message', function(event) {
    var data = event.data;
    if (!(data.method in api)) {
      var error = new Error(data.method + ' not implemented in worker!');
      return self.postMessage({ id: event.id, response: error });
    }

    return api[data.method]
    .then(function(value) {
      self.postMessage({ id: event.id, response: value });
    })
    .catch(function(error) {
      self.postMessage({ id: event.id, response: error });
    });
  });
};
