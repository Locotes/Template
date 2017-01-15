var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'optimizeImages';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: ['dist/images/**/*', 'dist/gfx/**/*'],
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src)
			.pipe($.plumber())
			.pipe($.imagemin())
			.pipe(gulp.dest(function (file) { return file.base; }));
	});

	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));


