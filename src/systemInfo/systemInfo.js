import os from "os";

const systemInfo = (args) => {
  if(!args.length) {
    console.log('Invalid input');
  }

  const command = args[0];

  switch(command) {
    case '--EOL':
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      console.log(`CPU model: ${cpus[0].model}`);
      cpus.forEach((cpu, index) => {
          console.log(`${index + 1} clock Rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`)
      break;
    case '--username':
      console.log(`Username: ${os.userInfo().username}`)
      break;
    case '--architecture':
      console.log(`Architecture: ${os.arch()}`)
      break;
    default:
      console.log('Invalid input');
  }
}

export default systemInfo;