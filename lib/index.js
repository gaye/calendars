'use strict';

var WorkerProxy = require('./worker_proxy');

var worker;

exports.initialize = function(url) {
  worker = new WorkerProxy(url);
};

exports.getAccount = function(account, preset) {
  return worker.callWithArgs('getAccount', [account, preset])
  .then(function(response) {
    console.log(response);
  });
};
