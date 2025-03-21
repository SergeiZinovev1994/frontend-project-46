import process from 'node:process';
import { resolve, extname } from 'path';
import { readFileSync } from 'node:fs';
import parseFile from './parsers.js';

const getContentAndType = (path) => {
  const extension = extname(path).slice(1);
  return { content: readFileSync(path, 'utf-8'), format: extension };
};

export default (fileName) => parseFile(getContentAndType(resolve(process.cwd(), fileName)));
