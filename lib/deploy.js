var async = require('async');
var exec = require('child_process').exec;
module.exports = function deploy(branch, commit, repoDir, deployDir, cb) {
  async.series([
    function checkoutBranch(callback) {
      exec('git checkout -qf ' + branch, {cwd: repoDir}, callback);
    },
    function pullChanges(callback) {
      exec('git pull', {cwd: repoDir}, callback);
    },
    function checkoutCommit(callback) {
      exec('git checkout -qf ' + commit, {cwd: repoDir}, callback);
    },
    function installDependencies(callback) {
      exec('npm install --production', {cwd: repoDir}, callback);
    },
    function deploy(callback) {
      exec('rsync -a --delete ' + repoDir + '/ ' + deployDir, callback);
    }
  ], cb);
}
