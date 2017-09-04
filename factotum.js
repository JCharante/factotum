#!/usr/bin/env node
var program = require('commander');

program
    .version('1.0.1')
    .command('music [action]', 'push to or pull from remote music repository')
    .command('configure [what]', 'configure your settings')
    .parse(process.argv);
/*
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
*/

if (program.music) console.log('music');
