let util = require('../../utils/util.js');
let location = util.location;
let showError = util.showError;
let showAddSheet = util.showAddSheet;
let api = require('../../utils/api.js');
let unBindAccount = api.unBindAccount;

let app = getApp();

new Page({
  data: {
    userInfo: {},
    grids: [{
      title: '产品目录',
      url: '/pages/search/search?mode=production&aim=production',
      icon: '../../images/icon_production.png',
    }, {
      title: '客户管理',
      url: '/pages/search/search?mode=customer&aim=customer',
      icon: '../../images/icon_customer.png',
    }, {
      title: '企业管理',
      url: '/pages/search/search?mode=company&aim=company',
      icon: '../../images/icon_enterprise.png',
    }, {
      title: '投诉中心',
      url: '/pages/search/search?mode=complain&aim=complain',
      icon: '../../images/icon_complaint.png',
    }],
  },
  showActionSheet: function() {
    'use strict';
    app.getSessionKey(

      function() {
        showAddSheet(app.globalData.permissions);
      }
    );
  },
  location: location,
  onLoad: function() {
    'use strict';
    let that = this;
    app.getUserInfo(function(res) {
      that.setData({
        userInfo: res,
      });
    });
  },
  unBindAccount: function() {
    'use strict';
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      duration: 10000,
      mask: true,
    });
    console.log('解绑提交');
    app.getSessionKey(function(_getSessionKey) {
      unBindAccount({
        sessionKey: _getSessionKey,
        success: function() {
          wx.hideToast();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            mask: true,
          });
          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/login/login',
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
