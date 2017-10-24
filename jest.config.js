module.exports = {
  coveragePathIgnorePatterns: ['./test/*', './src/js/EventEmitter'],
  setupFiles: ['./test/_setup.js', './test/_enzyme.setup.js'],
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
};
