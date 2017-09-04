#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;


program
    .command('local [action]', 'Configure local settings')
    .command('remote [action]', 'Configure remote settings')
    .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}
