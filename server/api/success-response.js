module.exports = (res, content) => {
  res.statusCode = 200;
  res.send({
    statusCode: 200,
    ...content
  });
}