const through    = require('through2');
const browserify = require('browserify');
const babelify   = require('babelify');

let plugin = option　=> {

  let stream = through.obj(function(file, enc, cb) {
    browserify(file.path, option.browserify)
    .transform(babelify, option.babelify)
    .bundle((err, buf) => {
      if (err) return cb(err);
      file.contents = new Buffer(buf);
      this.push(file);
      cb();
    });
  });

  return stream;
};

module.exports = plugin;