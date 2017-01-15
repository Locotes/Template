var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'copy';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: ['src/**/*', '!src/css/**/*', '!src/html/**/*', '!src/js/**/*'],
			dest: 'dist/'
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src)
        	.pipe($.changed(item.paths.dest))
			.pipe(gulp.dest(item.paths.dest));
	});
	
	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));



