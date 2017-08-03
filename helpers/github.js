const request = require('request');
const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  var url = 'https://api.github.com/users/' + user + '/repos'
  let rawRepos;
  let options = {
    // url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token 56f9e727a29e04dc4c52eb3aaaaef9a57cfd1534'
    }
  };
  
  return axios.get(url, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports.getReposByUsername = getReposByUsername;