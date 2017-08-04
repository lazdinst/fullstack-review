const mongoose = require('mongoose');
const url = 'mongodb://localhost/fetcher';
mongoose.connect(url, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

let repoSchema = mongoose.Schema({
  name: String,
  full_name: { type: String, unique: true },
  html_url: { type: String, unique: true },
  owner: {
    avatar_url: String,
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newRepos) => {
  newRepos.forEach(function(newRepo){
    Repo.create(newRepo)
      .then((repo) => {
        console.log('New Repo Added to the Database', repo.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

let find = (callback) => {
  Repo.find({})
    .limit(25)
    .then((repos)=> {
      console.log('Retrieved Repos');
      return callback(repos)
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports.save = save;
module.exports.find = find;