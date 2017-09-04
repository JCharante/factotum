#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');


program
    .command('musicDirectory [dir]', 'Set the remote music directory')
    .command('configDirectory [dir]', 'Set the remote Clementine config directory')
    .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}
