// Karma configuration
// Generated on Mon Mar 21 2016 09:27:12 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    plugins: ['karma-mocha','karma-requirejs','karma-chai','karma-jquery',
              'karma-coverage','karma-phantomjs2-launcher', 'karma-sinon'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs','chai','jquery-1.9.1', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'test/scripts/test-main-karma.js',
      {pattern: 'app/scripts/**/*.js', included: false},
      {pattern: 'test/scripts/*test.js', included: false}
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/scripts/**/*.js': ['coverage']
    },

	// optionally, configure the reporter
	coverageReporter: {
		type : 'html',
		dir : 'coverage/'
	},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'IE_no_addons','Firefox'],
    browsers: ['PhantomJS2'],
	customLaunchers: {
    IE_no_addons: {
      base:  'IE',
      flags: ['-extoff']
    }
  },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
