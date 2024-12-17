// Import the fs module with promises support
let fs = require("fs").promises;

const path = require("path");
let dir = path.join(__dirname, "./lipsum.txt");

// Reads the file "lipsum.txt" in UTF-8 encoding

function readFile() {
  return fs
    .readFile(dir, "utf-8")
    .then((content) => {
      console.log("File started reading...");
      // Return the content to the next step
      return content;
    })
    .catch((err) => {
      if (err) {
        // Log error if file read fails
        console.error("Error in reading file");
        throw err;
      }
    });
}

// Function to convert content to uppercase and save it in a new file

function upperCase(content) {
  // Convert content to uppercase
  uppercaseContent = content.toUpperCase();
  let filePath = path.join(__dirname, "uppercase.txt");
  return fs
    .writeFile(filePath, uppercaseContent)
    .then(() => {
      console.log("Uppercase File got created");
      return fs.writeFile("./filename.txt", "uppercase.txt");
    })
    .then(() => {
      console.log("Filename uppercase.txt appended in filename.txt");
      // Return path of the new file
      return filePath;
    })
    .catch((err) => {
      console.error("Error at creating uppercase file;", err);
      throw err;
    });
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

function lowerCase(content) {
  // Read the specified file
  return fs.readFile(content, "utf-8").then((content) => {
    // Convert to lowercase
    let lowercaseContent = content.toLowerCase();

    // Write the split content
    let splittedContent = lowercaseContent.split(".").join("\n");

    let filePath = path.join(__dirname, "lowercaseSplitted.txt");

    return fs
      .writeFile(filePath, splittedContent)
      .then(() => {
        console.log("LowerCase splitted data created ");
        return fs.appendFile("./filename.txt", "\nlowercaseSplitted.txt");
      })
      .then(() => {
        console.log("lowercase file name get appended to filename.txt");
        return filePath;
      })
      .catch((err) => {
        console.error("Error at creating splitted lowercase file", err);
        throw err;
      });
  });
}

// Function to sort the content and write to a new file
function sortedContent(content) {
  lowerCaseContentPath = path.join(__dirname);
  return fs.readFile(content, "utf-8").then((content) => {
    // Split, sort, and join content
    let sortedContent = content.split(".").sort().join();
    let filePath = path.join(__dirname, "sortedContent.txt");
    return (
      fs
        // Write sorted content
        .writeFile(filePath, sortedContent)
        .then(() => {
          console.log("Sorted content got created ");
          // Append filename
          return fs.appendFile("./filename.txt", "\nsortedContent.txt");
        })
        .then(() => {
          console.log("sorted content filename appends to filename.txt");
          return filePath;
        })
        .catch((err) => {
          console.error("Error in sortedContent function");
          throw err;
        })
    );
  });
}

// Function to delete all files listed in filenames.txt

function deleteAllFiles() {
  // Path to filename.txt
  let filenamePath = path.join("./", "./filename.txt");
  // Read the list of filenames
  fs.readFile(filenamePath, "utf-8").then((files) => {
    // Split filenames into an array
    let allFiles = files.split("\n");
    // Create delete promises
    let deletePromise = allFiles.map((file) => {
      return fs.unlink(file);
    });
    return Promise.all(deletePromise)
      .then(() => {
        console.log("All files got deleted");
      })
      .catch((err) => {
        console.error("Error in deleting files:", err);
        throw err;
      });
  });
}

module.exports = {
  readFile,
  upperCase,
  lowerCase,
  sortedContent,
  deleteAllFiles,
};
