/*
 * grunt-profanities
 * https://github.com/gabceb/grunt-profanities
 *
 * Copyright (c) 2013 Gabriel Cebrian
 * Licensed under the MIT license.
 */

'use strict';

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

module.exports = function(grunt) {

  grunt.registerMultiTask('profanities', 'Grunt task for checking the use of profanities in your code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: ', '
    });

    var profanitiesWords = grunt.file.readJSON("lib/profanities/en.json");
    var profanityArr = [];

    profanitiesWords.words.forEach(function(word){
      profanityArr.push(RegExp.escape(word));
    });

    // Create the regexp with the global and the case insensitive modifiers
    var profanitiesRegex = new RegExp(profanityArr.join("|", "gi"));

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.writeln('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      var profanities = profanitiesRegex.exec(src);

      if(profanities === null)
      {
        grunt.log.ok();
      }
      else
      {
        profanities.forEach(function(profanity){
          grunt.log.error('The word "' + profanity + '" was found.');
        });

        var profanityCount = profanities.length;

        grunt.fail.warn(profanityCount + " profanit" + (profanityCount > 1 ? "ies were" : "y was") + " found on your file" + (profanityCount > 1 ? "s" : "") + "." );
      }

    });
  });

};
