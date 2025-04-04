const stringify = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case 'object':
      return value === null ? null : '[complex value]';
    case 'number':
      return String(value);
    default:
      throw new Error(`Unknown type of data - ${typeof (value)}`);
  }
};

export default (content) => {
  const iter = (data, path = '') => data
    .flatMap(({ key, body, type }) => {
      switch (type) {
        case 'added':
          return `Property '${path}${key}' was added with value: ${stringify(body)}`;
        case 'removed':
          return `Property '${path}${key}' was removed`;
        case 'updated': {
          const { content1, content2 } = body;
          return `Property '${path}${key}' was updated. From ${stringify(content1)} to ${stringify(content2)}`;
        }
        case 'equal':
          return [];
        case 'nested': {
          return iter(body, `${path}${key}.`);
        }
        default:
          throw new Error(`Unknown type - ${type}`);
      }
    })
    .join('\n');
  return iter(content);
};
