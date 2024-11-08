import { readFileSync } from 'node:fs'

export default (path1, path2) => {
  const file1 = readFileSync(path1, 'utf8');
  const file2 = readFileSync(path2, 'utf8');
  const parseFile1 = JSON.parse(file1);
  const parseFile2 = JSON.parse(file2);
  console.log(parseFile1);
  console.log(parseFile2);
};