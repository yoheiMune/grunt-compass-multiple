


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
					cssDir: 'css'
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
			},


			//--------------------------
			// watch
			//--------------------------
			watch: {
				dev: {
					files: [
						'./Gruntfile.js',
						'./css/scss/*.scss',
						'./css2/scss/.scss'
					],
					tasks: [
						'compassMultiple'
					]
				}
			},

	});

	grunt.registerTask('default', ['compassMultiple']);
};