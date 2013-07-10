/*
  grunt-compass-multiple
*/
(function() {


  module.exports = function(grunt) {


    // require modules.
    var exec = require('child_process').exec;
    var glob = require('glob');
    var util = require('util');


    // compass task works at multi threads.
    var comileCompassAtMultiThread = function(options, cb) {

      // if no sassDir or files are not identify, error.
      if (!options.sassDir) {
        grunt.log.error('compass-multiple needs sassDir for searching scss files.');
        cb(false);
      }

      // search scss files.(Additional Implementation)
      if (options.sassFiles) {

        var pathes = options.sassFiles;
        var pathesCount = pathes.length;
        var currentCount = 0;
        var files = [];
        for (var i = 0; i < pathes.length; i++) {
          glob(pathes[i], function(error, tmpFiles) {
            if (error) {
              console.log('error: ', error);
              cb(false);
            }

            files = files.concat(tmpFiles);
            currentCount++;
            if (pathesCount === currentCount) {
              // compass compile.
              grunt.log.writeln('pathes: ', files);
              compileFiles(options, files, cb);
            }
          });
        }




      } else {  // use sassDir


        var searchPath = options.sassDir + '/**/*.scss';
        glob(searchPath, function(error, files) {
          if (error) {
            console.log('error: ', error);
            cb(false);
          }

          // compass compile.
          compileFiles(options, files, cb);
        });




      }
    };


    var compileFiles = function(options, files, cb) {

      // variable for judge finish.
      var targetCount = files.length;
      var doneCount = 0;

      // compass compile pallalel;
      for (var i = 0; i < files.length; i++) {
        var filePath = files[i];

        // skip if the file is private.
        var fragment = filePath.split('/');
        var fileName = fragment[fragment.length - 1];
        if (fileName.indexOf('_') === 0) {
          doneCount++;
          // console.log('skip to compile. target is private file: ', filePath);
          continue;
        }

        // compile scss file.
        var cmd = buildCommand(filePath, options);
        exec(cmd, function(error, stdout, stderr) {
          if (!error) {
            stdout && console.log('stdout: ', stdout);
          } else {
            console.log('error: ', error);
            console.log('stdout: ', stdout);
            cb(false);
          }

          // judge end.
          doneCount++;
          if (doneCount === targetCount) {
            cb(true);
          }
        });
      }

    };

    var buildCommand = function(filePath, options) {
      var cmd = util.format('compass compile %s', filePath);
      if (options.config) {
        cmd = util.format('%s --config=%s', cmd, options.config);
      } else {
        options.sassDir && (cmd = util.format('%s --sass-dir=%s', cmd, options.sassDir));
        options.cssDir && (cmd = util.format('%s --css-dir=%s', cmd, options.cssDir));
        options.imagesDir && (cmd = util.format('%s --images-dir=%s', cmd, options.imagesDir));
        options.javascriptsDir && (cmd = util.format('%s --javascripts-dir=%s', cmd, options.javascriptsDir));
        options.fontsDir && (cmd = util.format('%s --fonts-dir=%s', cmd, options.fontsDir));
        options.environment && (cmd = util.format('%s --environment=%s', cmd, options.environment));
        options.outputStyle && (cmd = util.format('%s --output-style=%s', cmd, options.outputStyle));
        options.importPath && (cmd = util.format('%s -I %s', cmd, options.importPath));
        options.relativeAssets && (cmd = util.format('%s --relative-assets', cmd));
        options.time && (cmd = util.format('%s --time', cmd));
        options.debugInfo && (cmd = util.format('%s --debug-info', cmd));
      }

      // console.log('cmd: ', cmd);
      return cmd;
    };






    /*
      regist task for grunt.
    */
    grunt.registerMultiTask('compassMultiple', 'Compass compile at multi threads.', function() {

      // start date.
      var startDate = new Date();

      // async done.
      var done = this.async();

      // get options.
      var options = this.options();

      // identify compiling targets.
      if (!options.multiple) {
        var sassDir = options.sassDir;
        var cssDir = options.cssDir;
        comileCompassAtMultiThread(options, function(success) {
          // calc execute time.
          var diff = new Date().getTime() - startDate.getTime();
          console.log('execTime: ' + diff + 'ms');
          done(success);
        });


      } else {

        var multiple = options.multiple;

        var targetCount = multiple.length;
        var doneCount = 0;
        for (var i = 0; i < multiple.length; i++) {
          var opt = multiple[i];
          opt.environment === undefined && (opt.environment = options.environment);
          opt.outputStyle === undefined && (opt.outputStyle = options.outputStyle);
          opt.javascriptsDir === undefined && (opt.javascriptsDir = options.javascriptsDir);
          opt.imagesDir === undefined && (opt.imagesDir = options.imagesDir);
          opt.fontsDir === undefined && (opt.fontsDir = options.fontsDir);
          opt.importPath === undefined && (opt.importPath = options.importPath);
          opt.relativeAssets === undefined && (opt.relativeAssets = options.relativeAssets);
          opt.time === undefined && (opt.time = options.time);
          opt.debugInfo === undefined && (opt.debugInfo = options.debugInfo);


          comileCompassAtMultiThread(opt, function(success) {

            if (!success) {
              done(false);
            }

            doneCount++;
            if (doneCount == targetCount) {
              // calc execute time.
              var diff = new Date().getTime() - startDate.getTime();
              console.log('execTime: ' + diff + 'ms');
              done(true);
            }
          });
        }
      }
    });




  };

})();