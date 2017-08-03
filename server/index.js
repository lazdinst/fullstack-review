const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require('../helpers/github.js');
const mongoHelper = require('../database/index.js');
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
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});