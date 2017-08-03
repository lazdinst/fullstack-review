const mongoose = require('mongoose');
const url = 'mongodb://localhost/fetcher';
mongoose.connect(url);

let repoSchema = mongoose.Schema({
  'name': String, //Name of Repo
  'full_name': String, //Full Name, starting with username then / RepoName
  'html_url': String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newRepos) => {
  newRepos.forEach(function(newRepo){
    Repo.create(newRepo, function(err, repo) {
      if(err) {
        console.log(err);
      } else {
        console.log('New Repo Added to the Database')
        console.log(repo);
      }
    });
  });
}

let find = (callback) => {
  Repo.find({}, function(err, repos){
    if(err) {
      console.log(err)
    } else {
      console.log(repos);
      callback(repos)
    }
  });
}

module.exports.save = save;
module.exports.find = find;