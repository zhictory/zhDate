module.exports = function log(...args) {
  if (NODE_ENV === 'development' && console && console.log) {
    console.log.apply(console, args);
  }
}