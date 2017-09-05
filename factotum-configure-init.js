#!/usr/bin/env node --harmony
"use strict";

let program = require('commander');
let fs = require('fs');

let vars = require('./vars');

program
    .parse(process.argv);

let blankConfig = {
    "music": {
        "remote": {
            "configDirectory": null,
            "musicDirectory": null
        },
        "local": {
            "configDirectory": null,
            "musicDirectory": null
        }
    }
};

if (!fs.existsSync(vars.configDir)) {
    console.log(`Creating folder for config file in ${vars.configDir}`);
    fs.mkdirSync(vars.configDir)
} else {
    console.log('Directory for config file already exists');
}

if (!fs.existsSync(vars.configFilePath)) {
    console.log(`Config file does not exist. Creating config file at ${vars.configFilePath}`);
    console.log(JSON.stringify(blankConfig, null, 4));
    fs.writeFileSync(vars.configFilePath, JSON.stringify(blankConfig, null, 4), {encoding: 'utf-8', flag: 'wx'});
} else {
    console.log('Config file exists. Upgrading file to latest schema.');
    let existingConfig = JSON.parse(fs.readFileSync(vars.configFilePath, 'UTF-8'));
    let upgradedConfig = Object.assign(blankConfig, existingConfig);
    fs.writeFileSync(vars.configFilePath, JSON.stringify(upgradedConfig, null, 4), {encoding: 'utf-8', flag: 'w'});
    console.log('Finished upgrading file schema.');
}
