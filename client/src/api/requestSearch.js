import request from './request';

export default sessionToken => request(`${_api.search}?sessionToken=${sessionToken}`);
