import fs from "fs";
import os from "os";
import listFiles from "./navigation/listFiles.js";
import cd from "./navigation/cd.js";
import up from "./navigation/up.js";


let currentDir = os.homedir();

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
  console.log(command);

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

