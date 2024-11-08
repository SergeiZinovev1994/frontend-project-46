#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filePath1>', 'путь к 1му файлу')
  .argument('<filePath2>', 'путь к 2му файлу')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    gendiff(filePath1, filePath2)});

program.parse();