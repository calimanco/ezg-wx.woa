let api = require('../../utils/api.js');
let getDetail = api.getDetail;
let util = require('../../utils/util.js');
let checkReady = util.checkReady;
let showError = util.showError;

let app = getApp();
new Page({
  data: {
    fixClass: false,
    mode: {
      os: false,
      wo: false,
      company: false,
      production: false,
      customer: false,
      complain: false,
    },
    permissions: {
      os_remark: false,
      os_alter: false,
      os_debt: false,
      wo_process: false,
    },
    detailData: {},
    detailReady: [],
  },
  onLoad: function(option) {
    'use strict';
    // 设置模式
    let mode = this.data.mode;
    mode[option.mode] = true;
    let id = option.id;
    let aim = option.mode;
    this.setData({
      mode: mode,
      id: id,
      aim: aim,
    });
  },
  onShow: function() {
    'use strict';
    let that = this;
    this.checkPermissions();
    checkReady({
      readyList: this.data.detailReady,
      aim: 1,
    });
    // 读取目标数据
    app.getSessionKey(function(_getSessionKey) {
      getDetail({
        id: that.data.id,
        aim: that.data.aim,
        sessionKey: _getSessionKey,
        success: function(_getDetail) {
          that.data.detailReady.push('detailData');
          that.checkPermissions(_getDetail[0].permissions);
          that.setData({
            detailData: _getDetail[0],
          });
        },
        fail: function(err) {
          that.data.detailReady.push('detailData');
          showError(err);
        },
      });
    });
  },
  toggle: function(event) {
    'use strict';
    let id = event.currentTarget.id;
    let aim = event.currentTarget.dataset.aim;
    let aimList = aim.split('.');
    let data = this.data;
    let i = 0;
    for(let f=0; f<aimList.length; f++) {
      data = data[aimList[f]];
    }
    if(aim=='detailData.productionList') {
      for (i = 0; i < data.length; i++) {
        if (data[i] == data[id]) {
          data[i].isOpen = !data[i].isOpen;
        } else {
          data[i].isOpen = false;
        }
      }
      this.setData({
        'detailData.productionList': data,
      });
    }
    if(aim=='detailData.processList') {
      for (i = 0; i < data.length; i++) {
        if (data[i] == data[id]) {
          data[i].isOpen = !data[i].isOpen;
        } else {
          data[i].isOpen = false;
        }
      }
      this.setData({
        'detailData.processList': data,
      });
    }
    if(aim=='detailData.remarkList') {
      for (i = 0; i < data.length; i++) {
        if (data[i] == data[id]) {
          data[i].isOpen = !data[i].isOpen;
        } else {
          data[i].isOpen = false;
        }
      }
      this.setData({
        'detailData.remarkList': data,
      });
    }
  },
  checkPermissions: function(_getDetail) {
    'use strict';
    console.log('检查权限');
    let permissions = {
      os_remark: false,
      os_alter: false,
      os_debt: false,
      wo_process: false,
    };
    let fixClass = false;
    if (_getDetail) {
      fixClass = true;
      permissions[_getDetail] = true;
    }
    this.setData({
      permissions: permissions,
      fixClass: fixClass,
    });
  },
  goEdit: function(event) {
    'use strict';
    let aim = event.currentTarget.dataset.aim;
    let id = this.data.id;
    switch (aim) {
      case 'os_remark':
        let extra = event.currentTarget.dataset.extra;
        wx.navigateTo({
          url: '/pages/edit/edit?mode=os_remark&extra=' + extra + '&id=' + id,
        });
        return;
      case 'wo_process':
        wx.navigateTo({
          url: '/pages/edit/edit?mode=wo_process&extra=' + extra + '&id=' + id,
        });
        return;
    }
  },
});
