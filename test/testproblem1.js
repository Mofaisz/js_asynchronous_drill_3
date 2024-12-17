let {createFiles,deleteFiles} = require("../problem1");


createFiles()
.then(() =>{
   console.log("File creation successfull");
   return deleteFiles() 
})
.then(() =>{
    console.log("File deletion successfull")
})
.catch((err) =>{
    console.error("Something went wrong",err)
})