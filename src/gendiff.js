import _ from 'lodash';
import parseFile from './parsers.js';
import getPathToFile from './helpers.js';

export const gendiff = (path1, path2) => {
  
  const file1 = parseFile(getPathToFile(path1));
  const file2 = parseFile(getPathToFile(path2));

  const core = (content1, content2) => {
    const keys = _.uniq(Object.keys({ ...content1, ...content2 }));
    const result = keys.toSorted().map((key) => {
    if (!Object.hasOwn(content2, key)) {
      return { key, body: content1[key], type: 'onlyInContent1', sign: '- '};
    } else if (!Object.hasOwn(content1, key)) {
      return { key, body: content2[key], type: 'onlyInContent2', sign: '+ '};
    } else if (_.isEqual(content1[key], content2[key])) {
      return { key, body: content1[key], type: 'equal', sign: '  ' };
    } else if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
      return { key, body: { content1: content1[key], content2: content2[key] }, type: '0 or 1 objects', sign: { signCont1: '- ', signCont2: '+ '} };
    } else {
      return { key, body: core(content1[key], content2[key]), type: 'differentObjects', sign: '  '}
    }
    });
    return result;
  };
  
  return core(file1, file2);
};