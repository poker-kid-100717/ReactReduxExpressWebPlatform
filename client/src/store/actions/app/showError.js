import { SHOW_ERROR } from './constants';

export default errorMessage => dispatch => dispatch({
  type: SHOW_ERROR,
  errorMessage,
});
