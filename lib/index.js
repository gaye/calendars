'use strict';

var worker = require('./worker');

function CalendarsManager() {
  this.worker = new worker.WorkerProxy(new Worker('./worker/main.js'));
}
exports.CalendarsManager = CalendarsManager;

CalendarsManager.prototype = {
  echo: function() {
    return this.worker.callWithArgs('echo', arguments);
  }
};
