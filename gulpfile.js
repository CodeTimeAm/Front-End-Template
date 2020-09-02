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
    // html: "**/*.html", 
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
  del = require("del"),
  favicons = require("favicons").stream,
  log = require("fancy-log");





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
    .pipe(dest(path.build.html))
    .pipe(dest('app/'))
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


gulp.task("delfavicon", function () {
  return del([source_folder + '/img/favicon/*.{png,xml,ico,json,webapp,html}'])
});

gulp.task("favicon", function () {
  return gulp.src([source_folder + '/img/favicon.png'])
    .pipe(favicons({
      path: "/img/favicon/",                                // Path for overriding default icons path. `string`
      appName: 'CodeTime',                            // Your application's name. `string`
      appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: null,                     // Your application's description. `string`
      developerName: null,                      // Your (or your developer's) name. `string`
      developerURL: null,                       // Your (or your developer's) URL. `string`
      dir: "auto",                              // Primary text direction for name, short_name, and description
      lang: "en-US",                            // Primary language for name and short_name
      background: "#fff",                       // Background colour for flattened icons. `string`
      theme_color: "#fff",                      // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      scope: "/",                               // set of URLs that the browser considers within your app
      start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
      version: "1.0",                           // Your application's version string. `string`
      logging: false,                           // Print logs to console? `boolean`
      pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      url: null,
      html: "_favicon.html",
      pipeHTML: true,
      replace: true,
      icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
        //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
        //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
        //
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      }
    }))
    .on("error", log)
    .pipe(dest([source_folder + '/img/favicon/']));
});



const clean = () => del(path.clean);

let build = gulp.series(clean, gulp.parallel(html, js, css, images));
let watching = gulp.parallel(build, browserSync, watchFiles);


// exports.delfavicon = delfavicon;
// exports.favicon = favicon;
// exports.watchFiles = watchFiles;
exports.clean = clean;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watching = watching;
exports.default = watching;