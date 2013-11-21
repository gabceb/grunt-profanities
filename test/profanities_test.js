'use strict';

var grunt = require('grunt');
var profanities = require('../tasks/profanities');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.profanities = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var code = grunt.file.read('test/fixtures/bad_code.js');
    
    test.equal("a", code, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var comments = grunt.file.read('test/fixtures/bad_comments.js');
    test.equal("a", comments, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
