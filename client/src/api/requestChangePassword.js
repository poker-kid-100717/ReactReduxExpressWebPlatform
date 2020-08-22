import request from './request';

export default (resetToken, password) => request(_api.resetPassword, { method: 'post', body: { resetToken, password } });
