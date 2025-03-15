import { gendiff } from "./src/gendiff.js";
import formatData from './src/formatters/index.js';

export default (filePath1, filePath2 , formatName = 'stylish') => {
  const data = gendiff(filePath1, filePath2);
  return formatData(data, formatName);
};