const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },
  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  isGitRepository: () =>{
    if(File.directoryExists('.git')){
        console.log(chalk.red("Sorry! can't create this repo because directory already exists in github"));
    process.exit(1);
    };
  }
};