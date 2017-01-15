var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

var module = 'angular';
var PATHS = [
	{
		name: 'default',
		paths: {
			src: ['src/js/angular/**/*.module.js', 'src/js/angular/**/*.js', 'src/js/angular/**/*.html', '!src/js/angular/vendor/**/*.js'],
			dest: 'dist/js'
		},
		options: {
			ngHtml: {
				prefix: '/js/angular/',
				moduleName: 'app',
				declareModule: false
			},
			compileTemplates: true
		}
	}
];

PATHS.forEach(function (item) {
	gulp.task(module + ':' + item.name, function () {
		var jsFilter = $.filter('**/*.js', { restore: true });
		var htmlFilter = $.filter('**/*.html', { restore: true });

		gulp.src(item.paths.src)
			.pipe($.plumber())
			.pipe(htmlFilter)
			.pipe($.ngHtml2js(item.options.ngHtml))
			.pipe($.concat(item.name + '-templates.js'))
			.pipe($.if(item.options.compileTemplates, gulp.dest(item.paths.dest)))
			.pipe(htmlFilter.restore)
			.pipe(jsFilter)
			.pipe($.ngAnnotate())
			.pipe($.concat(item.name + '.js'))
			.pipe(gulp.dest(item.paths.dest))
			.pipe($.uglify())
			.pipe($.rename({ extname: '.min.js' }))
			.pipe(jsFilter.restore)
			.pipe(gulp.dest(item.paths.dest));

	});

	gulp.task('watch:' + module + ':' + item.name, function () {
		return gulp.watch(item.paths.src, [module + ':' + item.name]);
	});
});

gulp.task(module, PATHS.map(function (item) { return module + ':' + item.name }));
gulp.task('watch:' + module, PATHS.map(function (item) { return 'watch:' + module + ':' + item.name }));



