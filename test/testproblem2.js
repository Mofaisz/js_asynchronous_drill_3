let {
  readFile,
  upperCase,
  lowerCase,
  sortedContent,
  deleteAllFiles,
} = require("../problem2");

readFile()
  .then((content) => {
    return upperCase(content);
  })
  .then((content) => {
    return lowerCase(content);
  })
  .then((content) => {
    return sortedContent(content);
  })
  .then(() => {
    return deleteAllFiles();
  })
  .catch((err) => {
    console.log("Something is wrong", err);
  });
