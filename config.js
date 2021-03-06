var env = require('./environment.js');
var os;

exports.config = {
  framework: env.framework,
  specs: [
    'test/user/createUser.js',
    'test/user/editUser.js',
    'test/user/removeUser.js',
    'test/about/about.js',
    'test/language/en.js',
    'test/language/zh-TW.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu14.04'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu14.04'
  },
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'windows7'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'windows7'
  },
  //{
  //  browserName: 'internet explorer', //IE10
  //  seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
  //  os: 'windows7'
  //},
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
    os: 'windows8'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
    os: 'windows8'
  },
  //{
  //  browserName: 'internet explorer', //IE11
  //  seleniumAddress: 'http://10.26.1.55:4444/wd/hub',
  //  os: 'windows8'
  //},
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
    os: 'windows10'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
    os: 'windows10'
  },
  //{
  //  browserName: 'internet explorer', //IE11
  //  seleniumAddress: 'http://10.26.1.56:4444/wd/hub',
  //  os: 'windows10'
  //},
  {
    browserName: 'safari',
    seleniumAddress: 'http://10.21.20.202:4444/wd/hub',
    os: 'mac'
  },
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.21.20.202:4444/wd/hub',
    os: 'mac'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.21.20.202:4444/wd/hub',
    os: 'mac'
  }],
  onPrepare:function(){
    var jasmineReporters = require('jasmine-reporters');
    return browser.getProcessedConfig().then(function(config) {
      var browserName = config.capabilities.browserName;
      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: 'e2e-reports',
        filePrefix: config.capabilities.os + '-' + browserName + '-xmloutput-',
        modifySuiteName: function(generatedSuitName, suite) {
          return browserName + '.' + generatedSuitName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);
    });
  }
}
