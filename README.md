[![build status](https://secure.travis-ci.org/jharding/grunt-exec.png)](http://travis-ci.org/jharding/grunt-exec)
grunt-compass-multiple
==========

> Grunt plugin for compiling compass files at multi threads.

Getting Started
---------------

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-compass-multiple`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-compass-multiple');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

Documentation
-------------

This plugin is a compiling compass files at multi threads, so you can save build time.


### Example

```javascript
grunt.initConfig({

  compassMultiple: {
    // you can set compass options. but not work now. sorry..
    options : {
          imagesDir: '',
          time: true
    },

    // you can specify compiling target as options.sassDir, and output dir as options.cssDir.
    common : {
      options: {
        sassDir: 'page/css/cmn/mxm.css/_temp/',
        cssDir: '../stat/page/css/cmn/'
      }
    },

    // you can multiple sassDir and cssDir, using multiple options.
    all: {
      options: {
        multiple: [
          {
          sassDir: 'page/css/cmn/mxm.css/_temp/',
          cssDir: '../stat/page/css/cmn/'
          },{
          sassDir: 'page/css/orgn/scss',
          cssDir: '../stat/page/css/orgn/'
          }
        ]
      }
    }
  }
});
```

License
-------

Copyright (c) 2013 Yohei Munesada
Licensed under the MIT license.
