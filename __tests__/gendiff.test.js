/* eslint-env jest */
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => join(__dirname, '..', '__fixtures__/', fileName);

describe('gendiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'stylishTest.txt'],
    ['file1.yml', 'file2.yaml', 'stylish', 'stylishTest.txt'],
    ['file1.json', 'file2.yaml', 'stylish', 'stylishTest.txt'],
    ['file1.json', 'file2.yaml', 'plain', 'plainTest.txt'],
    ['file1.yml', 'file2.json', 'json', 'jsonTest.json'],
  ])('gendiff', (fileName1, fileName2, formatName, fileName3) => {
    expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), formatName))
      .toBe(fs.readFileSync(getFixturePath(fileName3), 'utf8'));
  }, 0);
});

describe('default', () => {
  test('default', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
      .toBe(fs.readFileSync(getFixturePath('stylishTest.txt'), 'utf8'));
  });
});
