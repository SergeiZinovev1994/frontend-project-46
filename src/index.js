import gendiff from './gendiff.js';
import formatData from './formatters/index.js';
import readContent from './helpers.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = readContent(filePath1);
  const file2 = readContent(filePath2);
  const data = gendiff(file1, file2);
  return formatData(data, formatName);
};
