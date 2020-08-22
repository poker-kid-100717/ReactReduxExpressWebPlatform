import requestLogin from '../../../api/requestLogin';

export default (username, password) => requestLogin(username, password)
  .then(res => res)
  .catch(err => { throw err });
