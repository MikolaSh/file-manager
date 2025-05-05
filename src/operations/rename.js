import fs from 'fs';
import { join } from 'path';

const getNewPath = (oldPath, newName) => join(oldPath.split('\\').slice(0, -1).join('\\'), newName)

const rename = async (oldPath, newName) => {

  const newPath = getNewPath(oldPath, newName)

  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if(err) {
        reject('Invalid Input');
      }
      resolve('File has been renamed successfully');
    })
  })

}

export default rename