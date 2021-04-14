const es2015 = require('./plugin/es2015.js');
const plumber  = require('gulp-plumber');
const notify   = require('gulp-notify');
const eol   = require('gulp-eol');

const option = {
  browserify: {
    // debug: true
  },
  babelify: {
     presets: ['@babel/preset-env']
    // ,sourceMaps: true
  },
  eol: {
    newline: '\r\n',
    append: false
  }
}

let paths = {
  src: [
    'src/**/*.js',
    '!src/**/*.min.js',
    '!src/**/_*.js'
  ],
  dest: 'dest'
}

const task = gulp => {
  return gulp.src(paths.src, {base: 'src'})
  .pipe((plumber({
    errorHandler: notify.onError('<%= error.message %>')
  })))
  .pipe(es2015(option))
  .pipe(eol(option.eol.newline, option.eol.append))
  .pipe(gulp.dest(paths.dest))
}

module.exports = task;