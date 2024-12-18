// Using fs.promises for asynchronous file operations
const fs = require("fs");

const path = require("path");

// Directory where files will be created and deleted
const dir = path.resolve("Random-Json-file");
const totalFiles = 10;
const dirName = "Random-Json-file";

// function to create a files
function createFiles() {
  // creates a new promise to handle asynchronous operations
  return new Promise((resolve, reject) => {
    // creates a directory if it doesn't exist
    return fs.mkdir(dir, { recursive: true }, (err) => {
      // Reject the promise if there is an error creating the directory
      if (err) {
        reject("Error in making directory");
      } else {
        console.log("Directory created successfully");

        // Array to hold promises for each file
        let promiseFile = [];
        for (let index = 1; index < totalFiles + 1; index++) {
          // file path for each file
          let filePath = path.join(dir, `file${index}.json`);
          let content = JSON.stringify({ id: 1, val: Math.random() });
          // Adds the write file to promise to the array
          promiseFile.push(
            new Promise((resolve, reject) => {
              fs.writeFile(filePath, content, (err) => {
                if (err) {
                  reject("Error in writing files");
                } else {
                  console.log(`file${index}.json created`);
                  resolve();
                }
              });
            })
          );
        }
        // Wait for all file creation promises to resolve
        Promise.all(promiseFile)
          .then(() => {
            // Resolve the main promise once all files are created
            resolve("All files created successfully");
          })
          .catch(() => {
            // Reject the main promise if there was an error creating any file
            reject("Error in creating files");
          });
      }
    });
  });
}

// Function to delete all files in the specified directory
function deleteAllFiles() {
  return new Promise((resolve, reject) => {
    // Read the contents of the directory to get the list of files
    fs.readdir(dir, "utf-8", (err, files) => {
      if (err) {
        reject("Error in reading the files to delete");
      } else {
        console.log("Started reading files");
        // Map over the files and create a delete promise for each file
        let deletePromiseFiles = files.map((file) => {
          return new Promise((resolve, reject) => {
            let filePath = path.join(dir, file);
            // Delete the file asynchronously
            fs.unlink(filePath, (err) => {
              if (err) {
                reject("Error in deleting files");
              } else {
                console.log(`${file} deleted successfully`);
                resolve();
              }
            });
          });
        });

        Promise.all(deletePromiseFiles)
          .then(() => {
            // Resolve the main promise once all files are deleted
            console.log("All files deleted successfully");
            resolve();
          })
          .catch((err) => {
            // Reject the main promise if there was an error deleting any file
            console.error("Error in deleting files");
            reject(err);
          });
      }
    });
  });
}


module.exports = { createFiles, deleteAllFiles };
