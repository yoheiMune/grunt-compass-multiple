

module.exports = function(grunt) {

  // require modules.
  var exec = require('child_process').exec;
  var glob = require('glob');
  var util = require('util');


  // compass task works at multi threads.
  var comileCompassAtMultiThread = function(options, sassDir, cssDir, cb) {
    if (sassDir) {
      glob(sassDir + '/**/*.scss', function(error, files) {
        if (error) {
          console.log('error: ', error);
          cb(false);
        } else {
          // console.log('files: ', files);

          var targetCount = files.length;
          var doneCount = 0;


          // compass compile pallalel;
          for (var i = 0; i < files.length; i++) {
            var filePath = files[i];

            // skip if the file is private.
            var fragment = filePath.split('/');
            var fileName = fragment[fragment.length - 1];
            if (fileName.indexOf('_') === 0) {
              console.log('skip to compile. target is private file: '. filePath);
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
        }
      });
    }
  }

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
      options.time && (cmd = util.format('%s --time', cmd));
    }

    // console.log('cmd: ', cmd);
    return cmd;
  };


  // regist grunt multiple task.
  grunt.registerMultiTask('compassMultiple', 'Compass compile at multi threads.', function() {

    // start date.
    var startDate = new Date();

    // async done.
    var done = this.async();

    // get options.
    var options = this.options();

    // コンパイル対象のファイルを取得する。
    if (!options.multiple) {
      var sassDir = options.sassDir;
      var cssDir = options.cssDir;
      console.log(sassDir);
      comileCompassAtMultiThread(options, sassDir, cssDir, function(success) {
        // calc execute time.
        var diff = new Date().getTime() - startDate.getTime();
        console.log('execTime: ' + diff + 'ms');
        done(success);
      });


    } else {

      var multiple = options.multiple;
      // console.log('multiple: ', multiple);

      var targetCount = multiple.length;
      var doneCount = 0;
      for (var i = 0; i < multiple.length; i++) {
        var opt = multiple[i];
        comileCompassAtMultiThread(opt, opt.sassDir, opt.cssDir, function(success) {

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