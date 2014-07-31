/* global calendars, chai */
'use strict';

describe('calendars', function() {
  describe('#echo', function() {
    it('should return arguments', function() {
      return calendars.echo(4, 'b', 'c', 1, 2, 'e')
      .should
      .eventually
      .deep
      .equal([4, 'b', 'c', 1, 2, 'e']);
    });
  });
});
