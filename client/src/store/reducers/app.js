import config from '../../config';
import devlog from '../../util/devlog';
import * as Actions from '../actions/app/constants';

const defaultState = {
  errorMessage: null,
  authUser: null,
  isLoggingIn: false,
  isLoggingOut: false,
  loading: false,
  sessionToken: sessionStorage.getItem(config["storage-key"]) || '',
  expiresAt: 0,
}

export default (previousState = defaultState, action) => {
  devlog(action);
  switch(action.type) {
    case Actions.SHOW_ERROR:
      return {
        ...previousState,
        errorMessage: action.errorMessage,
      }
    case Actions.HIDE_ERROR:
      return {
        ...previousState,
        errorMessage: null,
      }
    case Actions.LOGIN:
      return {
        ...previousState,
        isLoggingIn: true,
        authUser: null,
      }
    case Actions.LOGIN_SUCCESS:
      return {
        ...previousState,
        isLoggingIn: false,
        authUser: action.authUser,
        expiresAt: action.expiresAt,
        sessionToken: action.sessionToken,
      }
    case Actions.LOGIN_FAIL:
      return {
        ...previousState,
        isLoggingIn: false,
        authUser: null,
        errorMessage: action.errorMessage,
      }
    case Actions.LOGOUT:
      return {
        ...previousState,
        isLoggingIn: false,
        isLoggingOut: true,
      }
    case Actions.LOGOUT_SUCCESS:
      return {
        ...previousState,
        isLoggingOut: false,
        authUser: null,
        session: '',
        expiresAt: 0,
      }
    case Actions.LOGOUT_FAIL:
      return {
        ...previousState,
        isLoggingOut: false,
        errorMessage: action.errorMessage,
      }
    case Actions.VERIFY_AUTHUSER:
      return {
        ...previousState,
        loading: true,
        authUser: {}
      }
    case Actions.VERIFY_AUTHUSER_SUCCESS:
      return {
        ...previousState,
        loading: false,
        authUser: action.authUser,
        expiresAt: action.expiresAt,
        sessionToken: action.sessionToken,
      }
    case Actions.VERIFY_AUTHUSER_FAIL:
      return {
        ...previousState,
        loading: false,
        authUser: {},
      }
    default:
      return previousState;
  }
};
