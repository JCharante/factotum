#!/usr/bin/env node
var program = require('commander');

program
    .version('1.1.1')
    .command('music [action]', 'push to or pull from remote music repository')
    .command('configure [what]', 'configure your settings')
    .parse(process.argv);

if (program.music) console.log('music');
