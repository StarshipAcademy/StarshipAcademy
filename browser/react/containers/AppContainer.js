import React, { Component } from 'react';

export default class AppContainer extends Component {
  
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={{ marginTop: 5 + 'em', textAlign: 'center'}}>
        <h1> Welcome to Meme Magic. </h1>
      </div>
    );
  }

}