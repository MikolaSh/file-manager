import fs from "fs";
import { join } from "path";

const add = async (currentDir, fileName, content = '') => {

  return new Promise((resolve, reject) => {
    const pathToFile = join(currentDir, fileName);
  
    const stream = fs.createWriteStream(pathToFile);

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

export default add;