export const convertObjectToArray = (srcObj) => {
  let result = [];
  Object.keys(srcObj).map((keyName) => {
    const temp = {
      name: keyName,
      value: srcObj[keyName],
    };
    result.push(temp);
  });
  return result;
};
