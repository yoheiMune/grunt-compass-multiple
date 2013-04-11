[![build status](https://secure.travis-ci.org/jharding/grunt-exec.png)](http://travis-ci.org/jharding/grunt-exec)
grunt-compass-multiple
==========

> Grunt plugin for compiling compass files at multi threads.

Getting Started
---------------

This plugin requires Grunt ~0.4.0

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-compass-multiple`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-compass-multiple');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

Documentation
-------------

This plugin slove the problem of compass slow compile.

This provides you to compass multi threads compiling, so you can develop faster.

the statement below is how to use this plugin.

### Example

```javascript
grunt.initConfig({

  compassMultiple: {
    options : {
      // if you need, you can set options.
      environment: 'production',
      outputStyle: 'compressed',
      javascriptsDir: './js',
      imagesDir: './image',
      fontsDir: './font',
      importPath: './css/framework',
      time: true
    },

    // you can specify compiling target as options.sassDir, and output dir as options.cssDir.
    // At now, you can only set sassDir and cssDir options.
    common : {
      options: {
        // every compile needs sassDir and cssDir.
        sassDir: 'page/css/cmn/',
        cssDir: '../static/page/css/cmn/'
      }
    },

    // you can multiple sassDir and cssDir, using multiple options.
    all: {
      options: {
        multiple: [
          {
          sassDir: 'page/css/cmn/',
          cssDir: '../static/page/css/cmn/'
          },{
          sassDir: 'page/css/orgn/scss',
          cssDir: '../static/page/css/orgn/'
          }
        ]
      }
    }
  }
});
```

Or, you can use config.rb for build setting. Sample is below.

```javascript
grunt.initConfig({

  compassMultiple: {
    options : {
      // you can use config.rb for build setting.
      config: 'config.rb',
      // sassDir must be set, for identify compiling targets.
      sassDir: 'page/css/orgn/scss'
    },

    // compile task. no need any options.
    common : {},
  }
});
```



License
-------

Copyright (c) 2013 Yohei Munesada
Licensed under the MIT license.
