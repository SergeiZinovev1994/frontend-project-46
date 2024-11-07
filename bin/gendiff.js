#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filePath1>', 'путь к 1му файлу')
  .argument('<filePath2>', 'путь к 2му файлу');

program.parse();