let api = require('utils/api.js');
let toRegister = api.toRegister;
let util = require('utils/util.js');
let showError = util.showError;

new App({
  globalData: {
    userInfo: null,
  },
  // 小程序启动
  onLaunch: function() {
    'use strict';
  },
  getSessionKey: function(cb) {
    'use strict';
    console.log('开始获取SessionKey');
    let that = this;
    if (this.globalData.sessionKey) {
      if (typeof cb == 'function') {
        cb(this.globalData.sessionKey);
      }
    } else {
      this.getUserInfo(

        function(_getUserInfo) {
          toRegister({
            code: that.globalData.code,
            encryptedData: that.globalData.encryptedData,
            iv: that.globalData.iv,
            success: function(_toRegister) {
              that.globalData.sessionKey = _toRegister[0].sessionKey;
              that.globalData.permissions = _toRegister[0].permissions;
              if (typeof cb == 'function') {
                cb(_toRegister[0].sessionKey);
              }
            },
            fail: function(err) {
              showError(err);
            },
          });
        });
    }
  },
  getUserInfo: function(cb) {
    'use strict';
    console.log('开始获取UserInfo');
    let that = this;
    if (this.globalData.userInfo) {
      if (typeof cb == 'function') {
        cb(this.globalData.userInfo);
      }
    } else {
      // 调用登录接口，获取code
      wx.login({
        success: function(_login) {
          that.globalData.code = _login.code;
          // 换取加密用户信息
          wx.getUserInfo({
            success: function(_getUserInfo) {
              that.globalData.userInfo = _getUserInfo.userInfo;
              that.globalData.encryptedData = _getUserInfo.encryptedData;
              that.globalData.iv = _getUserInfo.iv;
              if (typeof cb == 'function') {
                cb(_getUserInfo.userInfo);
              }
            },
            fail: function(err) {
              showError(err.errMsg);
            },
          });
        },
        fail: function(err) {
          showError(err.errMsg);
        },
      });
    }
  },
  resetApp: function() {
    'use strict';
    console.log('重置app');
    wx.clearStorage();
    this.globalData = {
      userInfo: null,
    };
  },
});
