import request from './request';

export default email => request(_api.forgotPasswordEmail, { method: 'POST', body: { email } });
