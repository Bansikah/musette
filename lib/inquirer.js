const inquirer = require('inquirer');
const minimist = require('minimist');
const files = require('/files');

module.exports = {

    askGitHubCredentials : () => {
        const questiions = [
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
    }
    ];
        return inquirer.prompt(questiions);
    }
}