'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');
var browserSync = require('browser-sync');
var middleware = require('./proxy');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var server = require('gulp-express')

/**
 * サーバー処理および、クライアント処理の実行
 * @param baseDir
 * @param files
 * @param browser
 */
function syncClient(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.client || (util.isArray(baseDir) && baseDir.indexOf(paths.client) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });
}


/**
 * 「express」タスク
 */
gulp.task('express', function() {
  livereload.listen();

  nodemon({
    script: paths.server + '/bin/www',
    ext: 'html js css',
    ignore: ['ignored.js', 'node_modules', 'bower_components'] })
    .on('start', function () {
      console.log('started!');
      livereload.changed();
    });
});

/**
 * 「serve」タスク
 */
gulp.task('serve', ['express', 'watch'], function () {
  syncClient([
    paths.tmp + '/serve',
    paths.client
  ], [
    paths.tmp + '/serve/{app,components}/**/*.css',
    paths.client + '/{app,components}/**/*.js',
    paths.client + '/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/{app,components}/**/*.html',
    paths.client + '/{app,components}/**/*.html'
  ]);
});

/**
 * 「serve:dist」タスク
 */
gulp.task('serve:dist', ['build'], function () {
  syncClient(paths.dist);
});

/**
 * 「serve:e2e」タスク
 */
gulp.task('serve:e2e', ['inject'], function () {
  syncClient([paths.tmp + '/serve', paths.client], null, []);
});

/**
 * 「serve:e2e-dist」タスク
 */
gulp.task('serve:e2e-dist', ['build'], function () {
  syncClient(paths.dist, null, []);
});
