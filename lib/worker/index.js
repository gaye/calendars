/**
 * @fileoverview web worker script.
 */
'use strict';

var dav = require('dav'),
    ical = require('jsical'),
    proxy = require('./proxy');

proxy({
  getAccount: function(credentials) {
    // TODO(gareth)
  },

  findCalendars: function(account) {
    // TODO(gareth)
  },

  syncEvents: function(calendar) {
    // TODO(gareth)
  },

  createEvent: function(event) {
    // TODO(gareth)
  },

  updateEvent: function(event, busytime) {
    // TODO(gareth)
  },

  deleteEvent: function(event, busytime) {
    // TODO(gareth)
  },

  ensureRecurrencesExpanded: function(date) {
    // TODO(gareth)
  }
});
