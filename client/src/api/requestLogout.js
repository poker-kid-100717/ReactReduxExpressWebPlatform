import request from './request';

export default sessionToken => request(_api.logout, { method: 'post', body: { sessionToken } });
