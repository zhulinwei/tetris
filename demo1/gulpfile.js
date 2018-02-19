const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gulp = require('gulp');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch('./*.html').on('change', reload);
  gulp.watch('./js/*.js').on('change', reload);
  gulp.watch('./css/*.css').on('change', reload);
});

gulp.task('default', ['browser-sync']);