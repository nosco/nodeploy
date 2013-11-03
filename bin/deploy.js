#!/usr/bin/env node

var path = require('path');
var nopt = require('nopt');
var deploy = require('../lib/deploy');

var options = {
  'branch': String,
  'commit': String,
  'repoDir': path,
  'releaseDir': path,
  'deployDir': path,
  'help': String
};
var _options = {
  'b': '--branch',
  'c': '--commit',
  'h': '--help'
};

var args = nopt(options, _options);
if (args.help) help(0);
if (!(args.branch && args.commit && args.repoDir && args.deployDir)) help(1);
if (!args.releaseDir) args.releaseDir = process.env.HOME + '/releases';


deploy(args.branch, args.commit, args.repoDir, args.releaseDir, args.deployDir);

function help(exitCode) {
  exitCode = (exitCode == undefined)?1:exitCode;
  var message = [
    'usage: deploy --branch|-b <branch> --commit|-c <commit>',
    '              --repoDir <path> --deployDir <path>'].join('\n');
  console.log(message);
  process.exit(exitCode);
}
