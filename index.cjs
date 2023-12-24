const musette = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');

musette
  .command('init')
  .description('Draw App banner')
  .action(() => {
    clear();
    console.log(chalk.magenta(figlet.textSync('musette', { horizontalLayout: 'full' })));
  });

musette.parse(process.argv);
if (!musette.args.length) {
  musette.help();
}