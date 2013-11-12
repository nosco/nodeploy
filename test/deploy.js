var exec = require('child_process').exec;
var deploy = require('../lib/deploy');

describe('deploy', function () {
  var options = {cwd: 'test/fixtures'};
  var opt = {};
  opt.branch = 'testing';
  opt.commit = '8e49b5320a9c20f922c7c3d6e584360fd0a166fb';
  opt.repoDir = options.cwd + '/repo';
  opt.releaseDir = options.cwd + '/releases';
  opt.deployDir = options.cwd + '/www';
  before(function (done) {
    exec('tar zxf test/fixtures.tar.gz -C test', function (err) {
      if (err) return done(err);
      deploy(opt, done); 
    });
  });
  after(function (done) {
    exec('rm -rf ' + options.cwd, done);
  });
  it('should deploy the correct data', function (done) {
    exec('diff -r --exclude=".git" www _www', options, done);
  });
  it('should keep copy in releaseDir', function (done) {
    exec('diff -r --exclude=".git" releases _releases', options, done);
  });
  it('should link to current release', function (done) {
    exec('diff -r --exclude=".git" www releases/live', options, done);
  });
  it('should fire npm restart', function (done) {
    exec('test -e restarted', options, done);
  });
});
