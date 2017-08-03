import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
    this.search.bind(this);

  }

  search (term) {
    console.log('Search initiated; Term: ', term);
    //When a user has entered an input
    //Generate a post to the Server (Server will GET from Github)
    $.post('/repos', term, function(data){
      console.log('Sucessful POST to Server');
      console.log('This POST req is the GET req to Github');
      console.log('Data: ', data);

      //What kind of data comes back? Array or Object?

      //Update the Repos State
      // this.setState()

    });

    //We need to post fom the front end to the back and
    //with that route and call the save()
  }

  componentDidMount() {

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