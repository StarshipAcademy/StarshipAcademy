import React, { Component } from 'react';
import styles from './styles';
import BasicSingleLineInput from '../BasicSingleLineInput';
import InitialLoading from '../InitialLoading';

export default class WelcomeDiv extends Component {
  render () {
    const { welcomeText, handleSubmit, isInitialized } = this.props;

    return (

      <div style={styles.test}>
      {
        isInitialized ?
        (<div>
          <h1> { welcomeText } </h1>
          <BasicSingleLineInput handleSubmit={handleSubmit} />
        </div>) :
        (<InitialLoading />)
      }
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
