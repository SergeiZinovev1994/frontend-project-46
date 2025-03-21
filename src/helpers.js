import process from 'node:process';
import { resolve, dirname, join } from 'path';
import parseFile from './parsers.js';



export const readContent = (fileName) => parseFile(resolve(process.cwd(), fileName));
