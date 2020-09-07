const project_folder = "build";
const source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css",
        js: project_folder + "/js",
        img: project_folder + "/img",
        fonts: project_folder + "/fonts",
        png: source_folder + "/img/sprite",
        pug_css: source_folder + "/scss",
        pug: project_folder + "/",
        favicon: source_folder + '/img/favicon',
    },
    src: {
        pug: "./" + source_folder + "/pug/*.pug",
        css: "./" + source_folder + "/scss/style.scss",
        js: "./" + source_folder + "/js/script.js",
        img: "./" + source_folder + "/img/**/*.{jpg,jepg,png,svg,gif,ico,webp}",
        svg: "./" + source_folder + "/img/sprite/svg/**/*.svg",
        png: "./" + source_folder + "/img/sprite/png/**/*.png",
        fonts: "./" + source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: "./" + project_folder + "/**/*.html",
        pug: source_folder + "/pug/**/*.pug",
        pug_css: "./" + source_folder + "/pug/**/*.scss",
        css: "./" + source_folder + "/scss/**/*.scss",
        js: "./" + source_folder + "/js/**/*.js",
        img: "./" + source_folder + "/img/**/*.{jpg,jepg,png,svg,gif,ico,webp}",
        svg: source_folder + "/img/sprite/svg/**/*.svg",
        png: source_folder + "/img/sprite/png/**/*.png",
        favicon: source_folder + '/img/**/favicon.png',
    },
    // clean: [project_folder, project_app_folder],
    clean: {
        project: [project_folder],
        favicon: [source_folder + '/img/favicon/*.*'],
    },
};


const {src, dest} = require('gulp'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create(),
    del = require("del"),
    csso = require('gulp-csso'),
    favicons = require("favicons").stream,
    group_media = require("gulp-group-css-media-queries"),
    htmlmin = require('gulp-htmlmin'),
    inject = require("gulp-inject-string"),
    imagemin = require('gulp-imagemin'),
    log = require("fancy-log"),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    svgsprite = require("gulp-svg-sprite"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    Pug = require('gulp-pug'),
    stylelint = require('stylelint'),
    shorthand = require('gulp-shorthand'),
    pugLinter = require('gulp-pug-linter'),
    bemValidator = require('gulp-html-bem-validator'),
    through2 = require('through2'),
    argv = require('yargs').argv;


/* browser-sync
=========================*/
async function browserSync(params) {
    return browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        notify: false
    });
}

/* html:build
====================================================*/
function html() {
    return src(path.watch.html)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
            })
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}


/* BEM validate – welcome to hell
====================================================*/
function validateBem() {
    return src(path.watch.html)
        .pipe(bemValidator())
        .pipe(dest(path.build.html))
}

/* pug
====================================================*/
async function pug() {
    return src(path.src.pug)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
            })
        }))
        .pipe(Pug({
            pretty: true
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

/* pug Linter
====================================================*/

function PugLinter() {
    return src(path.src.pug)
        .pipe(pugLinter({failAfterError: true}))
}

/* css:build
====================================================*/
function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: ["expanded", "nested"],
                precision: 10,
                includePaths: ['.'],
                onError: console.error.bind(console, 'Sass error:')
            })
        )
        .pipe(
            group_media()
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
                overrideBrowserslist: ["last 4 version"],
                cascade: true
            })
        )
        .pipe(sourcemaps.write())
        .pipe(shorthand())
        .pipe(dest(path.build.css))
        .pipe(csso())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

/* scss lint
====================================================*/
function lintScss() {
    return gulp.src(path.watch.css).pipe(stylelint({
        reporters: [
            {
                failAfterError: true,
                formatter: 'string',
                console: true,
            },
        ],
    }));
}

/* js build
====================================================*/
function js() {
    return src(path.src.js)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
            })
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

/* image build
====================================================*/
function images() {
    return src(path.src.img)
        .pipe(
            imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.mozjpeg({quality: 75, progressive: true}),
                    imagemin.optipng({optimizationLevel: 5}),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ],
                {
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    interlaced: true,
                    optimizationLevel: 3 // 0 to 7
                }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

/* sprite
====================================================*/
async function imgSprite() {
    let spriteData = gulp.src(path.src.png)
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            algorithm: 'top-down',
            imgPath: '../img/sprite/sprite.png',
            padding: 10
        }));
    spriteData.img.pipe(gulp.dest(path.build.png));
    spriteData.css.pipe(gulp.dest(path.build.pug_css));
}

/* SVG sprite
====================================================*/
svgconfig = {
    shape: {
        dimension: { // Set maximum dimensions
            maxWidth: 32,
            maxHeight: 32
        },
        spacing: { // Add padding
            padding: 10
        },
    },
    mode: {
        stack: {
            sprite: "../icons.svg",  //sprite file name
            example: true
        },
        view: { // Activate the «view» mode
            bust: false,
            render: {
                scss: true // Activate Sass output (with default options)
            }
        },
        symbol: true // Activate the «symbol» mode
    },
};

function svgSprite() {
    return gulp.src(path.src.svg)
        .pipe(svgsprite())
        .pipe(svgsprite(svgconfig))
        .pipe(dest(path.build.img));
}

/* favicon:clean
====================================================*/
function delfavicon() {
    return del(path.clean.favicon)
}

/* favicon:build  / generate
====================================================*/
favconfig = {
    path: "/img/favicon/",                    // Path for overriding default icons path. `string`
    appName: 'CodeTime',                      // Your application's name. `string`
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
    html: null,
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
};

async function faviconGenerate() {
    return src(path.watch.favicon)
        .pipe(favicons(favconfig))
        .on("error", log)
        .pipe(dest(path.build.favicon));
}

/* clean
====================================================*/
const clean = () => del(path.clean.project);

/* default
====================================================*/
const build = gulp.series(clean, gulp.parallel(html, js, css, images, pug));
const watching = gulp.series(build, gulp.parallel(watchFiles, imgSprite, svgSprite, browserSync));
const favicon = gulp.series(delfavicon, faviconGenerate);
const faviconWatch = gulp.series(delfavicon, faviconGenerate);
const validate = gulp.series(validateBem);

/* watch
====================================================*/
async function watchFiles(params) {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.svg], svgSprite);
    gulp.watch([path.watch.png], imgSprite);
    gulp.watch([path.watch.pug], pug);
    gulp.watch([path.watch.pug_css], css);
    gulp.watch([path.watch.favicon], faviconWatch);
    params();
}

/* =================================================*/

exports.validate = validate;
exports.validateBem = validateBem;
exports.favicon = favicon;
exports.faviconWatch = faviconWatch;
exports.faviconGenerate = faviconGenerate;
exports.delfavicon = delfavicon;
exports.svgSprite = svgSprite;
exports.imgSprite = imgSprite;
exports.PugLinter = PugLinter;
exports.pug = pug;
exports.lintScss = lintScss;
exports.watch = watch;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watching = watching;
exports.default = watching;
