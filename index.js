require('buffer');
var path = require('path');
var through = require('through');
var util = require('gulp-util');
var path = require('path');
var File = util.File;
var PluginError = util.PluginError;

var mochaSuite = function(opts) {
  var pre = new Buffer('require(\'./');
  var post = new Buffer('\');');
  var buffer = [];

  if(!opts) {
    opts = {};
  }

  if(!opts.testDir) {
    opts.testDir = './test';
  }

  if(!opts.suiteFile) {
    opts.suiteFile = 'suite.js';
  }

  function contents(file) {
    var filePath = path.relative(opts.testDir, file.path);
    if (opts.startWith) {
        var remove = filePath.split(opts.startWith + path.sep)[0];
        filePath = '../' + filePath.replace(remove, '');
    }
    buffer.push(
      pre,
      new Buffer(filePath),
      post,
      new Buffer(util.linefeed)
    );
  }

  function end() {
    var self = this;
    var suite;
    if(buffer.length === 0) {
      throw new PluginError('gulp-mocha-browserify-sweet', 'No specs in suite.');
    }
    suite = new File({
      cwd: '.',
      base: opts.testDir,
      path: path.join('.', opts.testDir, opts.suiteFile),
      contents: Buffer.concat(buffer)
    });
    self.emit('data', suite);
    self.emit('end');
  }

  return through(contents, end);
};

module.exports = mochaSuite;
