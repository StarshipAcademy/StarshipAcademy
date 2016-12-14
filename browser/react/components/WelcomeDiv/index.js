import React, { Component } from 'react';
import styles from './styles';
import BasicSingleLineInput from '../BasicSingleLineInput';

export default class WelcomeDiv extends Component {
  render () {
    const { welcomeText, handleSubmit } = this.props;

    return (
      <div style={styles.test}>
        <h1> { welcomeText } </h1>
        <BasicSingleLineInput handleSubmit={handleSubmit} />
      </div>
    );
  }
}

WelcomeDiv.defaultProps = {
  handleSubmit: () => {
    console.log('Still fetching dispatch from server...');
  }
};

WelcomeDiv.propTypes = {
  welcomeText: React.PropTypes.string,
  handleSubmit: React.PropTypes.func
};
