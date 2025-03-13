#!/usr/bin/env node

import { program } from 'commander';
import { gendiff } from '../src/gendiff.js';
import start from '../src/formatters/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const data = gendiff(filepath1, filepath2);
    const formatName = program.opts().format;
    console.log(start(data, formatName));
  });

program.parse(process.argv);