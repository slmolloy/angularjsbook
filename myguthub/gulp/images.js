var gulp = require('gulp');

gulp.task('images', function() {
  gulp.src('images/**/*')
    .pipe(gulp.dest('assets'))
});

gulp.task('watch:images', ['images'], function() {
  gulp.watch('images/**/*', ['images'])
});