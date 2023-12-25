import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import files from './lib/files.mjs';
import github from './lib/github_credentials.mjs';
//import github_crendetials from './lib/github_crendetials.mjs';
const github_credentials = require('./lib/github_credentials');

import musette from 'musette';

musette
  .command('init')
  .description('Draw App banner')
  .action(() => {
    clear();
    console.log(chalk.magenta(figlet.textSync('musette', { horizontalLayout: 'full' })));
  });

musette
  .command('octocheck')
  .description('check user GitHub Credentials')
  .action(async () => {
    let token = github.getStoredGitHubToken();
    if (!token) {
      await github.setGitHubCredentials();
      token = await github.registerNewToken();
    }
    console.log(token);
  });

musette.parse(process.argv);

if (!musette.args.length) {
  musette.help();
}