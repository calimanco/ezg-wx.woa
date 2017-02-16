let api = require('../../utils/api.js');
let bindAccount = api.bindAccount;
let util = require('../../utils/util.js');
let showError = util.showError;

let app = getApp();

new Page({
  data: {
    username: '',
    password: '',
  },
  keyInput: function(event) {
    'use strict';
    switch (event.currentTarget.id) {
      case 'username':
        this.setData({
          username: event.detail.value,
        });
        return;
      case 'password':
        this.setData({
          password: event.detail.value,
        });
        return;
    }
  },
  bindAccount: function() {
    'use strict';
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 10000,
      mask: true,
    });
    console.log('绑定提交');
    if(this.data.username == 'test') {
      app.global.testMode = true;
    }
    let that = this;
    app.getSessionKey(function(_getSessionKey) {
      bindAccount({
        sessionKey: _getSessionKey,
        username: that.data.username,
        password: that.data.password,
        success: function() {
          wx.hideToast();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            mask: true,
          });
          setTimeout(function() {
            app.resetApp();
            wx.switchTab({
              url: '/pages/index/index',
            });
          }, 2000);
        },
        fail: function(err) {
          wx.hideToast();
          showError(err);
        },
      });
    });
  },
});
