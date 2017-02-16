let util = require('../../utils/util.js');
let showAddSheet = util.showAddSheet;
let checkReady = util.checkReady;
let showError = util.showError;
let api = require('../../utils/api.js');
let getLists = api.getLists;
let app = getApp();

new Page({
  data: {
    mode: {
      os: false,
      wo: false,
      company: false,
      production: false,
      customer: false,
      complain: false,
    },
    ready: [],
    listData: [],
    page: 1,
    aim: '',
    pageEnd: false,
  },
  onLoad: function(option) {
    'use strict';
    // 设置模式
    let mode = this.data.mode;
    mode[option.mode] = true;
    // 读取目标数据
    let aim = option.aim;
    let that = this;
    wx.getStorage({
      key: aim,
      success: function(res) {
        that.setData({
          listData: res.data,
        });
        that.data.pageEnd = true;
      },
      fail: function(res) {
        app.getSessionKey(that.getList);
      },
    });
    this.setData({
      aim: aim,
      mode: mode,
    });
  },
  showActionSheet: function() {
    'use strict';
    app.getSessionKey(

      function() {
        showAddSheet(app.globalData.permissions);
      }
    );
  },
  onPullDownRefresh: function() {
    'use strict';
    this.data.page = 1;
    this.data.pageEnd = false;
    app.getSessionKey(this.getList);
  },
  onReachBottom: function() {
    'use strict';
    if (this.data.aim == 'approveDynamics' || this.data.aim == 'debtDynamics' || this.data.aim == 'woDynamics') {

    } else {
      if (!this.data.pageEnd) {
        app.getSessionKey(this.getList);
      }
    }
  },
  // 获取列表
  getList: function(_getSessionKey) {
    'use strict';
    checkReady({
      readyList: this.data.ready,
      aim: 1,
      success: function() {
        wx.stopPullDownRefresh();
      },
      fail: function() {
        wx.stopPullDownRefresh();
      },
    });
    let aim = this.data.aim;
    let page = this.data.page;
    let pageEnd = this.data.pageEnd;
    let that = this;
    getLists({
      aim: aim,
      sessionKey: _getSessionKey,
      page: page,
      success: function(_getLists) {
        that.data.ready.push(aim);
        let listData = _getLists;
        that.setData({
          listData: listData,
          page: page,
          pageEnd: pageEnd,
        });
        wx.setStorage({
          key: aim,
          data: listData,
        });
      },
      fail: function(err) {
        that.data.ready.push(aim);
        showError(err);
      },
    });
  },
});
