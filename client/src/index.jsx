import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './components/Search.jsx';
import NavSearch from './components/NavSearch.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';
import Navbar from './components/Navbar.jsx';
import './style.css';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      steamNickname: '',
      steamid: '',
      playerInfo: {},
      gamesOwned: []
    };
    this.search.bind(this);
    this.navSearch.bind(this);
  }

  search (term) {
    axios.post('/repos', term)
      .then( (res) => {
        this.update();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  update() {
    axios.get('/repos')
      .then( (response) => {
        console.log('Loaded Repos from Database:', 
          response.data);
        this.setState({
          repos: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  navSearch(steamNickName) {
    axios.post('/api/steam', steamNickName)
      .then( (steamdata) => {
        var steamid = steamdata.data.response.steamid;
        console.log('SUCCESS! Steam ID:', steamid);
        this.setState({
          steamid: steamid,
          steamNickname: steamNickName
        });
        this.getPlayerInfoFromSteamID(steamid);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getPlayerInfoFromSteamID (steamid) {
    axios.post('/api/steamplayerinfo', steamid)
      .then( (playerInfo) => {
        var player = playerInfo.data.response.players[0];
        this.getGameInfoFromSteamID(steamid);
        this.setState({
          playerInfo: player
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGameInfoFromSteamID (steamid) {
    axios.post('/api/steamgamesowned', steamid)
      .then( (gamesOwned) => {
        console.log('SUCCESS! gamesOwned:', gamesOwned);
        var games = gamesOwned.data.response.games;
        games.forEach((game)=>{
          console.log(game)
        })
        this.setState({
          gamesOwned: games
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.update();
    this.getAllSteamGameIds();
  }

  //Need to call this function on initalization
  //This is a one time call, Can I get away with only doing it once?
  //Impacts: Games not having the appropariate app ID to app name ref
  getAllSteamGameIds(){
    axios.post('/api/steamgameids')
      .then( (allSteamGames) => {
        console.log('SUCCESS! allSteamGames:');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    return (<div>
      <Navbar onNavSearch={this.navSearch.bind(this)}/>
        <div className='wrapper'>
          <div className="section group">
            <div className="col span_1_of_3">
              <Search onSearch={this.search.bind(this)}/>
            </div>
            <div className="col span_2_of_3">
              <RepoList repos={this.state.repos}/>
            </div>
          </div>
        </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));