module.exports = authUser => {
  return {
    name: authUser.name,
    email: authUser.email,
  }
}