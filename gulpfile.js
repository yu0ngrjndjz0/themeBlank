const gulp       = require('gulp')
const browser    = require('browser-sync')

global.SRC_ROOT  = process.cwd().replace(/\\/g, '/')+'/src'
global.DEST_ROOT = process.cwd().replace(/\\/g, '/')+'/dest'


/* tasks */
task_html = () => require('./tasks/html.js')(gulp)
task_css  = () => require('./tasks/css.js')(gulp)
task_js   = () => require('./tasks/js.js')(gulp)
task_copy = () => require('./tasks/copy.js')(gulp)


/* watch */
function watch() {
  gulp.watch('src/**/*.pug', task_html);
  gulp.watch('src/**/*.scss', task_css);
  gulp.watch('src/**/*.js', task_js);
  gulp.watch(['src/**/*.+(png|jpg|gif|svg|pdf|json|js|html)'], task_copy);
  // reload
  gulp.watch('src').on('change', () => {
    if (process.argv.indexOf('--reload') >= 0) browser.reload();
  });
}

/** server */
server = () => {
  browser.init({
    startPath: '/',
    server: {
     baseDir: 'dest'
   }
 });
}

/** start */
const start = gulp.parallel(watch, server);
/* build */
const build = gulp.parallel(task_html, task_css, task_js, task_copy);

gulp.task('start', start);
gulp.task('build', build);