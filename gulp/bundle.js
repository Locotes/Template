var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'bundle';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: ['src/js/vendors/**/jquery-*.js', 'src/js/vendors/**/*.js', 'src/js/application/jquery*.js', 'src/js/application/*.js'],
			dest: 'dist/js'
		},
		options: {
			minify: true
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src)
			.pipe($.plumber())
			.pipe($.concat(item.name + '-bundle.js'))
			.pipe(gulp.dest(!item.paths.dest ? function (file) { return file.base; } : item.paths.dest))
			.pipe($.if(item.options.minify, $.uglify({ mangle: false })))
			.pipe($.if(item.options.minify, $.rename({ extname: '.min.js' })))
			.pipe($.if(item.options.minify, gulp.dest(!item.paths.dest ? function (file) { return file.base; } : item.paths.dest)))
	});

	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));


