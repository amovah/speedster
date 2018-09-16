/* eslint-disable */

const gulp = require('gulp');
const del = require('del');
const lint = require('gulp-eslint');
const webpack = require('webpack');

gulp.task('clean', cb =>
  del(
    'build/**',
    cb
  )
);

gulp.task('copy', ['clean'], () =>
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/'))
);

gulp.task('dev:build', ['clean'], () => {
  webpack(require('./webpack/dev.js'), (err, stats) => {
    if (err) {
      throw new Error('webpack build failed', err);
    }

    console.log(stats.toString({
      assets: true,
      colors: true
    }));
  });
});

gulp.task('prod:build', ['lint', 'clean'], cb =>
  webpack(require('./webpack/prod.js'), (err, stats) => {
    if (err) {
      throw new Error('webpack build failed', err);
    }

    console.log(stats.toString({
      assets: true,
      colors: true
    }));
    cb();
  })
);

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
  .pipe(lint.format())
  .pipe(lint.failAfterError())
);

gulp.task('default', ['clean', 'copy', 'dev:build']);
gulp.task('dev', ['clean', 'copy', 'dev:build']);
gulp.task('prod', ['lint', 'clean', 'copy', 'prod:build']);
