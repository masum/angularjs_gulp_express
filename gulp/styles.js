'use strict';
/**
 * Stylus(.styl)をコンパイルする
 */

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

  var injectFiles = gulp.src([
    paths.client + '/{app,components}/**/*.styl',
    '!' + paths.client + '/app/index.styl',
    '!' + paths.client + '/app/vendor.styl'
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(paths.client + '/app/', '');
      filePath = filePath.replace(paths.client + '/components/', '../components/');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.styl');

  return gulp.src([
    paths.client + '/app/index.styl',
    paths.client + '/app/vendor.styl'
  ])
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.stylus())

  .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
