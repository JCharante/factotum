#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let fs = require('fs');

let configPath = './config.json';
let parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

program
    .action(function (dir) {
        parsed.music.local.musicDirectory = dir;
        fs.writeFile(configPath, JSON.stringify(parsed, null, 4), 'utf-8');
        console.log(`Set your local music directory to: ${dir}`)

    })
    .parse(process.argv);

let pkgs = program.args;

if (!pkgs.length) {
    console.error('Directory Required');
    process.exit(1);
}
