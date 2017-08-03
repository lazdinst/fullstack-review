import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Search from './components/Search.jsx';
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
      steamId: ''
    };
    this.search.bind(this);
  }

  search (term) {
    console.log('Search initiated; Username: ', term);
    axios.post('/repos', term)
      .then( (res) => {
        console.log('I AM NOW HERERE DUDE');
        this.update();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  update() {
    console.log('I got to UPDATE')
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

  componentDidMount() {
    console.log('Component Mount Sucessful!');
    this.update();

    // axios.get('/api/steam')
    //   .then( (response) => {
    //     console.log('Steam ID Retreived: ', 
    //       response.steamId);
    //     this.setState({
    //       steamId: response.steamId
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  render () {
    return (<div>
      <Navbar />
      <div className="section group">
        <div className="col span_1_of_3">
          <Search onSearch={this.search.bind(this)}/>
        </div>
        <div className="col span_2_of_3">
          <RepoList repos={this.state.repos}/>
        </div>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));