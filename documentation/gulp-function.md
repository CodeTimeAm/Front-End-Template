# Gulp function and packages

- [browser-sync](#browser-sync)
- [gulp-watch](#gulp-watch)
- [gulp-sass](#gulp-sass)
- [gulp-autoprefixer](#gulp-autoprefixer)
- [gulp-autoprefixer](#gulp-sourcemaps)


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
"browser-sync": "^2.26.12",
"gulp": "^4.0.2",

"gulp-watch": "^5.0.1"
}
}
```

```
gulpfile.js
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
```
```
We can use gulp-watch by command
gulp watch
```

For more information [this link](https://www.npmjs.com/package/gulp-watch).

#### **gulp-sass**


Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). Sass has two syntaxes; the older syntax uses indentation to separate code blocks and newline characters to separate rules.

The newer syntax, SCSS, uses block formatting like CSS. It uses braces to denote code blocks and semicolons to separate lines within a block. The indented syntax and SCSS files are traditionally given the extensions .sass and .scss, respectively.

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
"browser-sync": "^2.26.12",
"gulp": "^4.0.2",
"gulp-watch": "^5.0.1",

"gulp-sass": "^4.1.0"
}
}
```

```
gulpfile.js
const sass = require('gulp-sass');
gulp.task('scss', function (callback) {
return gulp.src("./build/scss/style.scss")
.pipe(sass())
.pipe( gulp.dest("./build/css/") );
callback();
});
```
```
We can use gulp-sass by command
gulp sass
```

For more information [this link](https://www.npmjs.com/package/gulp-sass).


#### **gulp-autoprefixer**

***gulp-autoprefixer***

Autoprefixer is able to cut down on a lot of the workload involved in making our grids IE-compatible, it can’t fix everything. It can only translate things that IE can understand. These are the many critical things that you need to be aware of if you don’t want to open the site up in IE one day and have it blow up in your face.

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
"browser-sync": "^2.26.12",
"gulp": "^4.0.2",
"gulp-sass": "^4.1.0",
"gulp-watch": "^5.0.1",

"gulp-autoprefixer": "^7.0.1"
}
}
```

```
gulpfile.js
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
"browser-sync": "^2.26.12",
"gulp": "^4.0.2",
"gulp-autoprefixer": "^7.0.1",
"gulp-sass": "^4.1.0",
"gulp-watch": "^5.0.1",

"gulp-sourcemaps": "^2.6.5"
}
}

```

```
gulpfile.js
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



#### ** **


#### ** **

#### ** **

#### ** **

#### ** **

*** ***

 

```
 

```

```
 
```


For more information [this link]( ).


