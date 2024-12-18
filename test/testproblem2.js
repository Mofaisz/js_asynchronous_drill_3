let {
  readFile,
  upperCase,
  lowerCaseAndSplit,
  sortedContent,
  deleteAllFiles,
} = require("../problem2");

readFile()
  .then((content) => {
    return upperCase(content);
  })
  .then((filePath) => {
    return lowerCaseAndSplit(filePath);
  })
  .then((filePath) => {
    return sortedContent(filePath);
  })
  .then(() => {
    return deleteAllFiles();
  })
  .then(() => {
    console.log("All operation successfully done");
  })
  .catch((err) => {
    console.error(err);
  });
