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