var exec = require('child_process').exec;

describe('Command line options', function () {
  var command = 'node bin/deploy.js ';
  function success(error) {
    if (error) throw new Error('No success');
  }
  function fail(error) {
    if (!error || error.code == 0) throw new Error('No fail');
  }
  it('should require a branch', function (done) {
    exec(command + '--commit 123 --repoDir / --deployDir /', function (er) {
      fail(er);
      done();
    });
  });
  it('should require a commit', function (done) {
    exec(command + '--branch test --repoDir / --deployDir /', function (er) {
      fail(er);
      done();
    });
  });
  it('should require a repoDir', function (done) {
    exec(command + '--commit 123 --branch test --deployDir /', function (er) {
      fail(er);
      done();
    });
  });
  it('should require a deployDir', function (done) {
    exec(command + '--commit 123 --repoDir / --branch test', function (er) {
      fail(er);
      done();
    });
  });
  it('should accept --help', function (done) {
    exec(command + '--help', function (er) {
      success(er);
      done();
    });
  });
});
