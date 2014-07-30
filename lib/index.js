'use strict';
var worker = require('./worker');

var proxy = new worker.WorkerProxy(new Worker('./worker/main.js'));

exports.echo = function() {
  return proxy.callWithArgs('echo', arguments);
};
