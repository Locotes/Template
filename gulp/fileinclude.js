var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var utf8BOM = String.fromCharCode(65279);

var module = 'fileinclude';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: ['src/html/*.html'],
			dest: 'dist/'
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src)
			.pipe($.plumber())
			.pipe($.fileInclude({
				prefix: '@@',
				basepath: '@file'
			}))
			.pipe($.replace(utf8BOM, ''))
			.pipe(gulp.dest(item.paths.dest))
			.pipe($.browserSync.stream());
	});

	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));
