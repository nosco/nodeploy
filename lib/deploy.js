var async = require('async');
var exec = require('child_process').exec;
module.exports = function deploy(opt, callback) {
  async.series([
    function checkoutBranch(next) {
      exec('git checkout -qf ' + opt.branch, {cwd: opt.repoDir}, next);
    },
    function pullChanges(next) {
      exec('git pull -q', {cwd: opt.repoDir}, next);
    },
    function checkoutCommit(next) {
      exec('git checkout -qf ' + opt.commit, {cwd: opt.repoDir}, next);
    },
    function installDependencies(next) {
      exec('npm install --production', {cwd: opt.repoDir}, next);
    },
    function copyToReleaseDir(next) {
      if (!opt.createCopy) return next();
      var dest = opt.releaseDir + '/' + opt.commit;
      exec('test -e ' + dest + ' || cp -a ' + opt.repoDir + ' ' + dest, next);
    },
    function createLinkToCurrentRelease(next) {
      if (!opt.createCopy) return next();
      exec('ln -nfs ' + opt.commit + ' live', {cwd: opt.releaseDir}, next);
    },
    function deploy(next) {
      exec('rsync -a --delete ' + opt.repoDir + '/ ' + opt.deployDir, next);
    },
    function restart(next) {
      exec('npm run-script restartService', {cwd: opt.deployDir}, next);
    }
  ],
  function done(err, results) {
    results.forEach(function (result) {
      if (result) console.log(new Date() + ': ' + result);
    });
    if (typeof callback === 'function') callback(err);
    else if (err) {
      console.error(new Date() + ': ' + err);
      process.exit(1);
    }

  });
}
