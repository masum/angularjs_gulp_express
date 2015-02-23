'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles'], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/{app,components}/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.client + '/{app,components}/**/*.js',
    '!' + paths.client + '/{app,components}/**/*.spec.js',
    '!' + paths.client + '/{app,components}/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.client, paths.tmp + '/serve'],
    addRootSlash: false
  };

  /**
   * Bower依存ファイルを注入するオプションを指定
   */
  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [/bootstrap\.js/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
  };

  console.log("a");
  return gulp.src(paths.client + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))  // 依存するCSSファイルを注入
    .pipe($.inject(injectScripts, injectOptions)) // 依存するJSファイルを注入
    .pipe(wiredep(wiredepOptions))                // 依存するBowerファイルを注入
    .pipe(gulp.dest(paths.tmp + '/serve'));       // 結果を tmp/serve へコピー
});
