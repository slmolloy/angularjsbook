var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function() {
  gulp.src(['ng/module.js', 'ng/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets'));

  gulp.src(['bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-mocks/angular-mocks.js'])
    .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js'], function() {
  gulp.watch('ng/**/*.js', ['js']);
});
