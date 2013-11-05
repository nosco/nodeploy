var async = require('async');
var exec = require('child_process').exec;
module.exports = function deploy(branch, commit, repoDir, releaseDir,
                                 deployDir, cb) {
  async.series([
    function checkoutBranch(callback) {
      exec('git checkout -qf ' + branch, {cwd: repoDir}, callback);
    },
    function pullChanges(callback) {
      exec('git pull -q', {cwd: repoDir}, callback);
    },
    function checkoutCommit(callback) {
      exec('git checkout -qf ' + commit, {cwd: repoDir}, callback);
    },
    function installDependencies(callback) {
      exec('npm install --production', {cwd: repoDir}, callback);
    },
    function copyToReleaseDir(callback) {
      var dest = releaseDir + '/' + commit;
      exec('test -e ' + dest + ' || cp -a ' + repoDir + ' ' + dest, callback);
    },
    function createLinkToCurrentRelease(callback) {
      exec('ln -fs ' + commit + ' live', {cwd: releaseDir}, callback);
    },
    function deploy(callback) {
      exec('rsync -a --delete ' + repoDir + '/ ' + deployDir, callback);
    }
  ],
  function callback(err, results) {
    results.forEach(function (result) {
      if (result[0]) console.log(result[0]);
      else if (result[1]) console.error(result[1]);
    });
    if (typeof cb === 'function') cb(err);
  });
}
