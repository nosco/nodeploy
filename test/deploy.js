var exec = require('child_process').exec;
var deploy = require('../lib/deploy');

describe('deploy', function () {
  var options = {cwd: 'test/fixtures/'};
  var branch = 'testing';
  var commit = '941f066596a1f26d918b248baeb9a20a545903e6';
  var repoDir = options.cwd + 'repo/';
  var deployDir = options.cwd + 'www/';
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
