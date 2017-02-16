let utils = require('../../utils/util.js');
let app = getApp();
new Page({
  data: {
    list: [],
    inputVal: '',
  },
  showActionSheet: function() {
    'use strict';
    app.getSessionKey(

      function() {
        utils.showAddSheet(app.globalData.permissions);
      }
    );
  },
  clearInput: function() {
    'use strict';
    this.setData({
      inputVal: '',
    });
  },
  inputTyping: function(e) {
    'use strict';
    this.setData({
      inputVal: e.detail.value,
    });
  },
  searchSubmit: function(e) {
    'use strict';
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000,
    });
    setTimeout(function() {
      wx.hideToast();
    }, 2000);
  },
});
