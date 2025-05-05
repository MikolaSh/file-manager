import fs from "fs";

const cat = async (pathToFile) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(pathToFile);
  
    stream.on("data", (value) => {
      console.log(value.toString())
    })

    stream.on("end", () => {
      resolve();
    })

    stream.on('error', (err) => {
      reject(err)
    })

  })
}

export default cat;