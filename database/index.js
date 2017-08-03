const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!

  'name': String, //Name of Repo
  'full_name': String //Full Name, starting with username then / RepoName

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newRepos) => {
  newRepos.forEach(function(newRepo){
    Repo.create(newRepo, function(err, repo) {
      if(err) {
        console.log(err);
      } else {
        console.log('New Repo Added')
        console.log(repo);
      }
    });
  });
}

module.exports.save = save;