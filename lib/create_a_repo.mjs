const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();

const inquirer = require('./inquirer');
const gh = require('./github_crendetials');

module.exports = {
    createRemoteRepository: async ()=> {
 const github = gh.getInstance();

 const answer = await inquirer.askRepositoryDetails();

 const data = {
    name: answer.name,
    description: answer.description,
    private: (answer.visibility === 'private')
 };
 try{
    const response = await github.repos.createForAuthenticatedUser(data);
    return response.data.ssh_url;
 } catch(error){
    throw error;
 }
    },
createGitIgnore: async () =>{
    const filelist = _.without(fs.readdirSync('.'), '.git','.gitignore');

    if (filelist.length){
      const answers = await inquirer.askIgnoreFiles(filelist);
      if (answers.ignore.length){
        fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
      }else{
        touch ('.gitignore');
    }
    }else{
        touch ('.gitignore');
    }
},
setupRepository: async (url) => {
    try{
        await git
            .init()
            .add('.gitignore')
            .add('./*')
            .commit('Initial commit')
            .addRemote('origin', url)
            .push('origin', master);
        return true;
    }catch(error) {
        throw error;
    }
}
}