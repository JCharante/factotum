#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let exec = require('child_process').exec, child;
let fs = require('fs');

let vars = require('./vars');
let configPath = vars.configFilePath;

let parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

program
    .action(function (action) {
        if (action === 'push' || action === 'pull') {
            if (parsed.music.local.musicDirectory === null) {
                console.log('Please configure your local music directory');
                return
            }
            if (parsed.music.local.configDirectory === null) {
                console.log('Please configure your local config directory');
                return
            }
            if (parsed.music.remote.musicDirectory === null) {
                console.log('Please configure your remote aws music directory');
                return
            }
            if (parsed.music.remote.configDirectory === null) {
                console.log('Please configure your remote aws config directory');
                return
            }
        }

        if (action === 'push') {
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
        } else if (action === 'pull') {
            console.log('Downloading any differences in your local music folder from remote');
            exec(`aws s3 sync ${parsed.music.remote.musicDirectory} ${parsed.music.local.musicDirectory}`, function (error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error ${error}`)
                }
            });

            console.log('Downloading any differences in your local Clementine config folder from remote');
            exec(`aws s3 sync ${parsed.music.remote.configDirectory} ${parsed.music.local.configDirectory}`, function (error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error ${error}`)
                }
            })
        } else {
            console.log(`Hey! ${action} is not a valid command! RTFM`)
        }
    })
    .parse(process.argv);

if (!program.args.length) {
    console.error('Subcommand Required');
    process.exit(1);
}
