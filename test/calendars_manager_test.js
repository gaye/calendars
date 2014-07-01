/* global calendars, chai */
'use strict';

var assert = chai.assert;

describe('CalendarsManager', function() {
  var manager;

  beforeEach(function() {
    manager = new calendars.CalendarsManager();
  });

  it('constructor', function() {
    assert.instanceOf(manager, calendars.CalendarsManager);
  });

  describe('#echo', function() {
    it('should return arguments', function() {
      return manager.echo(4, 'b', 'c', 1, 2, 'e')
      .should.eventually.deep.equal([4, 'b', 'c', 1, 2, 'e']);
    });
  });
});
