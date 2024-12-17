// Using fs.promises for asynchronous file operations
const fs = require("fs").promises;

const path = require("path");

// Directory where files will be created and deleted
const dir = path.resolve("Random-Json-file");
const totalFiles = 10;
const dirName = "Random-Json-file";

// function to create a files
function createFiles() {
  // creates a directory if it doesn't exist
  return fs
    .mkdir(dir, { recursive: true })
    .then(() => {
      console.log(`${dirName} created successfully`);

      // Array to hold promises for file creation
      let promiseFile = [];
      for (let index = 1; index < totalFiles + 1; index++) {
        // file path for each file
        let filePath = path.join(dir, `file${index}.json`);
        let content = JSON.stringify({ id: 1, val: Math.random() });
        // Adds the write file to promise to the array
        promiseFile.push(fs.writeFile(filePath, content));
        console.log(`file${index}.json created`);
      }
      //   Wait for all file creation promises to resolve
      return Promise.all(promiseFile);
    })
    .then(() => {
      console.log(`All ${totalFiles} files created`);
      return;
    })
    .catch((err) => {
      console.error("Error in creating files");
      throw err;
    });
}

// Function to delete all files in the specified directory
function deleteFiles() {
  // Read all files in the directory
  return fs.readdir(dir).then((files) => {
    console.log("Files started Reading");
    // Map over each file and delete it
    const deletePromiseFile = files.map((file) => {
      let filePath = path.join(dir, file);
      return fs
        .unlink(filePath)
        .then(() => {
          console.log(`${file} got deleted`);
        })
        .catch((err) => {
          console.error("Error in deleting files");
          throw err;
        });
    });
    // waits for all file deletion
    return Promise.all(deletePromiseFile)
      .then(() => {
        console.log("All the files got deleted");
      })
      .catch((err) => {
        if (err) {
          console.error("Error reading directory", err);
          throw err;
        }
      });
  });
}

module.exports = { createFiles, deleteFiles };
