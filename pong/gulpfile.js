var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

var paths = {
              jsFiles     : ['./src/games/*.js'],
              scssFiles   : ['./src/styles/*.scss'],
              imagesFiles : ['./src/assets/*.png']
            };

gulp.task('prepareJS', function () {
  gulp.src(paths.jsFiles)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.concat('games.js'))
      .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('prepareCSS', function () {
  gulp.src(paths.scssFiles)
    .pipe(plugins.plumber())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('prepareImages', function(){
  return gulp.src(paths.imagesFiles)
  .pipe(plugins.imagemin())
  .pipe(gulp.dest('./build/assets'));
});

gulp.task('prepareLibs', function () {
  gulp.src('./src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./build'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(plugins.webserver({
      directoryListing: true,
      host: '0.0.0.0',
      port: 8000,
      open: 'http://localhost:8000/build/index.html'
    }));
});

gulp.task('watch', function(){
  gulp.watch(paths.jsFiles, ['prepareJS']);
  gulp.watch(paths.scssFiles, ['prepareCSS']);
});

gulp.task('default', ['prepareJS', 'prepareCSS', 'prepareImages', 'prepareLibs', 'webserver', 'watch'], function() {
  // place code for your default task here
});