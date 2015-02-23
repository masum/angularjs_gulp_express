'use strict';

var gulp = require('gulp');

/**
 * 利用パスの定義
 * @type {{src: string, dist: string, tmp: string, e2e: string}}
 */
gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 * ./gulpフォルダ内を各ファイルをGulpファイルとして読み込む
 */
require('require-dir')( './gulp', { recurse: true } );


/**
 * 「default」タスク
 *
 *  「clean」タスク実行後に、「buld」タスクを実行する
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
