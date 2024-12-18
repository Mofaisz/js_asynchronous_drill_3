// Using fs.promises for asynchronous file operations
const fs = require("fs");

const path = require("path");

// Directory where files will be created and deleted
const dir = path.resolve("Random-Json-file");
const totalFiles = 10;

// Function to create and immediately delete a file
async function createAndDeleteFiles(index) {
  let filePath = path.join(dir, `file${index}.json`);
  let content = JSON.stringify({ id: 1, value: Math.random() });
  try {
    // Create the file
    await fs.promises.writeFile(filePath, content);
    console.log(`file${index}.json created`);

    // delete the the file
    await fs.promises.unlink(filePath);
    console.log(`file${index}.json deleted`);
  } catch (err) {
    throw new Error("Error in creating or deleting files");
  }
}

// Function to manage directory creation and file operations

async function manageFiles() {
  try {
    // Create the directory
    await fs.promises.mkdir(dir, { recursive: true });
    console.log("Directory successfully created ");

    // Loop through and handle each file
    for (let index = 1; index < totalFiles + 1; index++) {
      await createAndDeleteFiles(index);
    }
    console.log("All files deleted successfully");
  } catch (err) {
    throw new Error("Error in managing files");
  }
}

module.exports = manageFiles;
