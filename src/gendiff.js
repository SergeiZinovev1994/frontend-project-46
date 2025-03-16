import _ from 'lodash';
import { readContent } from './helpers.js';

export default (path1, path2) => {
  const file1 = readContent(path1);
  const file2 = readContent(path2);
  const core = (content1, content2) => {
    const keys = _.uniq(Object.keys({ ...content1, ...content2 }));
    return keys.toSorted().map((key) => {
      let node;
      if (!Object.hasOwn(content2, key)) {
        node = {
          key, body: content1[key], type: 'removed', sign: '- ',
        };
      } else if (!Object.hasOwn(content1, key)) {
        node = {
          key, body: content2[key], type: 'added', sign: '+ ',
        };
      } else if (_.isEqual(content1[key], content2[key])) {
        node = {
          key, body: content1[key], type: 'equal', sign: '  ',
        };
      } else if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        node = {
          key, body: { content1: content1[key], content2: content2[key] }, type: 'updated', sign: { signCont1: '- ', signCont2: '+ ' },
        };
      } else {
        node = {
          key, body: core(content1[key], content2[key]), type: 'differentObjects', sign: '  ',
        };
      }
      return node;
    });
  };
  return core(file1, file2);
};
