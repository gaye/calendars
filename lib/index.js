'use strict';

var WorkerProxy = require('./worker_proxy');

var worker;

exports.initialize = function(url) {
  worker = new WorkerProxy(url);
};

exports.getAccount = function(credentials) {
  // TODO(gareth)
};

exports.findCalendars = function(account) {
  // TODO(gareth)
};

exports.syncEvents = function(calendar) {
  // TODO(gareth)
};

exports.createEvent = function(event) {
  // TODO(gareth)
};

exports.updateEvent = function(event, busytime) {
  // TODO(gareth)
};

exports.deleteEvent = function(event, busytime) {
  // TODO(gareth)
};

exports.ensureRecurrencesExpanded = function(date) {
  // TODO(gareth)
};
