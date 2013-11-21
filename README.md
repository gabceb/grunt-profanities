# grunt-profanities

> Grunt task for checking the use of profanities in your code

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-profanities --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-profanities');
```

## The "profanities" task

### Overview
In your project's Gruntfile, add a section named `profanities` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  profanities: {
    options: {
      // Task-specific options go here.
    },
    src: {
      // Array of file lists go here.
    },
  },
})
```

### Options

### Usage Examples

#### Default Options

```js
// bad_comment.js

// This crap always work
function(a){
  alert("This function has a nasty comment");
};

```

```js
// Gruntfile.js

grunt.initConfig({
  profanities: {
    options: {},
    src: {
      ['test/bad_coment.js']
    },
  },
})
```

### TO DO

- Finish implementing exlude_words and any other options
- Add ability to add profanities in different languages by having multiple profanities files
- Show file and line where the profanity was discovered

### ZOMG Fork! Thank you!

You're welcome to fork this project and send pull requests. Please run `grunt` to make sure all file have lint check.

Copyright (c) 2013 Gabriel Cebrian, released under the MIT license. Original profanity list copied from https://github.com/web-mech/badwords

## Release History
_(Nothing yet)_


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/gabceb/grunt-profanities/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

