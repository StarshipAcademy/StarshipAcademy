import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';

export default class BasicSingleLineInput extends Component {
  render () {
    const { handleSubmit } = this.props;

    return (
      <div style={styles.container}>
        <form type='submit' onSubmit={handleSubmit}>
          <TextField hintText={'Would you like a different welcome text?'} underlineShow={false} name={'textField'} autoComplete={'off'} />
        </form>
      </div>
    );
  }
}

BasicSingleLineInput.defaultProps = {
  handleSubmit: () => {
    console.log('Still fetching dispatch from server...');
  }
};

BasicSingleLineInput.propTypes = {
  handleSubmit: React.PropTypes.func
};
