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
      const formattedBody = _.isObject(data[key]) ?
      `{\n${iter(data[key], depth + 1)}\n${' '.repeat(countTabs)}}` :
      iter(data[key], depth);

    return `${' '.repeat(countTabs)}${key}: ${formattedBody}`;
  });
    return `${result.join('\n')}`;
  }
  return iter(content, ind);
};

export const stylish = (content) => {
  const iter = (data, depth = 1) => {

    const formatBody = (data) => (_.isObject(data) ?
    `{\n${getData(data, depth + 1)}\n${' '.repeat(indentDepth(depth, false))}}`:
    getData(data, depth + 1));

    const formatString = (indent, sign, key, body) => `${' '.repeat(indent)}${sign}${key}: ${body}`;

    return data.flatMap(({ key, body, type, sign }) => {
      switch(type) {
        case 'added':
        case 'removed':
        case 'equal': {
          return `${formatString(indentDepth(depth), sign, key, formatBody(body))}`;
        }
        case 'updated': {
          const { signCont1, signCont2 } = sign;
          const { content1, content2 } = body;
          return `${formatString(indentDepth(depth), signCont1, key, formatBody(content1))}\n${formatString(indentDepth(depth), signCont2, key, formatBody(content2))}`;
        }
        case 'differentObjects': {
          return `${' '.repeat(indentDepth(depth))}${sign}${key}: {\n${iter(body, depth + 1).join('\n')}\n${' '.repeat(indentDepth(depth, false))}}`;
        }
      }
    });
  };
  return `{\n${iter(content).join('\n')}\n}`;
};