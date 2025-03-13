#!/usr/bin/env node

import { program } from 'commander';
import { gendiff } from '../src/gendiff.js';
import index from '../src/formatters/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, type) => {
    const data = gendiff(filepath1, filepath2);
    console.log(index(data, type.format));
  });

program.parse(process.argv);