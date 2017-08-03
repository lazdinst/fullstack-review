const mongoose = require('mongoose');
const url = 'mongodb://localhost/fetcher';
mongoose.connect(url, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let repoSchema = mongoose.Schema({
  name: String, //Name of Repo
  full_name: { type: String, unique: true }, //Full Name, starting with username then / RepoName
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

// let save = (newRepos) => {
//   newRepos.forEach(function(newRepo){
//     Repo.create(newRepo, function(err, repo) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('New Repo Added to the Database')
//         console.log(repo);
//       }
//     });
//   });
// }

// let find = (callback) => {
//   Repo.find({}, function(err, repos){
//     if(err) {
//       console.log(err)
//     } else {
//       console.log(repos);
//       callback(repos)
//     }
//   });
// }
