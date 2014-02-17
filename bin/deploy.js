#!/usr/bin/env node

var path = require('path');
var nopt = require('nopt');
var pkg = require('../package.json');
var deploy = require('../lib/deploy');

var options = {
  'branch': String,
  'commit': String,
  'repoDir': path,
  'releaseDir': path,
  'deployDir': path,
  'createCopy': Boolean,
  'version': Boolean,
  'help': String
};
var _options = {
  'b': '--branch',
  'c': '--commit',
  'v': '--version',
  'h': '--help'
};

var args = nopt(options, _options);

if (args.help) help(0);
if (args.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (!(args.branch && args.commit && args.repoDir && args.deployDir)) help(1);
if (!args.releaseDir) args.releaseDir = process.env.HOME + '/releases';

deploy(args);

function help(exitCode) {
  exitCode = (exitCode == undefined)?1:exitCode;
  var message = [
    'usage: deploy --branch|-b <branch> --commit|-c <commit> --repoDir <path>',
    '              --deployDir <path> [--releaseDir <path>] [--createCopy]'
  ].join('\n');
  console.log(message);
  process.exit(exitCode);
}
