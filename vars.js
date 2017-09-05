#!/usr/bin/env node --harmony
"use strict";

const configFilePath = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.config/factotum/config.json';
const configDir = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.config/factotum';

module.exports = { configFilePath, configDir };
