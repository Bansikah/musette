const musette = require('musette');
const chalk = require('chalk');
const clear = require('clear');
const figlet  = require('figlet');
const files = require('./lib/files.mjs');
const github = require('./lib/github_credentials.mjs');
//import github_crendetials from './lib/github_crendetials.mjs';
const github_credentials = require('./lib/github_credentials');
const inquirer = require('./lib/inquirer');
const repo = require('./lib/create_a_repo');
const { setGitHubCredentials } = require('./lib/github_crendetials.mjs');

//import musette from 'musette';

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

musette
      .command('create a repo')
      .description('create a new repository on Github')
      .action(async () => {
        const getGitHubTokens = async () => {
          let token = github.getStoredGitHubTokens();
          if (token){
            return token;
          }

          await setGitHubCredentials();
          token = await github.get
        }
      })

musette.parse(process.argv);

if (!musette.args.length) {
  musette.help();
}