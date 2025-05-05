import fs from "fs";
import { join } from "path";

const listFiles = async (currentDir) => {
    try {
        const dir = await fs.promises.opendir(currentDir);
        console.log('Index\t\t\tName\t\t\tType');
        let index = 1;
        for await (const dirent of dir) {
            const fileType = dirent.isDirectory() ? 'directory' : 'file';
            console.log(`${index++}\t\t\t${dirent.name}\t\t\t${fileType}`);
        }
    } catch (error) {
        console.log('Operation failed');
        console.error(error);
    }
}

export default listFiles