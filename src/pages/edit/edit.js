let api = require('../../utils/api.js');
let postOSReviewRemark = api.postOSReviewRemark;
let postWOProcessRemark = api.postWOProcessRemark;
let util = require('../../utils/util.js');
let showError = util.showError;

let app = getApp();
new Page({
  data: {
    mode: {
      os: false,
      os_remark: false,
      os_debt: false,
      wo_process: false,
      production: false,
      customer: false,
      enterprise: false,
      complain: false,
      complain_reply: false,
    },
  },
  onLoad: function(option) {
    'use strict';
    // 设置模式
    let mode = this.data.mode;
    mode[option.mode] = true;
    // 读取额外数据
    let extra = option.extra;
    let id = option.id;
    this.setData({
      mode: mode,
      extra: extra,
      id: id,
    });
  },
  getText: function(event) {
    'use strict';
    this.setData({
      text: event.detail.value,
    });
  },
  postOSReviewRemark: function() {
    'use strict';
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 10000,
    });
    console.log('审批提交');
    let that = this;
    app.getSessionKey(function(_getSessionKey) {
      postOSReviewRemark({
        id: that.data.id,
        sessionKey: _getSessionKey,
        flag: that.data.extra,
        remark: that.data.text,
        success: function() {
          wx.hideToast();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 2,
            });
          }, 2000);
        },
        fail: function(err) {
          showError(err);
        },
      });
    });
  },
  postWOProcessRemark: function() {
    'use strict';
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 10000,
    });
    console.log('流转提交');
    let that = this;
    app.getSessionKey(function(_getSessionKey) {
      postWOProcessRemark({
        id: that.data.id,
        sessionKey: _getSessionKey,
        flag: that.data.extra,
        remark: that.data.text,
        success: function() {
          wx.hideToast();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 2,
            });
          }, 2000);
        },
        fail: function(err) {
          showError(err);
        },
      });
    });
  },
});
