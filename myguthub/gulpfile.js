var fs = require('fs');
fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
  require('./gulp/' + task)
});

var gulp = require('gulp');
gulp.task('dev', ['watch:css', 'watch:js', 'watch:images', 'server']);
gulp.task('build', ['css', 'js', 'images']);
