# Gulp function and packages

- [browser-sync](#browser-sync)
- [gulp-watch](#gulp-watch)
- [gulp-sass](#gulp-sass)
- [gulp-autoprefixer](#gulp-autoprefixer)
- [gulp-autoprefixer](#gulp-sourcemaps)
- [Scss watch](#scss_watch)
- [gulp-plumber / gulp-notify](#gulp-plumber_gulp-notify)
- [gulp-file-include](#gulp-file-include)


#### **browser-sync**

Browser-sync to keep multiple browsers & devices in sync when building websites.
```
Package.json
{
"name": "codetime-gulp",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "CodeTime",
"license": "ISC",
"dependencies": {
"gulp": "^4.0.2",

"browser-sync": "^2.26.12"
}
}
```
```
gulpfile.js
const gulp = require('gulp'); // Connecting gulp
const browserSync = require('browser-sync').create();
gulp.task('server', function () {
browserSync.init({
server: {
baseDir: "./build/"
}
})
});
```
```
We can use browser-sync by command
gulp browserSync
```

For more information [this link](https://www.npmjs.com/package/browser-sync).






#### **gulp-watch**

***Watching Files***

The watch() API connects globs to tasks using a file system watcher. It watches for changes to files that match the globs and executes the task when a change occurs



gulpfile.js
```javascript
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const watch       = require('gulp-watch');
gulp.task('watch', function() {
    watch('./build/*.html', gulp.parallel(browserSync.reload))
});
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
});
gulp.task('default', gulp.parallel('server', 'watch'));
```
We can use **`gulp-watch`** by command
`gulp watch`

For more information [this link](https://www.npmjs.com/package/gulp-watch).

#### **gulp-sass**


Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). Sass has two syntaxes; the older syntax uses indentation to separate code blocks and newline characters to separate rules.

The newer syntax, SCSS, uses block formatting like CSS. It uses braces to denote code blocks and semicolons to separate lines within a block. The indented syntax and SCSS files are traditionally given the extensions .sass and .scss, respectively.



gulpfile.js
```javascript
const sass = require('gulp-sass');
gulp.task('scss', function (callback) {
return gulp.src("./build/scss/style.scss")
.pipe(sass())
.pipe( gulp.dest("./build/css/") );
callback();
});
```

We can use **`gulp-sass`** by command
`gulp sass`

For more information [this link](https://www.npmjs.com/package/gulp-sass).


#### **gulp-autoprefixer**

***gulp-autoprefixer***

Autoprefixer is able to cut down on a lot of the workload involved in making our grids IE-compatible, it can’t fix everything. It can only translate things that IE can understand. These are the many critical things that you need to be aware of if you don’t want to open the site up in IE one day and have it blow up in your face.

gulpfile.js
```javascript
const autoprefixer = require('gulp-autoprefixer');
gulp.task('scss', function (callback) {
return gulp.src("./build/scss/style.scss")
.pipe(sass())
.pipe(autoprefixer({
overrideBrowserslist: ['last 3 versions']
}))
.pipe( gulp.dest("./build/css/") );
callback();
});
```


For more information [this link](https://www.npmjs.com/search?q=gulp-autoprefixer).

#### **gulp-sourcemaps**

***gulp-sourcemaps***


It automatically creates source maps from your code. A source map is used to tell you which file and line in your original code a part of minified code comes from. So sourcemaps can be very helpful when debugging minified Angular apps in the browser

gulpfile.js
```javascript
const sourcemaps = require('gulp-sourcemaps');
gulp.task('scss', function (callback) {
return gulp.src("./build/scss/style.scss")
.pipe(sourcemaps.init())
.pipe(sass())
.pipe(autoprefixer({
overrideBrowserslist: ['last 3 versions']
}))
.pipe(sourcemaps.write())
.pipe( gulp.dest("./build/css/") );
callback();
});
```


For more information [this link](https://www.npmjs.com/package/gulp-sourcemaps).



#### **scss_watch**

***Scss watch***

 It's what converts your Sass files into CSS and auto-compiles your Sass every time it changes. Following is a more general command that looks for your Sass files and watches for changes inside the directory containing your Sass files: sass --watch .

gulpfile.js
```javascript
gulp.task('watch', function () {
watch(['./build/*.html', './build/css/*.css'], gulp.parallel(browserSync.reload))
watch('./build/scss/**/*.scss', gulp.parallel('scss'))
});
gulp.task('default', gulp.parallel('server', 'watch', 'scss'));

```



#### **gulp-plumber_gulp-notify**

***gulp-plumber and gulp-notify***

gulp-plumber which generates error output. But this does not interrupt the work of Gulp.

gulp-notify when called with a string message will output that message for every file present in the passed stream so, in the final task of the example, it will be called twice.


gulpfile.js
```javascript
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
gulp.task('scss', function (callback) {
return gulp.src("./build/scss/style.scss")
.pipe( plumber({
errorHandler: notify.onError(function(err){
return {
title: 'Styles',
sound: false,
message: err.message
}
})
}))
.pipe(sourcemaps.init())
.pipe(sass())
……...
```


For more information gulp-plumber [this link](https://www.npmjs.com/package/gulp-plumber).
For more information gulp-notify [this link](https://www.npmjs.com/package/gulp-notifyr).



#### **gulp-file-include**

***gulp-file-include***

For include *.html files in index.html

gulpfile.js
```javascript
const fileinclude = require('gulp-file-include');
gulp.task('html', function(callback) {
return gulp.src('./build/*.html')
.pipe( plumber({
errorHandler: notify.onError(function(err){
return {
title: 'HTML include',
sound: false,
message: err.message
}
})
}))
.pipe( fileinclude({ prefix: '@@' }) )
.pipe( gulp.dest('./app/') )
callback();
});
```


For more information [this link](https://www.npmjs.com/package/gulp-file-include).



#### ** **

*** ***

 

```
 

```

```
 
```


For more information [this link]( ).



#### ** **

*** ***

 

```
 

```

```
 
```


For more information [this link]( ).


