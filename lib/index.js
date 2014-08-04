'use strict';
var worker = require('./worker');

var proxy = new worker.WorkerProxy(new Worker('./worker/main.js'));

exports.initialize = function() {
};

exports.echo = function() {
  return proxy.callWithArgs('echo', arguments);
};

/**
 * Options:
 *
 *   (Boolean) local
 *   (String) user
 *   (String) password
 *   (String) url
 *   (String) clientId
 *   (String) clientSecret
 *   (String) authorizationCode
 *   (String) redirectUrl
 *   (String) tokenUrl
 */
exports.getAccount = function(options) {
};

/**
 * Options:
 *
 *   (String) title
 *   (String) location
 *   (String) description
 *   (Boolean) isAllDay
 *   (Date) startDate
 *   (Date) endDate
 *   (Array) alarms
 *   (String) repeat
 */
exports.createEvent = function(calendarObject, options) {
};

exports.expandOccurrences = function() {
};
