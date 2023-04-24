const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');

// Таск компиляции SASS в CSS
function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                }),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());;
}

// Таск работы с html файлами
function buildHtml() {
    return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());;
}

function buildJs() {
    return src('src/js/index.js')
      .pipe(webpackStream(require('./webpack.config')))
      .pipe(rename('bundle.min.js'))
      .pipe(dest('src/js'))
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream());
  }

// Таск копирования статичных файлов
function copy() {
    return src(['src/image/**/*.*'], { base: 'src' }).pipe(dest('dist'));
}

// Таск очистки dist
function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

// Таск отслеживания изменения файлов
function serve() {
    watch('src/scss/**/*.scss', buildSass);
    watch('src/**/*.html', buildHtml);
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
}

// Создание дев-сервера
function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    })
}

exports.build = series(cleanDist, parallel([buildSass, buildJs, buildHtml, copy]));
exports.default = series(buildSass, buildJs, parallel(createDevServer, serve));