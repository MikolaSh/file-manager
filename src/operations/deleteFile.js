import fs from "fs"

const deleteFile = async (pathToFile) => {
  return new Promise((resolve, reject) => {
    fs.rm(pathToFile, (err) => {
      if(err) {
        reject('\nInvalid Input \n');
      }
      resolve();
    })
  })
}

export default deleteFile;