import React from 'react';

class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steamNickname: ''
    }
    console.log('PROPS', props);
  }

  onChange (e) {
    this.setState({
      steamNickname: e.target.value
    });
  }

  search() {
    console.log('Nav Search', this.state.steamNickname);
    this.props.onNavSearch(this.state.steamNickname);
  }

  render() {
    return (
      <div>
        <input value={this.state.steamNickname} onChange={this.onChange.bind(this)}/>
        <button onClick={this.search.bind(this)}>Search</button>
      </div>
    ) 
  }
}

export default NavSearch;