const mode = _mode;

export default content => {
  if (mode === 'development') {
    console.log(content);
  }
}
