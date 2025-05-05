import fs from "fs";
import crypto from "crypto";

const clculateHash = async (pathToFile) => {

  const stream = fs.createReadStream(pathToFile);
  const hash = crypto.createHash('sha256');
  hash.setEncoding('hex');
  
  stream.pipe(hash);
  stream.on('end', () => {
      hash.end();
      console.log(`sha256 hash: ${hash.read()}`);
  });
}

export default clculateHash