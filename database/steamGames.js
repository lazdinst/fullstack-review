const mongoose = require('mongoose');
const url = 'mongodb://localhost/steam';
mongoose.connect(url, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

let appArchiveSchema = mongoose.Schema({
  appid: { type: String, unique: true },
  name: { type: String, unique: true }
});

let AppArchive = mongoose.model('AppArchive', appArchiveSchema);

let save = (apps) => {
  apps.forEach(function(app){
    AppArchive.create(app)
      .then((app) => {
        //console.log('New Repo Added to the Database', repo.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// let find = (callback) => {
//   Repo.find({})
//     .limit(25)
//     .then((repos)=> {
//       console.log('Retrieved Repos');
//       return callback(repos)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

module.exports.save = save;
//module.exports.find = find;