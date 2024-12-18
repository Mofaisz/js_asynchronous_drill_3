// Import the fs module with promises support
let fs = require("fs");

const path = require("path");
let dir = path.join(__dirname, "./lipsum.txt");

// Reads the file "lipsum.txt" in UTF-8 encoding

function readFile() {
  // creates a new promise to read the file asynchronously
  return new Promise((resolve, reject) => {
    fs.readFile(dir, "utf-8", (err, data) => {
      if (err) {
        // Reject the promise if there is an error
        reject("Error in reading file");
      } else {
        // Resolve the promise with the file content if reading is successful
        resolve(data);
      }
    });
  });
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
function upperCase(content) {
  return new Promise((resolve, reject) => {
    // Convert the content to uppercase
    let upperCaseContent = content.toUpperCase();
    let filePath = path.join(__dirname, "uppercase.txt");

    // Write the uppercase content to a new file
    fs.writeFile(filePath, upperCaseContent, (err) => {
      if (err) {
        reject("Error in writing upperCase file");
      } else {
        console.log("uppercase.txt file created successfully");

        fs.appendFile("./filename.txt", "uppercase.txt", (err) => {
          if (err) {
            reject("Error in appending file name");
          } else {
            console.log("uppercase.txt filename appends into filename.txt");
            resolve(filePath);
          }
        });
      }
    });
  });
}
// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt

function lowerCaseAndSplit(filePath) {
  return new Promise((resolve, reject) => {
    // Read the content of the file specified by 'filePath'
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) {
        reject("Error in reading file at converting file into lowercase");
      } else {
        // Convert content to lowercase and split it into sentences
        let splittedContent = content.toLowerCase().split(".").join("\n");
        let filePath = path.join(__dirname, "lowercaseSplitted.txt");

        // Write the transformed content to a new file
        fs.writeFile(filePath, splittedContent, (err) => {
          if (err) {
            reject("Error in writing lowercase splitted  file");
          } else {
            console.log("LowercaseSplitted file created successfully ");
            fs.appendFile(
              "./filename.txt",
              "\nlowercaseSplitted.txt",
              (err) => {
                if (err) {
                  reject("Error in appending the lowercase File");
                } else {
                  console.log(
                    "LowercasesSplitted file appends into filename.txt"
                  );
                  resolve(filePath);
                }
              }
            );
          }
        });
      }
    });
  });
}

// Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt

function sortedContent(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        reject("Error in reading file while sorting the content");
      }

      let filePath = path.join(__dirname, "sortedContent.txt");
      // Sort the content and join sentences with newline characters
      let sortedContent = data.split(".").sort().join("\n");

      fs.writeFile(filePath, sortedContent, (err) => {
        if (err) {
          reject("Error in writing the sorted file");
        } else {
          fs.appendFile("./filename.txt", "\nsortedContent.txt", (err) => {
            if (err) {
              reject(
                "Error in appending sortedContent file name in filename.txt"
              );
            } else {
              console.log(
                "sortedContent file name successfully appends into filename.txt"
              );
              resolve(filePath);
            }
          });
        }
      });
    });
  });
}

// Function to delete all files listed in filenames.txt
function deleteAllFiles() {
  return new Promise((resolve, reject) => {
    // Read the contents of the filenames.txt to get the list of files to delete
    let filePath = path.join(__dirname, "./filename.txt");
    fs.readFile(filePath, "utf-8", (err, files) => {
      if (err) {
        // Reject the promise if there is an error reading filenames.txt
        reject("Error in reading the file to delete");
      } else {
        let allFiles = files.split("\n");
        // Create a delete promise for each file
        let deletePromise = allFiles.map((file) => {
          return new Promise((resolve, reject) => {
            fs.unlink(file, (err) => {
              if (err) {
                reject("Error in deleting files");
              } else {
                console.log(`${file} deleted`);
                resolve();
              }
            });
          });
        });

        // Wait for all delete promises to resolve
        Promise.all(deletePromise)
          .then(() => {
            console.log("All files got deleted");
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

// Export all the functions to be used in other modules
module.exports = {
  readFile,
  upperCase,
  lowerCaseAndSplit,
  sortedContent,
  deleteAllFiles,
};
