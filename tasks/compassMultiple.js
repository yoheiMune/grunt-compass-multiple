

module.exports = function(grunt) {

  // require modules.
  var exec = require('child_process').exec;
  var glob = require('glob');


  // compass task works at multi threads.
  var comileCompassAtMultiThread = function(sassDir, cssDir, cb) {
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
            var cmd = 'compass compile %targetFile% --sass-dir=%sassDir% --time --css-dir=%cssDir%';
            cmd = cmd.replace('%targetFile%', filePath);
            cmd = cmd.replace('%sassDir%', sassDir);
            cmd = cmd.replace('%cssDir%', cssDir);
            //console.log('cmd: ', cmd);

            exec(cmd, function(error, stdout, stderr) {
              if (!error) {
                stdout && console.log('stdout: ', stdout);
                stderr && console.log('stderr: ', stderr);
              } else {
                console.log('error: ', error);
                console.log('error.code: ', error.code);
                console.log('error.signal: ', error.signal);
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
      comileCompassAtMultiThread(sassDir, cssDir, function(success) {
        // calc execute time.
        var diff = new Date().getTime() - startDate.getTime();
        console.log('execTime: ' + diff + 'ms');
        done(success);
      });


    } else {

      var multiple = options.multiple;
      console.log('multiple: ', multiple);

      var targetCount = multiple.length;
      var doneCount = 0;
      for (var i = 0; i < multiple.length; i++) {
        var opt = multiple[i];
        comileCompassAtMultiThread(opt.sassDir, opt.cssDir, function(success) {

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