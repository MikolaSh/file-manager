import fs from 'fs';
import { join } from 'path';

const cd = async (currentDir, args) => {

  const to = args[0];

  return new Promise((resolve, reject) => {
    fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
      if (err) {
          return reject('Error reading directory');
        }
        const foundDirectory = files.find(file => {
        return file.name === to && file.isDirectory()});
      if (foundDirectory) {
        const newDir = join(currentDir, to);
        return resolve(newDir);
      } else {
        return reject('Directory not found');
      }
    });

  });
}

export default cd