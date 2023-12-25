import chalk from 'chalk';
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const github = require('./lib/github_credentials');

musette
  .command('init')
  .description('Draw App banner')
  .action(() => {
    clear();
    console.log(chalk.magenta(figlet.textSync('musette', { horizontalLayout: 'full' })
    )
    );
  });

musette
  .command('octocheck')
  .description('check user GitHub Credentials')
  .action(async () => {
    const token = github.getStoredGitHubToken();
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