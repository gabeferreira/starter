// Gulpfile

// Require all plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css');

var jsSources = [
	// Lib
	'src/scripts/lib/signals.min.js',
	'src/scripts/lib/crossroads.min.js',
	'src/scripts/lib/hasher.min.js',
	// Functions
	'src/scripts/variables.js',
	'src/scripts/db.js',
	'src/scripts/preloader.js',
	'src/scripts/launcher.js',
	'src/scripts/page-loader.js',
	'src/scripts/routes.js',
	'src/scripts/console.js',
]

gulp.task('html', function() {
	gulp.src('src/index.html')
	.pipe(gulp.dest('www'))
	.pipe(connect.reload())
});

gulp.task('assets', function() {
	gulp.src(['src/fonts/**/*','src/img/**/*'], {
		base: 'src'
	})
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
})

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('app.js'))
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
});

gulp.task('sass', function() {
	gulp.src('src/styles/styles.scss')
	.pipe(sass({style: 'expanded'}))
	.pipe(gulp.dest('src/styles/css'))
});

gulp.task('css', function() {
	gulp.src('src/styles/css/styles.css')
	.pipe(cleanCSS())
	.pipe(concat('main.css'))
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
});

gulp.task('connect', function() {
	connect.server({
		root: 'www',
		livereload: true
	})
});

gulp.task('watch', function() {
	gulp.watch('src/scripts/*.js', ['js']);
	gulp.watch('src/styles/*.scss', ['sass','css']);
	gulp.watch('src/index.html', ['html']);
});

// Run main gulp task
gulp.task('default', ['html', 'assets', 'js', 'sass', 'css', 'connect', 'watch']);