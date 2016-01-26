var env = require('../../environment.js');
var useBrowser = "";
var os = "";

describe('Edit User',function() {
	var name, phone, address;
	var userPageBtn = element(by.css('[href="/user"]'));
	var editBtn = element.all(by.buttonText('Edit'));
	var userNameInput = element(by.model('edit.user.name'));
	var userPhoneInput = element(by.model('edit.user.phone'));
	var userAddressInput = element(by.model('edit.user.address'));
	var editUserBtn = element(by.css('[ng-click="edit.edit()"]'));
	var userNameList = element.all(by.repeater('user in list.users').column('user.name'));
	var userPhoneList = element.all(by.repeater('user in list.users').column('user.phone'));
	var userAddressList = element.all(by.repeater('user in list.users').column('user.address'));
	var userPage = element(by.css('[class="md-headline ng-binding ng-scope"]'));

	function wait(s) {
		browser.sleep(1000 * s);
	}

	function goToUserPage() {
		userPageBtn.click();
	}

	beforeEach(function() {
		browser.get(env.web);
		browser.getProcessedConfig().then(function(config) {
			os = config.capabilities.os
			browser.getCapabilities().then(function (cap) {
				useBrowser = cap.caps_.browserName;
				switch(cap.caps_.browserName){
					case 'chrome':
						name = '更新-' + os + '-' + env.params.chrome.user;
						phone = '更新-' + os + '-' + env.params.chrome.phone;
						address = '更新-' + os + '-' + env.params.chrome.address;
					break;
					case 'firefox':
						name = '更新-' + os + '-' + env.params.firefox.user;
						phone = '更新-' + os + '-' + env.params.firefox.phone;
						address = '更新-' + os + '-' + env.params.firefox.address;
					break;
					case 'windows':
						name = '更新-' + os + '-' + env.params.windows.user;
						phone = '更新-' + os + '-' + env.params.windows.phone;
						address = '更新-' + os + '-' + env.params.windows.address;
					break;
				}
			});
		});
	});

	it('Edit User',function() {
		wait(2);
		goToUserPage();
		userNameList.getText().then(function(result) {
			for(var i = 0; i < result.length; i++){
				if(result[i] == os + '-' + useBrowser + "-user") {
					editBtn.get(i).click();
					userNameInput.clear();
					userNameInput.sendKeys(name);
					userPhoneInput.clear();
					userPhoneInput.sendKeys(phone);
					userAddressInput.clear();
					userAddressInput.sendKeys(address);
					editUserBtn.click();
				}
			}
		});
	});

	it('check user page',function() {
		goToUserPage();
		userPage.getText().then(function(result) {
			expect(result).toBe('User');
		});
	});
	
	it('check name', function() {
		goToUserPage();
		userNameList.getText().then(function(result) {
			expect(result).toContain(name);
		});
	});

	it('check phone', function() {
		goToUserPage();
		userPhoneList.getText().then(function(result) {
			expect(result).toContain('Phone: ' + phone);
		});
	});

	it('check address', function() {
		goToUserPage();
		userAddressList.getText().then(function(result) {
			expect(result).toContain('Address: ' + address);
		});
	});
});