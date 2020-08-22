import request from './request';

export default sessionToken => request(`${_api.receipts}?sessionToken=${sessionToken}`);
