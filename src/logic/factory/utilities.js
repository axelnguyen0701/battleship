export const indexOfForArrays = (arr, search) => {
  const searchJSON = JSON.stringify(search);
  const arrJSON = arr.map(JSON.stringify);

  //   console.log(
  //     "index of:",
  //     search,
  //     "in ",
  //     "arr is ",
  //     arrJSON.indexOf(searchJSON)
  //   );
  return arrJSON.indexOf(searchJSON);
};
