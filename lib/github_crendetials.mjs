const { Octokit } = require('@octokit/rest');
const Configstore = require('configstore');
const _ = require('lodash');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const { askGitHubCredentials } = require('./inquirer');
const conf = new Configstore(pkg.name);

const octokit = new Octokit();

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
    return conf.get('github_credentials.token');
  },
  setGitHubCredentials: async () => {
    const credentials = await askGitHubCredentials();
    octokit.authenticate(
      _.extend({
        type: 'basic'
      }),
      credentials
    );
  },
  registerNewToken: async () => {
    try {
      const response = await octokit.oauthAuthorizations.createAuthorization({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'musette is a cool dev tool for GitHub workflows automation'
      });
      const token = response.data.token;
      if (token) {
        conf.set('github_credentials.token', token);
        return token;
      } else {
        throw new Error('Missing token: Uh oh, GitHub token was not retrieved');
      }
    } catch (error) {
      throw error;
    }
  }
};