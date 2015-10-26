exports.config = {
  framework: 'jasmine',
  specs: [
    'test/e2e/**/*.spec.js'
  ],
  onPrepare: function() {
    process.env.PORT = 3001;
    require('./server');
  }
};
