import WelcomeDiv from '../components/WelcomeDiv';
import { connect } from 'react-redux';
import { changeWelcomeText } from '../../redux/action-creators';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  handleChange: (evt) => {
    evt.preventDefault();
    dispatch(changeWelcomeText(evt.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDiv);
