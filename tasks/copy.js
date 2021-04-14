const paths = {
  src:[
    'src/**/*.jpg',
    'src/**/*.gif',
    'src/**/*.png',
    'src/**/*.svg',
    'src/**/*.ico',
    'src/**/*.min.js',
    'src/**/*.json',
    'src/**/*.html'
  ],
  dest: 'dest'
}

const task = gulp => {
  return gulp.src(paths.src, {base:'src'})
  .pipe(gulp.dest(paths.dest));
}

module.exports = task;
