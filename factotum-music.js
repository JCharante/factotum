#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;
let fs = require('fs');

let vars = require('./vars');
let configPath = vars.configFilePath;

let parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

program
    .command('push', 'Upload any differences in your local music folder to remote')
    .command('pull', 'Download any differences in your local music folder from remote')
    .parse(process.argv);

if (!program.args.length) {
    console.error('Subcommand Required');
    process.exit(1);
}
