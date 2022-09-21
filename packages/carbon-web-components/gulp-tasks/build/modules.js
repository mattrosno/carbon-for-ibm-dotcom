/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
require('./modules/css');
require('./modules/icon-types');
require('./modules/icons');
require('./modules/scripts');
require('./modules/scripts-node');
require('./modules/types');

gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:css'),
    gulp.task('build:modules:icon-types'),
    gulp.task('build:modules:icons'),
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:scripts-node'),
    gulp.task('build:modules:types')
  )
);
