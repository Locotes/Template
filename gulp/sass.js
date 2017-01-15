var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'sass';
var PATHS = [
	{
		name: 'content',
		paths: {
			src: ['src/css/**/*.scss'],
			dest: 'dist/css'
		},
		options: {
			minify: false
		}
	}
];

var postCSSProcessors = [
	$.autoprefixer({ browsers: ['last 2 version'] }),
	$.cssMqpacker({
		sort: true
	})
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src.concat(['!_*.scss']))
			.pipe($.plumber())
			.pipe($.sass({ style: 'expanded' }).on('error', $.sass.logError))
			.pipe($.postcss(postCSSProcessors))
			.pipe(gulp.dest(!item.paths.dest ? function (file) { return file.base; } : item.paths.dest)) // Possibility to save to the same folder as the .scss files.
	 		.pipe($.browserSync.stream())
			.pipe($.cleanCss({ compatibility: 'ie9', advanced: false }))
			.pipe($.if(item.options.minify, $.rename({ extname: '.min.css' }))) // Optional minifying
			.pipe($.if(item.options.minify, gulp.dest(!item.paths.dest ? function (file) { return file.base; } : item.paths.dest))) // Optional minifying to dest path.
	});

	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));


