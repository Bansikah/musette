const octokit = require('@octokit/rest')(); //used to access github rest API
const Configstore = require('configstores');
const _ = require('lodash');
const inquirer = require('/inquirer');
const pkg = require('../package.json');
const { askGitHubCredentials } = require('./inquirer');
const conf = new Configstore(pkg.name);

module.exports = {
  getInstance: () => {
    return octokit;
  },
  getHubAuth: (token) => {
    octokit.authenticate({
      type: 'oauth',
      token: token
    });
  },
  getStoredGitHubToken: () => {
    return conf.get('github_crendentials.token');
  },
  setGitHubCredentials: async () => {
    const credentials = await inquirer.askGitHubCredentials();
    octokit.authenticate(
      _.extend({
        type: 'basic'
      }),
      credentials
    );
  },
  registerNewToken: async () => {
    try {
      const response = await octokit.oauthAuthorization.createAuthorization({
        scope: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'musette is a cool dev tool for github workflows automation'
      });
      const token = response.data.token;
      if (token) {
        conf.set('github_credentials.token', token);
        return token;
      } else {
        throw new Error('Missing token', 'Uh oh github token was not retrieved');
      }
    } catch (error) {
      throw error;
    }
  }
};