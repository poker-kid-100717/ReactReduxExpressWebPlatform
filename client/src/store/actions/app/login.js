import devlog from '../../../util/devlog';
import login from '../../services/app/login';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './constants';

export default (username, password) => dispatch => {

  const action = { type: LOGIN }

  const successAction = {
    type: LOGIN_SUCCESS,
  }

  const failAction = {
    type: LOGIN_FAIL,
    errorMessage: 'Error logging in, check credentials and try again',
  }

  dispatch(action);

  return new login(username, password)
    .then(response => {
      if (response.statusCode === 200) {
        dispatch({
          ...successAction,
          authUser: response.authUser,
          sessionToken: response.sessionToken,
          expiresAt: response.expiresAt,
        });
      } else {
        dispatch({
          ...failAction,
          errorMessage: response.userMessage,
        });
      }
      return response;
    })
    .catch(err => {
      devlog(err);
      dispatch(failAction);
      return err;
    });
  
}
