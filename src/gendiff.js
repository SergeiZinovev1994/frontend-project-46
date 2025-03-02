import _ from 'lodash';
import parseFile from './parsers.js';

export const gendiff = (path1, path2) => {
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const keys = _.sortedUniq(Object.keys({ ...file1, ...file2 }));
  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        acc[`  ${key}`] = file1[key];
      } else {
      acc[`- ${key}`] = file1[key];
      acc[`+ ${key}`] = file2[key];
      }
    }
    else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      acc[`- ${key}`] = file1[key];
    } else {
      acc[`+ ${key}`] = file2[key];
    }
    return acc;
  }, {});
  return result;
};