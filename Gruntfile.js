module.exports = function ( grunt ) {
		// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
			},
			dist: {
				files: {
					"js/<%= pkg.name %>.min.js": [ "js/jquery.autotabs.js" ]
				}
			}
		},

		jshint: {
			dist: {
				src: [ "js/jquery.autotabs.js" ],
				jshintrc: ".jshintrc"
			},

			grunt: {
				src: [ "Gruntfile.js" ]
			}
		},

		watch: {
			files: [ "<%= jshint.files %>" ],
			tasks: [ "jshint" ]

		},

		jsonlint: {
			jquery: {
				src: [ "autotabs.jquery.json" ]
			}
		},

		csslint: {
			dist: {
				src: [ "css/jquery.autotabs.css", "css/jquery.autotabs.vertical.css" ],
				options: {
					"adjoining-classes": false,
					"box-sizing": false
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks( "grunt-contrib-csslint" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-jsonlint" );

	// Default task(s).
	grunt.registerTask( "default", [ "jshint" ] );

};