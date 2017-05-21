export const filterMap = (map, pred) => {
  let result;

  map.forEach((id, obj) => {
    if (pred(id, obj)) {
      result = obj;
    }
  });

  return result;
};

export const deepCompare = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }

  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const deepMerge = (obj, objToMerge) => {
  for (let prop in objToMerge) {
    if (objToMerge.hasOwnProperty(prop)) {
      if (typeof prop === 'object') {
        obj[prop] = deepMerge(prop, objToMerge[prop]);
      } else {
        obj[prop] = objToMerge[prop];
      }
    }
  }

  return obj;
}
