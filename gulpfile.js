const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', function () {
  watch(['./build/*.html', './build/css/**/*.css'],
    gulp.parallel(browserSync.reload))
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  })
});

gulp.task('scss', function (callback) {
  return gulp.src("./build/scss/style.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions']
    }))
    .pipe(gulp.dest("./build/css/"));
  callback();
});



gulp.task('default', gulp.parallel('server', 'watch','scss'));



