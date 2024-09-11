export const getEnum = (option, enumObject) => {
  for (let key of Object.keys(enumObject)) {
    if (key === Object.keys(option)[0]) {
      return key;
    }
  }
};
