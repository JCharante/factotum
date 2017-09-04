#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;


program
    .command('music [action]', 'Configure your music settings')
    .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}
