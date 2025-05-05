import fs, { stat } from "fs";
import os from "os";
import listFiles from "./navigation/listFiles.js";
import cd from "./navigation/cd.js";
import up from "./navigation/up.js";
import systemInfo from "./systemInfo/systemInfo.js";
import clculateHash from "./hash/clculateHash.js";
import cat from "./operations/cat.js";


let currentDir = os.homedir();

const isFile = async (pathToFile) => {
  return new Promise((resolve) => {
      fs.stat(pathToFile, (err, stats) => {
          if (err) {
              return resolve('Invalid input');
          }

          if (stats.isFile()) {
              return resolve(true);
          }

          if (stats.isDirectory()) {
              return resolve(false);
          }
      });
  });
}

const getUsername = (args) => {
  const usernameArg = args.find(arg => arg.startsWith('--username='));
  if (usernameArg) {
   return usernameArg.split('=')[1];
  } else {
    return 'Username'
  }
}

const displayCurrentDirectory = () => {
    console.log(`You are currently in ${currentDir}`);
}

const handleCommand = async (value) => {
  const [command, ...args] = value.toString().trim().split(' ');

  switch(command) {
    case 'cd': 
      try {
          currentDir = await cd(currentDir, args);
      } catch (error) {
          console.error(error);
      }
      break;
    case 'up': 
      currentDir = up(currentDir);
      break;
    case 'ls': 
      await listFiles(currentDir);
      break;
    case 'os': 
      systemInfo(args);
      break;
    case 'hash':
      const pathToFile = args[0];
      const isCorrectFile = await isFile(args[0]);
      if(isCorrectFile) {
        await clculateHash(pathToFile);
      }
      break;
    case 'cat': 
      await cat(args[0]);
      break;
    default:
      console.log('Invalid input');
  }
  displayCurrentDirectory();
}

const initFileManager = () => {
  let args = process.argv.slice(2);

  const username = getUsername(args);

  if(username) {
    console.log(`Welcome to the File Manager, ${username}!`)
  }

  displayCurrentDirectory();

  const exitFileManager = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  }


  process.stdin.on('data', (input) => {

    handleCommand(input)

    if (input.toString().trim() === '.exit') {
      exitFileManager()
    }
  });

  process.on('SIGINT', exitFileManager);
}

initFileManager()

