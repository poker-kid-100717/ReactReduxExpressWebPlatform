import request from './request';

export default (sessionToken) => {
  return request(`${_api.verifyAuthUser}?sessionToken=${sessionToken}`)
    .then(res => res)
    .catch(err => { throw err });
}