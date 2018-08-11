var browserSync = require('browser-sync');
var browserSyncConfig = require('tools-config-saviomd/browser-sync-config');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var pug = require('gulp-pug');
var pugConfig = require('tools-config-saviomd/pug-config');

/*
tasks
====================
*/
gulp.task('clean', function(cb) {
	return del([
			'assets',
			'*.html)'
		], cb)
});

gulp.task('html', function() {
	return gulp.src('_src/pages/**/*.pug')
		.pipe(pug(pugConfig))
		.pipe(gulp.dest('./'))
});

gulp.task('cssVendor', function() {
	return gulp.src([
			'node_modules/bootstrap/dist/css/bootstrap.css',
			'node_modules/animate.css/animate.css',
			'node_modules/font-awesome/css/font-awesome.css',
			'node_modules/hover.css/css/hover.css'
		])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('assets/css'))
});

gulp.task('jsVendor', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/popper.js/dist/umd/popper.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/holderjs/holder.min.js',
			'node_modules/wowjs/dist/wow.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('assets/js'))
});

gulp.task('fontsVendor', function() {
	return gulp.src([
			'node_modules/font-awesome/fonts/*'
		])
		.pipe(gulp.dest('assets/fonts'))
});

gulp.task('browserSync', function() {
	browserSync.init(browserSyncConfig);
});

/*
build and dev tasks
====================
*/
gulp.task('default', ['clean'], function() {
	gulp.start('html', 'cssVendor', 'jsVendor', 'fontsVendor');
});

gulp.task('dev', ['browserSync'], function() {
	gulp.watch('_src/+(data|includes|mixins|pages|templates)/**/*.pug', ['html', browserSync.reload])
});
