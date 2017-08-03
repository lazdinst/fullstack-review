const request = require('request');
const axios = require('axios');
const config = require('../config.js');

let getSteamIdByVanityURL = (user) => {

  let key = '55DA5B587373A31116CAD4B8B4BE3F05';
  let vanityURL = 'Tnauda'

  //55DA5B587373A31116CAD4B8B4BE3F05&steamids=76561197986069784'
  let url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' 
  + key + '&vanityurl=' + vanityURL;
  
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

let getAllGameIds = (user) => {
  let key = '55DA5B587373A31116CAD4B8B4BE3F05';
  let vanityURL = 'TNauda'

  //55DA5B587373A31116CAD4B8B4BE3F05&steamids=76561197986069784'
  let url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' 
  + key + '&vanityurl=' + vanityURL;

  console.log(url);
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports.getAllGameIds = getAllGameIds;
module.exports.getSteamIdByVanityURL = getSteamIdByVanityURL;