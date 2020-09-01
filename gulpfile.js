const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

gulp.task('watch', function () {
  watch('./build/*.html', gulp.parallel(browserSync.reload))
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  })
});



gulp.task('default', gulp.parallel('server', 'watch'));