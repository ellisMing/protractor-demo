var env = require('../../environment.js');

describe('zh-TW version',function() {
  var languageSelect = element(by.id('select_value_label_0'));
  var twOption = element(by.css('[value="tw"]'));
  var naviTitle = element(by.css('[class="ng-binding"]'));
  var title = element(by.css('[class="md-headline ng-binding"]'));

  function wait(s) {
    browser.sleep(1000 * s);
  }

  beforeEach(function() {
    browser.get(env.web);
  });

  it('i18n zh-TW',function() {
    wait(2);
    languageSelect.click();
    twOption.click();
    naviTitle.getText().then(function(result) {
      expect(result).toBe('範例應用程式');
    });
    title.getText().then(function(result) {
      expect(result).toBe('首頁');
    });
  });
});
