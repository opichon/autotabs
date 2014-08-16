var gulp = require('gulp');

var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var jsonlint = require('gulp-json-lint');
var mainBowerFiles = require('main-bower-files');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('bower-files', function() {
	return gulp.src(mainBowerFiles({
			includeDev: true
		}))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('uglify', function() {
	gulp.src('./src/*.js')
		.pipe(uglify())
		.pipe(rename('jquery.autotabs.min.js'))
		.pipe(gulp.dest('dist/js'))
});

gulp.task('jshint', function() {
	gulp.src('./src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
 });

gulp.task('jsonlint', function() {
	gulp.src('./autotabs.jquery.json')
		.pipe(jsonlint())
		.pipe(jsonlint.report('verbose'));
});

gulp.task('csslint', function() {
	gulp.src('./css/*.css')
	.pipe(csslint())
	.pipe(csslint.reporter());
});

gulp.task('minify-css', function() {
	gulp.src('./css/*.css')
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(rename({
			'suffix' : '.min'
		}))
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('build', function() {
	gulp.src('./src/jquery.autotabs.js')
		.pipe(gulp.dest('./dist/js'));

	gulp.src('./css/*.css')
		.pipe(gulp.dest('./dist/css'));

});

gulp.task('default', ['uglify', 'minify-css', 'bower-files', 'build']);
