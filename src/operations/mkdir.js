import fs from "fs";
import { join } from "path";

const mkdir = async (currentDir, directoryName) => {
  const dirPath = join(currentDir, directoryName);
  console.log(dirPath);
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return reject(`Some error appeared, try again`);
      }
      resolve(`Directory created successfully at: ${dirPath}`);
    });
  });
}

export default mkdir