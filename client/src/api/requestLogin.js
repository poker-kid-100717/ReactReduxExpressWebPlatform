import request from './request';
const api = _api;

export default (username, password) => {
  return request(api.login, {
    method: 'post',
    body: {
      username,
      password,
    }
  })
    .then(res => res)
    .catch(err => { throw err });
}
