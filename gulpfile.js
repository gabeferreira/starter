// Gulpfile

// Require all plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass')(require('sass')),
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

gulp.task('html', function(done) {
	gulp.src('src/index.html')
	.pipe(gulp.dest('www'))
	.pipe(connect.reload())
	done();
});

gulp.task('assets', function(done) {
	gulp.src(['src/fonts/**/*','src/img/**/*'], {
		base: 'src'
	})
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
	done();
})

gulp.task('js', function(done) {
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('app.js'))
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
	done();
});

gulp.task('sass', function(done) {
	gulp.src('src/styles/styles.scss')
	.pipe(sass({style: 'expanded'}))
	.pipe(gulp.dest('src/styles/css'))
	done();
});

gulp.task('css', function(done) {
	gulp.src('src/styles/css/styles.css')
	.pipe(cleanCSS())
	.pipe(concat('main.css'))
	.pipe(gulp.dest('www/assets'))
	.pipe(connect.reload())
	done();
});

gulp.task('connect', function(done) {
	connect.server({
		root: 'www',
		livereload: true
	})
	done();
});

gulp.task('watch', function(done) {
  gulp.watch('src/scripts/*.js', gulp.series('js'));
  gulp.watch('src/styles/*.scss', gulp.series('sass','css'));
  gulp.watch('src/index.html', gulp.series('html'));
  done();
});

// Run main gulp task
gulp.task('default', gulp.series(gulp.parallel('html', 'assets', 'js', 'sass', 'css', 'connect', 'watch')));