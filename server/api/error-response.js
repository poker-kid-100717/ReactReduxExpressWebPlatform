module.exports = (res, statusCode, message, userMessage) => {
  res.statusCode = statusCode;
  res.send({
    statusCode,
    message,
    userMessage,
  });
}
