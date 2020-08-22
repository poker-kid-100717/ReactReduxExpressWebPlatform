export default authUser => {
  if (authUser) {
    const keys = Object.keys(authUser);
    const now = new Date().getTime();
    const expireTime = authUser?.expireAt ? new Date(authUser.expireAt).getTime() : 0;
  
    return (
      keys.includes('email')
      && authUser?.name?.first
      && authUser?.name?.last
      && authUser?.expireAt
      && now < expireTime
    );
  }

  return false;
}