import fs from "fs";

const cat = async (pathToFile) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(pathToFile);

    let content;
  
    stream.on("data", (value) => {
      content += value.toString();
    })

    stream.on("end", () => {
      resolve(content);
    })

    stream.on('error', () => {
      reject('Invalid input')
    })

  })
}

export default cat;