

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-compass-multiple');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

			//--------------------------
			// compass comile at multi threads.
			//--------------------------
			compassMultiple: {
				options : {
					javascriptsDir: 'js',
			      	imagesDir: 'img',
					sassDir: 'css/scss',
					cssDir: 'css',
					relativeAssets: true,
				},

				// Test: Basic
				basic: {},

				// Test: Additional Options
				manyOptions: {
					options: {
						environment: 'production',
						fontsDir: 'css/font',
						importPath: 'css/scss/frameworks',
						time: true,
					}
				},


				// Test: Additional Options2
				manyOptions2: {
					options: {
						debugInfo: true,
					}
				},


				// TEST: Multi Task
			    multiTask: {
			    	options: {
			    		multiple: [
			    			{
				    			// common
									sassDir: 'css/scss',
									cssDir: 'css'
			    			},{
			    				// orginal
									sassDir: 'css2/scss',
									cssDir: 'css2'
			    			}
			    		]
			    	}
			    },

			    // TEST: sassFiles option
			    sassFilesTest: {
			    	options: {
			    		sassDir: 'css3/scss',
			    		sassFiles: ['css3/scss/sample*.scss', 'css3/scss/hoge*.scss'],
			    		cssDir: ['css3/css'],
			    	}
			    }
			},


			//--------------------------
			// watch
			//--------------------------
			watch: {
				dev: {
					files: [
						'./Gruntfile.js',
						'./css/scss/*.scss',
						'./css2/scss/.scss',
						'./node_modules/**/*.js',
					],
					tasks: [
						'compassMultiple'
					]
				}
			},

	});

	grunt.registerTask('default', ['compassMultiple']);
};