import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      steamId: ''
    };
    this.search.bind(this);
  }

  search (term) {
    console.log('Search initiated; Term: ', term);
    //When a user has entered an input
    //Generate a post to the Server (Server will GET from Github)
    // $.post('/repos', term, function(data){
    //   console.log('Sucessful POST to Server');
    //   console.log('This POST req is the GET req to Github');
    //   console.log('Data: ', data);
    //   //this.setState()

    // });

    axios.post('/repos', term)
      .then( (response) => {
          response.end();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log('Component Mount Sucessful!');
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

    axios.get('/api/steam')
      .then( (response) => {
        console.log('Steam ID Retreived: ', 
          response.steamId);
        this.setState({
          steamId: response.steamId
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // $.ajax({
    //   url: '/repos',
    //   type: 'GET',
    //   success: (data) => {
    //     console.log(data);
    //     this.setState({
    //       repos: data
    //     });
    //   },
    //   error: function(err) {
    //     console.log('ERROR ', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));