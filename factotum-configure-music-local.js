#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;


program
    .command('musicDirectory [dir]', 'Set the local music directory (do not include trailing /)')
    .command('configDirectory [dir]', 'Set the local music config directory (do not include trailing /)')
    .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}
