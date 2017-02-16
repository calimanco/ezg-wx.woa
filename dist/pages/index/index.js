let app = getApp();
let api = require('../../utils/api.js');
let getLists = api.getLists;
let util = require('../../utils/util.js');
let showAddSheet = util.showAddSheet;
let checkReady = util.checkReady;
let showError = util.showError;

new Page({
  data: {
    ready: [],
  },
  onLoad: function() {
    'use strict';
    this.readme();
    app.getSessionKey(this.getDynamic);
  },
  onPullDownRefresh: function() {
    'use strict';
    app.getSessionKey(this.getDynamic);
  },
  showActionSheet: function() {
    'use strict';
    app.getSessionKey(

      function() {
        showAddSheet(app.globalData.permissions);
      }
    );
  },
  // 获取动态列表
  getDynamic: function(_getSessionKey) {
    'use strict';
    checkReady({
      readyList: this.data.ready,
      aim: 3,
      success: function() {
        wx.stopPullDownRefresh();
      },
      fail: function() {
        wx.stopPullDownRefresh();
      },
    });
    let that = this;
    if (app.globalData.permissions.approveDynamics) {
      getLists({
        aim: 'reviewDynamics',
        sessionKey: _getSessionKey,
        success: function(_getDynamics) {
          that.data.ready.push('reviewDynamics');
          wx.setStorage({
            key: 'reviewDynamics',
            data: _getDynamics,
          });
          that.setData({
            approveDynamics: _getDynamics,
          });
        },
        fail: function(err) {
          that.data.ready.push('reviewDynamics');
          showError(err);
        },
      });
    } else {
      that.data.ready.push('reviewDynamics');
    }
    if (app.globalData.permissions.debtDynamics) {
      getLists({
        aim: 'debtDynamics',
        sessionKey: _getSessionKey,
        success: function(_getDynamics) {
          that.data.ready.push('debtDynamics');
          wx.setStorage({
            key: 'debtDynamics',
            data: _getDynamics,
          });
          that.setData({
            debtDynamics: _getDynamics,
          });
        },
        fail: function(err) {
          that.data.ready.push('debtDynamics');
          showError(err);
        },
      });
    } else {
      that.data.ready.push('debtDynamics');
    }
    if (app.globalData.permissions.woDynamics) {
      getLists({
        aim: 'woDynamics',
        sessionKey: _getSessionKey,
        success: function(_getDynamics) {
          that.data.ready.push('woDynamics');
          wx.setStorage({
            key: 'woDynamics',
            data: _getDynamics,
          });
          that.setData({
            woDynamics: _getDynamics,
          });
        },
        fail: function(err) {
          that.data.ready.push('woDynamics');
          showError(err);
        },
      });
    } else {
      that.data.ready.push('woDynamics');
    }
  },
  readme: function() {
    'use strict';
    console.log('首次打开提示');
    /**
     * 展示开场白
     * @return {void}
     */
    function showFirst() {
      wx.showModal({
        title: '开场白',
        content: '欢迎使用WOA小程序版，暂时只提供审批和流转的功能，遇到问题请联系肖经理，版本号：WXOA201601.03.1.01',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.setStorage({
              key: 'firstTime',
              data: 'WXOA201601.03.1.01',
            });
          }
        },
      });
    }
    wx.getStorage({
      key: 'firstTime',
      success: function(res) {
        if (res.data != 'WXOA201601.03.1.01') {
          showFirst();
        }
      },
      fail: function() {
        showFirst();
      },
    });
  },
});
