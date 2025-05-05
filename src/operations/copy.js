import fs from "fs";
import cat from "./cat.js";
import add from "./add.js";
import { join } from "path";

const copy = async (pathToFile, pathToNewDir) => {

  const fileName = pathToFile.split('\\').pop();

  const pathToNewFile = join(pathToNewDir, fileName);

  console.log(pathToNewFile)
  return new Promise(async (resolve, reject) => {
    const content = await cat(pathToFile);
    
    const stream = fs.createWriteStream(pathToNewFile);

    stream.on('finish', () => {
      console.log('File has been created successfully.')
    });

    stream.on('end', () => {
      resolve();
    })

    stream.on('error', () => {
      reject('Invalid Input');
    })

    stream.write(content);
    stream.end();
  })

}

export default copy;