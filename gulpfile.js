var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var precompile = require('ember-template-compiler').precompile;
var livereload = require('gulp-livereload');
var serve = require('gulp-serve');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var through = require('through2');
var name = 'pagination-pager';

gulp.task('clean-dist', function () {
  gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('templates', function(){
  gulp.src('src/template.hbs')
    .pipe(through.obj(function (file, encoding, done) {
      if (file.isBuffer()) {
        var contents = file._contents.toString();
        var precompiled = precompile(contents, false);

        file._contents = new Buffer(precompiled);
      }

      this.push(file);
      return done();
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true, // Avoid duplicate declarations
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

gulp.task('dev', ['default'], function() {
  livereload.listen();

  gulp.watch('src/*', ['templates', 'scripts']);
  gulp.watch('dist/*.js').on('change', livereload.changed);
  gulp.watch('test/index.html').on('change', livereload.changed);
});

gulp.task('default', ['clean-dist', 'lint', 'templates', 'scripts']);

