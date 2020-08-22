import verifyAuthUser from '../../../api/verifyAuthUser';
import {
  VERIFY_AUTHUSER,
  VERIFY_AUTHUSER_FAIL,
  VERIFY_AUTHUSER_SUCCESS,
} from './constants';
import devlog from '../../../util/devlog';

export default sessionToken => dispatch => {
  const action = { type: VERIFY_AUTHUSER };
  const success = { type: VERIFY_AUTHUSER_SUCCESS };
  const fail = { type: VERIFY_AUTHUSER_FAIL };
  
  dispatch(action);

  return verifyAuthUser(sessionToken)
    .then(res => {
      if (res.statusCode === 200) {
        dispatch({
          ...success,
          authUser: res.authUser,
          sessionToken: res.sessionToken,
          expiresAt: res.expiresAt,
        });
      } else {
        dispatch(fail);
      }
      return res;
    })
    .catch(err => {
      devlog(err);
      dispatch(fail);
      return err;
    });

}
