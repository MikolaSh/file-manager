import os from "os";
import path from "path";

const up = (currentDir) => {
  try {
    if(currentDir ===  os.homedir()) {
      throw new Error('Invalid input: root directory');
    }
    return path.dirname(currentDir);
  } catch(err) {
    console.log(err.message);
    return currentDir
  }
}

export default up