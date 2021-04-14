const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker     = require('css-mqpacker');
const eol          = require('gulp-eol');

const option = {
  sass: {
    includePaths : 'src',
    outputStyle  : 'expanded' // nested, expanded, compact, compressed
  },
  postcss: [
    autoprefixer({'browsers': ['last 2 versions']}),
    mqpacker
  ],
  eol: {
    newline: '\r\n',
    append: false
  }
}

const paths = {
  src: {
    scss : 'src/**/*.scss',
    css  : 'src/**/*.css'
  },
  dest: 'dest'
}

const task = gulp => {
  return gulp.src(paths.src.scss, {base:'src'})
  .pipe(sourcemaps.init())
  .pipe(sass(option.sass).on('error', sass.logError))
  .pipe(postcss(option.postcss))
  .pipe(sourcemaps.write())
  .pipe(eol(option.eol.newline, option.eol.append))
  .pipe(gulp.dest(paths.dest));
}

module.exports = task;