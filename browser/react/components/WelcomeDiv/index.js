import React from 'react';
import styles from './styles';
import BasicSingleLineInput from '../BasicSingleLineInput';

export default ({ welcomeText, handleSubmit }) => (
  <div style={styles.test}>
    <h1> { welcomeText } </h1>
    <BasicSingleLineInput handleSubmit={handleSubmit} />
  </div>
);
