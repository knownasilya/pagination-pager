var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var handlebars = require('gulp-ember-handlebars');

gulp.task('clean-dist', function () {
  gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('templates', function(){
  gulp.src('src/template.hbs')
    .pipe(handlebars({
      outputType: 'browser'
     }))
    .pipe(rename('pagination-pager.template.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('pagination-pager.template.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  gulp.src(['src/item-controller.js', 'src/component.js', 'src/initializer.js'])
    .pipe(concat('pagination-pager.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('pagination-pager.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean-dist', 'templates', 'scripts']);

