var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'clean';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: 'dist/'
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		return gulp.src(item.paths.src)
			.pipe($.clean({ force: true }));
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));


