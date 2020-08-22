const isValidApiHandlerConfiguration = (app, config) => {
  const { method, baseRoute, handler } = config
  return (
    method
    && baseRoute
    && typeof app[method] === 'function'
    && typeof handler === 'function'
  )
}

module.exports = {
  isValidApiHandlerConfiguration
}