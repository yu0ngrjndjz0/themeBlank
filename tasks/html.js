const pug      = require('gulp-pug');
const plumber  = require('gulp-plumber');
const notify   = require('gulp-notify');
const prettify = require('gulp-prettify');
const replace  = require('gulp-replace');

const option = {
  pug: {
    basedir: 'src',
    doctype: 'html'
  },
  prettify: {
    indent_inner_html: false,
    eol              : '\r\n',
    unformatted      : ['br', 'em', 'i', 'a', 'small', 'strong', 'sub', 'sup', 'svg', 'pre', 'code']
  }
}

const paths = {
  src: [
    'src/**/*.pug',
    '!src/**/_*.pug'
  ],
  dest: 'dest'
}

const task = gulp => {
  return gulp.src(paths.src, {base: 'src'})
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(pug(option.pug))
  .pipe(prettify(option.prettify))
  .pipe(replace(/<!--build\(start\)-->/g,'<!--'))
  .pipe(replace(/<!--build\(end\)-->/g,'-->'))
  .pipe(gulp.dest(paths.dest))
}

module.exports = task;
