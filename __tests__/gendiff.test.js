/* eslint-env jest */

import { gendiff } from '../src/gendiff.js';
import parseFile from '../src/parsers.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commonPath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;

describe ('gendiffTests', () => {
  test('jsonWithJson', () => {
  expect(gendiff(commonPath('simpleObject1.json'), commonPath('simpleObject2.json')))
  .toEqual(parseFile(commonPath('simpleResult.json')));
});
  test('ymlWithYaml', () => {
    expect(gendiff(commonPath('file1.yml'), commonPath('file2.yaml')))
    .toEqual(parseFile(commonPath('resultWithYml.json')));
  });
});

test('parseFileTest', () => {
  expect(parseFile(commonPath('file1.json')))
  .toEqual({
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
});
  expect(parseFile(commonPath('file1.yml')))
  .toEqual({
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
});
})