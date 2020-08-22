export default (url, options) => {

  const api = _mode === 'development' ? `http://localhost:${_serverConfig.ports.dev}${url}` : url;

  const fetchOptions = {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options ? options : {},
    ...(
      options?.body
        ? typeof options.body === 'object' 
          ? { body: JSON.stringify(options.body) }
          : { body: options.body }
        : {}
    )
  }

  if (_mode === 'development') {
    fetchOptions.cors = 'no-cors';
  }

  return fetch(
    api,
    fetchOptions,
  )
    .then(res => res.json())
    .then(res => res)
    .catch(err => { throw err });
}