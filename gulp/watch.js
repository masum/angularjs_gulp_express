'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {
  gulp.watch([
    paths.client + '/*.html',
    paths.client + '/{app,components}/**/*.styl',
    paths.client + '/{app,components}/**/*.js',
    'bower.json'
  ], ['inject']);
});
