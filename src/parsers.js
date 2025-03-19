import { readFileSync } from 'node:fs';
import { extname } from 'path';
import yaml from 'js-yaml';

export default (pathFile) => {
  const extension = extname(pathFile).slice(1);
  switch (extension) {
    case 'json':
      return JSON.parse(readFileSync(pathFile, 'utf8'));
    case 'yml':
    case 'yaml':
      return yaml.load(readFileSync(pathFile, 'utf8'));
    default:
      throw new Error(`${extension} - unknown extension`);
  }
};
