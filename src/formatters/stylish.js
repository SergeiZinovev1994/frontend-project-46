import _ from 'lodash';

const indentDepth = (depth, flag = true) => {
  const spacesPerDepth = 4;
  const baseIndex = 2;
  return flag ? depth * spacesPerDepth - baseIndex : depth * spacesPerDepth;
};

const getData = (content, ind) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const countTabs = indentDepth(depth, false);
    const keys = Object.keys(data);
    const result = keys.map((key) => {
      const formattedBody = _.isObject(data[key])
        ? `{\n${iter(data[key], depth + 1)}\n${' '.repeat(countTabs)}}`
        : iter(data[key], depth);

      return `${' '.repeat(countTabs)}${key}: ${formattedBody}`;
    });
    return `${result.join('\n')}`;
  };
  return iter(content, ind);
};

export default (content) => {
  const iter = (data, depth = 1) => {
    const formatBody = (value) => (_.isObject(value)
      ? `{\n${getData(value, depth + 1)}\n${' '.repeat(indentDepth(depth, false))}}`
      : getData(value, depth + 1));
    return data.flatMap(({ key, body, type }) => {
      switch (type) {
        case 'added':
          return `${' '.repeat(indentDepth(depth))}+ ${key}: ${formatBody(body)}`;
        case 'removed':
          return `${' '.repeat(indentDepth(depth))}- ${key}: ${formatBody(body)}`;
        case 'equal':
          return `${' '.repeat(indentDepth(depth))}  ${key}: ${formatBody(body)}`;
        case 'updated': {
          const { content1, content2 } = body;
          return `${' '.repeat(indentDepth(depth))}- ${key}: ${formatBody(content1)}\n${' '.repeat(indentDepth(depth))}+ ${key}: ${formatBody(content2)}`;
        }
        case 'nested':
          return `${' '.repeat(indentDepth(depth))}  ${key}: {\n${iter(body, depth + 1).join('\n')}\n${' '.repeat(indentDepth(depth, false))}}`;
        default:
          throw new Error(`Unknown type of Data - ${type}`);
      }
    });
  };
  return `{\n${iter(content).join('\n')}\n}`;
};
