#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;
let fs = require('fs');

let vars = require('./vars');

let parsed = JSON.parse(fs.readFileSync(vars.configFilePath, 'UTF-8'));

program
    .parse(process.argv);

if (parsed.music.local.musicDirectory === null) {
    console.log('Please configure your local music directory');
    process.exit(1);
}
if (parsed.music.local.configDirectory === null) {
    console.log('Please configure your local config directory');
    process.exit(1);
}
if (parsed.music.remote.musicDirectory === null) {
    console.log('Please configure your remote aws music directory');
    process.exit(1);
}
if (parsed.music.remote.configDirectory === null) {
    console.log('Please configure your remote aws config directory');
    process.exit(1);
}

console.log('Uploading any differences in your local music folder to remote');
exec(`aws s3 sync ${parsed.music.local.musicDirectory} ${parsed.music.remote.musicDirectory}`, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error ${error}`)
    }
});

console.log('Uploading any differences in your local Clementine config folder to remote');
exec(`aws s3 sync ${parsed.music.local.configDirectory} ${parsed.music.remote.configDirectory}`, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error ${error}`)
    }
})
