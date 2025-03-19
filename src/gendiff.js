import _ from 'lodash';

export default (file1, file2) => {
  const core = (content1, content2) => {
    const keys = _.uniq(Object.keys({ ...content1, ...content2 }));
    return keys.toSorted().map((key) => {
      if (!Object.hasOwn(content2, key)) {
        return { key, body: content1[key], type: 'removed' };
      }
      if (!Object.hasOwn(content1, key)) {
        return { key, body: content2[key], type: 'added' };
      }
      if (_.isEqual(content1[key], content2[key])) {
        return { key, body: content1[key], type: 'equal' };
      }
      if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        return { key, body: { content1: content1[key], content2: content2[key] }, type: 'updated' };
      }
      if ((_.isPlainObject(content1[key]) && _.isPlainObject(content2[key]))) {
        return { key, body: core(content1[key], content2[key]), type: 'differentObjects' };
      }
      throw new Error(`${key} was not finded`);
    });
  };
  return core(file1, file2);
};
