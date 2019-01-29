/* eslint-disable */

const gulp = require('gulp');
const del = require('del');
const lint = require('gulp-eslint');
const webpack = require('webpack');

gulp.task('clean', cb =>
  del([
    'build/**',
    '!build',
  ],
    cb,
  )
);


gulp.task('copy', () =>
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/'))
);

gulp.task('dev:build', () => {
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

gulp.task('prod:build', cb =>
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

gulp.task('default', gulp.series('clean', 'copy', 'dev:build'));
gulp.task('dev', gulp.series('clean', 'copy', 'dev:build'));
gulp.task('prod', gulp.series('lint', 'clean', 'copy', 'prod:build'));
