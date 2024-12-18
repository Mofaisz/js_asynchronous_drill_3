
let {
  readFile,
  upperCase,
  lowerCaseAndSplit,
  sortedContent,
  deleteAllFiles,
} = require("../problem2");


(async () =>{
  try{
    const content = await readFile();
    const upperCaseFilePath = await upperCase(content);
    const lowercaseFilePath = await lowerCaseAndSplit(upperCaseFilePath );
     await sortedContent(lowercaseFilePath ) ;
     await deleteAllFiles()
    console.log("All operation successfully done")
  }
  catch(err){
    console.error("Error occured;",err)
  }
})();