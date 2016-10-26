/**
 * Created by Suhov on 26.10.2016.
 */

'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
	browserSync = require('browser-sync');

gulp.task('sass', function(){
	return gulp.src('app/css/*.scss')
		.pipe(sass()) // используем gulp-sass
		.pipe(autoprefixer())		// если проект делается несколькими людьми
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});
gulp.task('html', function(){
	return gulp.src("./app/*.html")
		.pipe(gulp.dest("./dist"))
		.pipe(browserSync.reload({
			stream: true
		}))
});
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
	})
});
gulp.task('watch', ['browserSync', 'html', 'sass'], function (){
	gulp.watch('app/css/*.scss', ['sass']);
	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/css/*.scss', browserSync.reload);
	// gulp.watch('app/js/**/*.js', browserSync.reload);
});