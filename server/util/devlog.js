module.exports = (msg) => {
  if (process.env.MODE === 'development') {
    console.log(msg);
  }
}