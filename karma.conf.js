module.exports = function(config) {
  config.set({
    autoWatch: false,
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,
    singleRun: true,

    browsers: ['Firefox'],

    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage/'
    },

    files: [
      'calendars.js',
      'node_modules/chai/chai.js',
      'node_modules/chai-as-promised/lib/chai-as-promised.js',
      'node_modules/mocha/mocha.js',
      'test/setup.js',
      'test/**/*.js'
    ],

    frameworks: ['mocha'],

    preprocessors: {
      'calendars.js': 'coverage'
    },

    reporters: [
      'coverage',
      'dots'
    ]
  });
};
