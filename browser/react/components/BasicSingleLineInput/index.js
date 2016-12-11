import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';

export default ({ handleChange }) => (
  <div style={styles.container}>
    <form>
      <TextField hintText={'Would you like a different welcome text?'} underlineShow={false} onChange={handleChange} />
    </form>
  </div>
);
