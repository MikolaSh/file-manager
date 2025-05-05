import fs from "fs";
import path, { join } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const curPath = join(__dirname);


const getUsername = (args) => {



  const usernameArg = args.find(arg => arg.startsWith('--username='));
  if (usernameArg) {
   return usernameArg.split('=')[1];
  } else {
    return 'Username'
  }

}



const initFileManager = () => {
  let args = process.argv.slice(2);

  const username = getUsername(args);

  const exitFileManager = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  }

  if(username) {
    console.log(`Welcome to the File Manager, ${username}!`)
  }

  process.stdin.on('data', (input) => {

    const userInput = input.toString().trim();

    if (userInput === '.exit') {
      exitFileManager()
    }
  });

  process.on('SIGINT', exitFileManager);
}

initFileManager()

