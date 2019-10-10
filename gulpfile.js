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


gulp.task('copy', (cb) => {
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/'))

  cb();
});

gulp.task('build:dev', () => {
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

gulp.task('build:prod', cb =>
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
);

gulp.task('default', gulp.series('clean', 'copy', 'build:dev'));
gulp.task('dev', gulp.series('clean', 'copy', 'build:dev'));
gulp.task('prod', gulp.series('lint', 'clean', 'copy', 'build:prod'));
