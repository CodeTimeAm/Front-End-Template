# Gulp function and packages

- [browser-sync](#browser-sync)
- [gulp-watch](#gulp-watch)
- [gulp-sass](#gulp-sass)



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


For more information [this link](https://www.npmjs.com/package/gulp-watch).

#### **gulp-sass**

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

"gulp-sass": "^4.1.0",
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


For more information [this link](https://www.npmjs.com/package/gulp-sass).