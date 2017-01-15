var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	pattern: '*'
});

require('require-dir')('./gulp');


gulp.task('watch', [
	'watch:sass', 
	'watch:angular', 
	'watch:bundle', 
	'watch:copy', 
	'watch:fileinclude', 
	'watch:optimizeImages'
	], function () {
	$.browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});

gulp.task('default', ['watch']);

gulp.task('build', function() {
	$.runSequence('clean', ['sass', 'bundle', 'fileinclude', 'angular', 'copy'], 'optimizeImages');
});
