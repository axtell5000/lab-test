const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});
 
gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie9'}))
      .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('compress', function() {
    gulp.src('assets/js/*.js')
      .pipe(minify({noSource: true}))
      .pipe(gulp.dest('dist/assets/js'))
  });

gulp.task('serve', ['sass', 'minify-css'], function() {
    
    browserSync.init({
        server: "./"
    });

    gulp.watch("./assets/js/*.js", ['compress']).on('change', browserSync.reload);
    gulp.watch("./sass/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./css/*.css", ['minify-css']).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);