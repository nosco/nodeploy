var exec = require('child_process').exec;
var deploy = require('../lib/deploy');

describe('deploy', function () {
  var options = {cwd: 'test/fixtures'};
  var branch = 'testing';
  var commit = '941f066596a1f26d918b248baeb9a20a545903e6';
  var repoDir = options.cwd + '/repo';
  var releaseDir = options.cwd + '/releases';
  var deployDir = options.cwd + '/www';
  before(function (done) {
    exec('tar zxf test/fixtures.tar.gz -C test', function (err) {
      if (err) return done(err);
      deploy(branch, commit, repoDir, releaseDir, deployDir, done); 
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
});
