// Import the fs module with promises support
let fs = require("fs");

const path = require("path");
let dir = path.join(__dirname, "./lipsum.txt");

// Reads the file "lipsum.txt" in UTF-8 encoding

async function readFile() {
  // creates a new promise to read the file asynchronously
  try {
    let data = await fs.promises.readFile(dir, "utf-8");
    console.log("Successfully reads the content");
    return data;
  } catch (err) {
    throw new Error("Error in reading file");
  }
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt

async function upperCase(content) {
  try {
    // convert the content to uppercase
    let uppercaseContent = content.toUpperCase();
    let filePath = path.join(__dirname, "uppercase.txt");

    // write uppercase file
    await fs.promises.writeFile(filePath, uppercaseContent);
    console.log("Successfully writes uppercase file");

    // appends the uppercase filename in filename.txt
    await fs.promises.appendFile("./filename.txt", "uppercase.txt");
    console.log("Successfully appends uppercase.txt into filename.txt");
    return filePath;
  } catch (err) {
    // handles error
    throw new Error("Error in uppercase");
  }
}

async function lowerCaseAndSplit(filePath) {
  try {
    // read the content
    let data = await fs.promises.readFile(filePath, "utf-8");

    // Convert content to lowercase and split sentences into new lines
    let content = data.toLowerCase().split(".").join("\n");

    let newFilePath = path.join(__dirname, "/lowerCaseSplit.txt");

    // write file which transformed now
    await fs.promises.writeFile(newFilePath, content);
    console.log("Successfully write splitted lowercase.txt");

    // Append the new file name to filenames.txt
    await fs.promises.appendFile("./filename.txt", "\nlowerCaseSplit.txt");
    console.log("Successfully append lowerCaseSplit.txt");
    return newFilePath;
  } catch (err) {
    // Handles any error in the lowercase/split process
    throw new Error("Error in lowerCaseSplit function");
  }
}
// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
async function sortedContent(filePath) {
  try {
    // Read the content
    let data = await fs.promises.readFile(filePath, "utf-8");
    // Sort the content and format with new lines
    let content = data.split(".").sort().join("\n");
    let newFilePath = path.join(__dirname, "./sortedContent.txt");

    // write the sorted files
    await fs.promises.writeFile(newFilePath, content);
    console.log("Successfully writes file of sortedContent");

    // append the file to filename.txt
    await fs.promises.appendFile("./filename.txt", "\nsortedContent.txt");
    console.log("Successfully appends sortedContent");
  } catch (err) {
    throw new Error("Error in sorted file");
  }
}

//delete function

async function deleteAllFiles() {
  try {
    // Read the list of filenames to delete
    let files = await fs.promises.readFile("./filename.txt", "utf-8");
    let allFiles = files.split("\n");

    // Loop through the file list and delete each one
    for (let file of allFiles) {
      await fs.promises.unlink(file);
      console.log(`${file} deleted successfully`);
    }
    console.log("All files deleted");
  } catch (err) {
    // handles error
    throw new Error("Error in deleting files");
  }
}

// Export all the functions to be used in other modules
module.exports = {
  readFile,
  upperCase,
  lowerCaseAndSplit,
  sortedContent,
  deleteAllFiles,
};
