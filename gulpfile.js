const browserSync = require('browser-sync').create()
const cssnano = require('cssnano')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const jsmin = require('gulp-jsmin')
const rename = require('gulp-rename')

gulp.task('elements', () => (
    gulp.src('ui-components/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe(gulp.dest('dist/ui-components'))
        // .pipe(browserSync.stream())
))


gulp.task('page', () => (
    gulp.src('index.html')
        .pipe(gulp.dest('dist'))
))


gulp.task('styles', () => (
    gulp.src('ui-components/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('dist/ui-components'))
        // .pipe(browserSync.stream())
))


gulp.task('scripts', () => (
    gulp.src('ui-components/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/ui-components'))
))


gulp.task('assets', () => (
    gulp.src('assets/*.*')
        .pipe(gulp.dest('dist/assets'))
))

gulp.task('dependencies', () => (
    gulp.src('bower_components/**/*.min.js')
        .pipe(gulp.dest('dist/polyfill'))
))


gulp.task('build', ['page', 'styles', 'scripts', 'assets', 'elements', 'dependencies'])

gulp.task('refresh', ['page', 'styles', 'scripts', 'assets', 'elements', 'dependencies'])


gulp.task('watch', ['refresh'], () => {
    gulp.watch('ui-components/**/*.scss', ['styles'])
    gulp.watch('ui-components/**/*.js', ['scripts'])
    gulp.watch('ui-components/**/*.html', ['elements'])
    gulp.watch('index.html', ['page'])

    browserSync.init({
        server: {
            baseDir: 'dist',
        },
        open: false,
    })
})
