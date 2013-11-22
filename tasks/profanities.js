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
      languages: ['en'],
      ignoreWords: []
    });

    var profanityArr = [];

    options.languages.forEach(function(lang){
      var langFile = "lib/profanities/" + lang + ".json";

      if(grunt.file.exists(langFile)){
        var profanitiesWords = grunt.file.readJSON(langFile);

        profanitiesWords.words.forEach(function(word){

          if(options.ignoreWords.indexOf(word.toLowerCase() ) === -1)
          {
            // Add the word to the global array to be added to the Regex
            profanityArr.push(RegExp.escape(word));
          }

        });
      }
      else{
        grunt.log.writeln('Language file ' + lang + ' was not found.');
      }
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
      }).join(grunt.util.normalizelf(','));

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
