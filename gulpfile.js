const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');


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
}

// Создание дев-сервера
function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    })
}

exports.build = series(cleanDist, parallel([buildSass, buildHtml, copy]));
exports.default = series(buildSass, parallel(createDevServer, serve));