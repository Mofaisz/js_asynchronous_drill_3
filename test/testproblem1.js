let {createFiles, deleteAllFiles} = require("../problem1");


createFiles()
.then(() =>{
   console.log("File creation successfull");
   return deleteAllFiles() 
})
.then(() =>{
    console.log("All operations done")
})
.catch((err) =>{
    console.error("Something went wrong",err)
})

