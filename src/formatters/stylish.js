export const stylish = (data, depth = 1) => {
  const spacesPerDepth = 4;
  const baseOffsetIndex = 2;
  const countTabs = depth * spacesPerDepth - baseOffsetIndex;
  return data.reduce((acc , { key, body, type, sign }) => {
  switch(type) {
    case 'added':
    case 'removed':
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = body;
      return acc;
    case 'equal':
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = body;
      return acc;
    case 'updated': {
        const { signCont1, signCont2 } = sign;
        const { content1, content2 } = body;
      acc[`${' '.repeat(countTabs)}${signCont1}${key}`] = content1;
      acc[`${' '.repeat(countTabs)}${signCont2}${key}`] = content2;
      return acc;
    }
    case 'differentObjects': {
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = stylish(body, depth + 1);
      return acc;
    }
  }
}, {});
};