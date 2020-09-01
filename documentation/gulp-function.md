# Gulp function and packages

- [browser-sync](#browser-sync)



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