/* eslint-env jest */

import { gendiff, parseFile } from "../src/gendiff.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('simpleTest', () => {
  expect(gendiff(`${__dirname}/../__fixtures__/simpleObject1.json`, `${__dirname}/../__fixtures__/simpleObject2.json`)).toEqual(parseFile(`${__dirname}/../__fixtures__/simpleResult.json`));
});
