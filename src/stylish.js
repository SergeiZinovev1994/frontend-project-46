export const formatter = (arr, depth = 1) => {
  const spacesPerDepth = 4;
  const baseOffsetIndex = 2;
  const countTabs = depth * spacesPerDepth - baseOffsetIndex;
  return arr.reduce((acc , { key, body, type, sign }) => {
  switch(type) {
    case 'onlyInContent1':
    case 'onlyInContent2':
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = body;
      return acc;
    case 'equal':
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = body;
      return acc;
    case '0 or 1 objects': {
        const { signCont1, signCont2 } = sign;
        const { content1, content2 } = body;
      acc[`${' '.repeat(countTabs)}${signCont1}${key}`] = content1;
      acc[`${' '.repeat(countTabs)}${signCont2}${key}`] = content2;
      return acc;
    }
    case 'differentObjects': {
      acc[`${' '.repeat(countTabs)}${sign}${key}`] = formatter(body, depth + 1);
      return acc;
    }
  }
}, {});
};