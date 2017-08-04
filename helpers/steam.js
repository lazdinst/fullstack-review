const request = require('request');
const axios = require('axios');
const config = require('../config.js');

let getSteamIdByVanityURL = (user) => {
  let key = '55DA5B587373A31116CAD4B8B4BE3F05';
  let vanityURL = 'TNauda'

  //55DA5B587373A31116CAD4B8B4BE3F05&steamids=76561197986069784'
  // let url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' 
  // + key + '&vanityurl=' + vanityURL;


  let url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=55DA5B587373A31116CAD4B8B4BE3F05&vanityurl=TNauda';
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

let getPlayerInfoBySteamID = (steamID) => {
  let key = '55DA5B587373A31116CAD4B8B4BE3F05';
  let url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + key +'&steamids=' + steamID;
  console.log('Player Info URL: ', url);
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=55DA5B587373A31116CAD4B8B4BE3F05&steamid=76561197986069784&format=json
let getGamesOwnedBySteamID = (steamID) => {
  let key = '55DA5B587373A31116CAD4B8B4BE3F05';
  let url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key +'&steamid=' + steamID + '&format=json';
  console.log('Games Owned URL: ', url);
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

let getAllGameIds = () => {
  let url = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/';
  console.log('All Games URL: ', url);
  return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports.getAllGameIds = getAllGameIds;
module.exports.getGamesOwnedBySteamID = getGamesOwnedBySteamID;
module.exports.getPlayerInfoBySteamID = getPlayerInfoBySteamID;
module.exports.getSteamIdByVanityURL = getSteamIdByVanityURL;