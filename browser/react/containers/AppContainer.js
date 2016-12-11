import React, { Component } from 'react';
import WelcomeDiv from '../components/WelcomeDiv';
import styles from './styles';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className={styles.containerClasses.join(' ')}>
        <WelcomeDiv welcomeText={'Welcome to Meme Magic.'} />
      </div>
    );
  }
}
