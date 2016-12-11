import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';

export default ({ handleSubmit }) => (
  <div style={styles.container}>
    <form type='submit' onSubmit={handleSubmit}>
      <TextField hintText={'Would you like a different welcome text?'} underlineShow={false} name={'textField'} autoComplete={'off'} />
    </form>
  </div>
);
