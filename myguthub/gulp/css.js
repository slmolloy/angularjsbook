var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function() {
  gulp.src('css/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('assets'))
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('assets'))
});

gulp.task('watch:css', ['css'], function() {
  gulp.watch('css/**/*.styl', ['css'])
});
