#!/usr/bin/env node

import { program } from 'commander';
import { gendiff } from '../src/gendiff.js';
import { formatter } from '../src/formatter.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const a = gendiff(filepath1, filepath2);
    console.log(formatter(a));
  });

program.parse(process.argv);