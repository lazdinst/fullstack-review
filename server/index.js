const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require('../helpers/github.js');
const steam = require('../helpers/steam.js');
const JSONpretty = require('../lib/jsonPretty.js');
const mongoHelper = require('../database/index.js');
const steamHelper = require('../database/steam.js');
const steamGameHelper = require('../database/steamGames.js');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

//GET Github Data, Save to MongoDB
app.post('/repos', function (req, res, next) {
  var username = Object.keys(req.body)[0];
  githubHelper.getReposByUsername(username)
  .then((data) => {
    mongoHelper.save(data)
    res.send('Sucess')
  })
  .catch(function(err){
    console.log(err);
  });
});

//GET ALL THE MongoDB Repos
app.get('/repos', function (req, res) {
  mongoHelper.find(function(repos){
    res.json(repos);
  });
});

//POST Req to SteamHelper GET to SteamID
app.post('/api/steam', function (req, res, next) {
  var vanity = Object.keys(req.body)[0];
  steam.getSteamIdByVanityURL(vanity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;      
    })
});

//POST Req to SteamHelper to GET PlayerInfo by Steam id
app.post('/api/steamplayerinfo', function (req, res, next) {
  var steamID = Object.keys(req.body)[0];
  steam.getPlayerInfoBySteamID(steamID)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;      
    })
});

//POST Req to SteamHelper to GET GamesOwned by Steam id
app.post('/api/steamgamesowned', function (req, res, next) {
  var steamID = Object.keys(req.body)[0];
  steam.getGamesOwnedBySteamID(steamID)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      throw err;      
    })
});


//POST request to get all Steam Game IDs
app.post('/api/steamgameids', function (req, res, next) {
  // var steamID = Object.keys(req.body)[0];
  steam.getAllGameIds()
    .then((data) => {
      //Rather than just returning the data to send it back to the server
      //It would be best to just add all the games to the database immediately

      //TODO: HELPER FUNCTION WITH DATA TO DATABASE
      steamGameHelper.save(data.applist.apps);
      //console.log(data.applist.apps.length);
      res.end();
      //res.json(data);
    })
    .catch((err) => {
      throw err;      
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});