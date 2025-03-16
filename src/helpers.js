import process from 'node:process';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import parseFile from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (fileName) => join(__dirname, '..', '__fixtures__/', fileName);

export const readContent = (fileName) => parseFile(resolve(process.cwd(), fileName));
