const inquirer = require('inquirer');
const minimist = require('minimist');
const files = require('/files');

module.exports = {

    askGitHubCredentials : () => {
        const questions = [
         {
            name : 'username',
            type: 'input', 
            message: 'Enter your GitHub username or e-mail address',
            validate : function(value) {
                if (value.length > 0) {
                    return true;
            } else {
                return "Please enter username or e-mail address again";
            }
        }
        },
    {
               name : 'password',
               type: 'password', 
               message: 'Enter password',
               validate : function(value) {
                   if (value.length > 0) {
                       return true;
               } else {
                   return "Please password again";
               }
           }
    },
    askRepositoryDetails: () => {
     const argv = require('minimist')(process.argv.slice(2));

     const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter a name of your repository',
            default: avgr._[0] || files.getCurrentDirectoryBase(),
            validate: function(value){
                if (value.length > 0) {
                    return true;
                } else {
                    return "Please enter a name of your repository";
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            default: avgr._[1] || null,
            message: 'Please enter a description of your repository(optional)',
        },
        {
            type: 'input',
            name: 'visibility',
            message: 'Would you like to set the repository to public or private?',
            choices: ['public', 'private'],
            default: 'public'
        }
    ]
}
    ];
        return inquirer.prompt(questions);
    }
}