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
    inputVal: '',
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
          pageEnd: true,
        });
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
  onReachBottom: function() {
    'use strict';
    if(this.data.aim=='approveDynamics'||this.data.aim=='debtDynamics'||this.data.aim=='woDynamics') {

    }else{
      if(!this.data.pageEnd) {
        app.getSessionKey(this.startSearch);
      }
    }
  },
  inputTyping: function(event) {
    'use strict';
    this.setData({
      inputVal: event.detail.value,
    });
  },
  searchSubmit: function(e) {
    'use strict';
    this.data.page = 1;
    this.data.pageEnd = false;
    app.getSessionKey(this.startSearch);
  },
  clearInput: function() {
    'use strict';
    this.setData({
      inputVal: '',
    });
  },
  // 获取列表
  startSearch: function(_getSessionKey) {
    'use strict';
    checkReady({
      readyList: this.data.ready,
      aim: 1,
    });
    let aim = this.data.aim;
    let page = this.data.page;
    let pageEnd = this.data.pageEnd;
    let searchKey = this.data.inputVal;
    let that = this;
    getLists({
      aim: aim,
      sessionKey: _getSessionKey,
      page: page,
      searchKey: searchKey,
      pageSize: 15,
      success: function(_getLists) {
        that.data.ready.push(aim);
        let total = _getLists[0].total;
        let listData = that.data.listData;
        if (total !== 0) {
          if(_getLists.length!==1) {
            if (page === 1) {
              listData = _getLists.slice(1);
            } else {
              listData = listData.concat(_getLists.slice(1));
            }
            page++;
          }else{
            pageEnd = true;
          }
        } else {
          listData = [];
          pageEnd = true;
        }
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
