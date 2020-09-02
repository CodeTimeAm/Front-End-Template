let project_folder = require("path").basename(__dirname);
let source_folder = "src";

let fs = require('fs');

let path = {
  build: {
    html: project_folder + "/",
    // css: [project_folder + "/css/", source_folder + "/css/",],
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
};

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');








gulp.task('watch', function () {
  watch(['./build/*.html', './build/css/*.css'], gulp.parallel(browserSync.reload))
  watch('./build/scss/**/*.scss', gulp.parallel('scss'))
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  })
});


gulp.task('html', function (callback) {
  return gulp.src('./src/*.html')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
      })
    }))
    .pipe(fileinclude({ prefix: '@@' }))
    .pipe(gulp.dest('./app/'))
    .pipe(gulp.dest('./build/'))
  callback();
});

gulp.task('scss', function (callback) {
  return gulp.src("./build/scss/style.scss")
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Styles',
          sound: false,
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"))
        .pipe(gulp.dest('./build/scss/'));
  callback();
});



gulp.task('default', gulp.parallel('server', 'watch','scss','html'));




