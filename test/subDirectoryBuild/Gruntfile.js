


module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-compass-multiple');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

			//--------------------------
			// compass comile at multi threads.
			//--------------------------
			compassMultiple: {
				options : {
					projectRoot: '..',
					javascriptsDir: 'js',
			      	imagesDir: 'img',
					sassDir: 'css/scss',
					cssDir: 'css'
				},

				// Test: Basic
				basic: {},
			},

	});

	grunt.registerTask('default', ['compassMultiple']);
};