var exec = require('child_process').exec;
var deploy = require('../lib/deploy');

describe('deploy', function () {
  var options = {cwd: 'test/fixtures/'};
  var branch = 'testing';
  var commit = 'dc8fcdf9eefb0dfd385286ee7e381ec4a1f4b288';
  var repoDir = options.cwd + 'repo/';
  var deployDir = options.cwd + 'www/';
  // npm is sometimes rather slow
  this.timeout(10000);
  before(function (done) {
    exec('tar zxf test/fixtures.tar.gz -C test', function (err) {
      if (err) return done(err);
      deploy(branch, commit, repoDir, deployDir, done); 
    });
  });
  after(function (done) {
    exec('rm -rf ' + options.cwd, done);
  });
  it('should deploy the correct data', function (done) {
    exec('diff -r --exclude=".git" www _www', options, done);
  });
});
