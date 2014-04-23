var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var wrap = require('gulp-wrap');
var handlebars = require('gulp-ember-handlebars');
var livereload = require('gulp-livereload');
var serve = require('gulp-serve');
var name = 'pagination-pager';

gulp.task('clean-dist', function () {
  gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('templates', function(){
  gulp.src('src/template.hbs')
    .pipe(handlebars({
      outputType: 'browser',
      processName: function () {
        return 'components/' + name;
      }
     }))
    .pipe(rename(name + '.template.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename(name + '.template.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  gulp.src(['src/item-controller.js', 'src/component.js', 'src/initializer.js'])
    .pipe(concat(name + '.js'))
    .pipe(wrap('(function (Ember) {\n<%= contents %>\n}(window.Ember));'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename(name + '.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', serve(['test', 'dist']));

gulp.task('dev', function() {
  var server = livereload();

  gulp.start('default');
  gulp.start('serve');
  gulp.watch('src/*', ['templates', 'scripts']);
  gulp.watch('dist/*.js').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['clean-dist', 'templates', 'scripts']);

