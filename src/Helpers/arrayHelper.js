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

export const sortDataByCreatedDate = (data) => {
  let newData = data.map((el) => {
    return { ...el, convertedCreateDate: new Date(el.createdDate) };
  });
  newData.sort((a, b) => b.convertedCreateDate - a.convertedCreateDate);
  return newData;
};

export const deepCloneArray = (array) => {
  return JSON.parse(JSON.stringify(array))
}