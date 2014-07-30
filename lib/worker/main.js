/**
 * @fileoverview main web worker script.
 */
'use strict';
var proxy = require('./proxy');

proxy({
  echo: function() {
    var result = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve) {
      resolve(result);
    });
  }
});
