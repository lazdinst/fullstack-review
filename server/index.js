const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require('../helpers/github.js');
const steam = require('../helpers/steam.js');
const JSONpretty = require('../lib/jsonPretty.js');
const mongoHelper = require('../database/index.js');
const steamHelper = require('../database/steam.js');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res, next) {
  var username = Object.keys(req.body)[0];
  githubHelper.getReposByUsername(username)
  .then((response) => {
    mongoHelper.save(response);
  })
  .catch(function(err){
    console.log(err);
  });
});

app.get('/repos', function (req, res) {
  mongoHelper.find(function(repos){
    res.json(repos);
  });
});

app.get('/api/steam', function (req, res) {
  steam.getAllGameIds()
    .then((gameIds) => {
      //console.log(gameIds);
      steamHelper.save()
      return gameIds;
    })
    .catch((err) => {
      throw err;      
    })
});
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});