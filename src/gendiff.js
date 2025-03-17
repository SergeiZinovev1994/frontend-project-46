import _ from 'lodash';

const createNode = (key, body, type, sign) => ({
  key,
  body,
  type,
  sign,
});

export default (file1, file2) => {
  const core = (content1, content2) => {
    const keys = _.uniq(Object.keys({ ...content1, ...content2 }));
    return keys.toSorted().map((key) => {
      if (!Object.hasOwn(content2, key)) {
        return createNode(key, content1[key], 'removed', '- ');
      }
      if (!Object.hasOwn(content1, key)) {
        return createNode(key, content2[key], 'added', '+ ');
      }
      if (_.isEqual(content1[key], content2[key])) {
        return createNode(key, content1[key], 'equal', '  ');
      }
      if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        return createNode(
          key,
          { content1: content1[key], content2: content2[key] },
          'updated',
          { signCont1: '- ', signCont2: '+ ' },
        );
      }
      if ((_.isPlainObject(content1[key]) && _.isPlainObject(content2[key]))) {
        return createNode(key, core(content1[key], content2[key]), 'differentObjects', '  ');
      }
      throw new Error(`${key} was not finded`);
    });
  };
  return core(file1, file2);
};
