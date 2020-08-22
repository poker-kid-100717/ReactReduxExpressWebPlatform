import {
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from './constants';
import services from '../../services/app';

export default sessionToken => dispatch => {
  const action = { type: LOGOUT }
  const successAction = { type: LOGOUT_SUCCESS }
  const failAction = {
    type: LOGOUT_FAIL,
    errorMessage: 'Error, failed to logout.'
  }

  return new Promise(resolve => {
    dispatch(action);

    // Same here, this would be an api request
    services.logout(sessionToken)
      .then(res => {
        if (res.statusCode === 200) {
          dispatch({
            ...successAction,
          });
        } else {
          dispatch({
            ...failAction,
          });
        }
        resolve(res);
      })
      .catch(err => {
        dispatch({
          ...failAction,
        })
        resolve(err);
      });
  });
  
}
