const project_folder = "build";
const source_folder = "src";
const project_app_folder = "app";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    js: project_folder + "/js",
    img: project_folder + "/img",
    fonts: project_folder + "/fonts",
    app_html: project_app_folder + "/",
  },

  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {  //What need to waching
    html: source_folder + "/**/*html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: [project_folder , project_app_folder],



};

const { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'), 
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  fileinclude = require('gulp-file-include'),
  del = require("del");





function browserSync(params) {
  return browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    notify: false
  });
};


function html() {
  return src(path.src.html)
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
      })
    }))
    .pipe(fileinclude({ prefix: '@@' }))
    .pipe(dest(path.build.app_html))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
};



function css () {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
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
        overrideBrowserslist: ["last 4 version"]
      })
    )
    .pipe(dest(path.build.css))
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
};

function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
};

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
};



const clean = () => del(path.clean);

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watching = gulp.parallel(build, browserSync, watchFiles);



exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watching = watching;
exports.default = watching;