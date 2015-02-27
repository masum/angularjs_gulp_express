'use strict';

var gulp = require('gulp');

/**
 * gulpfile.js で定義した各種パスを paths変数にセット
 */
var paths = gulp.paths;

/**
 * node_modulee配下のGulpプラグインをすべて読み込み、$.xxx へ割り当てる
 */
var $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'main-bower-files',
    'uglify-save-license',
    'del',
    'jshint-stylish'
  ]
});

/**
 * 「partials」タスク
 * app/components配下のhtmlファイルをAngularJSのキャッシュ化
 */
gulp.task('partials', function () {
  return gulp.src([
    paths.client + '/{app,components}/**/*.html',
    paths.tmp + '/{app,components}/**/*.html'
  ])
  .pipe($.minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  }))
  .pipe($.angularTemplatecache('templateCacheHtml.js', {
    module: 'systemFactoryService'
  }))
  .pipe(gulp.dest(paths.tmp + '/partials/'));
});

/**
 * 「lint」タスク
 */
gulp.task('lint', function() {
  return gulp.src([paths.client + '/**/*.js', paths.server + '/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    //.pipe($.jshint.reporter('fail'));
});

/**
 * 「html」タスク
 */
gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(
    paths.tmp + '/partials/templateCacheHtml.js',
    { read: false }
  );
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.tmp + '/partials',
    addRootSlash: false
  };

  var assets = $.useref.assets();

  return gulp.src(paths.tmp + '/serve/*.html')

    // partialsタスクでまとめられたキャッシュJSファイルを注入
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))

    // ストリームの対象をassetsに変更
    //.pipe(assets = $.useref.assets())
    .pipe(assets)

    // ファイル名にmd5の暗号化文字列を８文字付加
    .pipe($.rev())

    .pipe($.if('*.js', $.ngAnnotate()))

    // JSを圧縮
    .pipe($.if('*.js', $.uglify({preserveComments: $.uglifySaveLicense})))

    // CSSを圧縮
    .pipe($.if('*.css', $.csso()))

    // ストリームの対象を戻す
    .pipe(assets.restore())

    // HTML内のcssやjs読み込みを1つにまとめる
    .pipe($.useref())

    // app.js などの名前を app-xxxxx.js という名前に置換
    .pipe($.revReplace())

    // HTMLファイルを軽量化
    .pipe($.if('*.html', $.minifyHtml({
      empty: true, // do not remove empty attributes
      spare: true, // do not remove redundant attributes
      quotes: true // do not remove arbitrary quotes
    })))

    // distへコピー
    .pipe(gulp.dest(paths.dist + '/public/'))

    // ファイルのサイズを出力
    .pipe($.size({ title: paths.dist + '/public/', showFiles: true }));
});

/**
 * 「web」タスク
 *  サーバーアプリをdistにコピーする
 */
gulp.task('web', function () {
  return gulp.src(paths.server + '/**/*')
    // JSを圧縮
    .pipe($.if('*.js', $.uglify({preserveComments: $.uglifySaveLicense})))
    // CSSを圧縮
    .pipe($.if('*.css', $.csso()))

    .pipe(gulp.dest(paths.dist + '/server/'));
});

/**
 * 「images」タスク
 *  imagesフォルダ内の画像ファイルをdistにコピーする
 */
gulp.task('images', function () {
  return gulp.src(paths.client + '/assets/images/**/*')
    .pipe(gulp.dest(paths.dist + '/public/assets/images/'));
});

/**
 * 「font」タスク
 * Web fontをdistにコピーする
 */
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/public/fonts/'));
});

/**
 * 「misc」タスク
 * アイコンフィ有るをdistへコピーする
 */
gulp.task('misc', function () {
  return gulp.src(paths.client + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/public'));
});

/**
 * 「clean」タスク
 * distフォルダ、.tmpフォルダをクリアする
 */
gulp.task('clean', function (done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

/**
 * 「build」タスク
 */
gulp.task('build', ['html', 'lint', 'web', 'images', 'fonts', 'misc']);
