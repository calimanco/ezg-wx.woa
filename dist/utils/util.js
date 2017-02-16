/**
 * 点击悬浮图标展示新建列表的方法
 * @function showAddSheet
 * @param  {Object} permissions - 权限对象
 * @param  {boolean} permissions.os_add - 新建订单
 * @param  {boolean} permissions.customer_add - 新建客户
 * @param  {boolean} permissions.company_add - 新建企业
 * @param  {boolean} permissions.complain_add - 新建投诉
 * @return {void}
 */
function showAddSheet(permissions) {
  'use strict';
  let list = [];
  if (permissions.os_add) {
    list.push('新建订单');
  }
  if (permissions.customer_add) {
    list.push('新建客户');
  }
  if (permissions.company_add) {
    list.push('新建企业');
  }
  if (permissions.complain_add) {
    list.push('我要投诉');
  }
  if (list.length === 0) {
    list.push('无可用操作');
  }
  wx.showActionSheet({
    itemList: list,
    success: function(res) {
      if (!res.cancel) {
        switch (list[res.tapIndex]) {
          case '新建订单':
            wx.navigateTo({
              url: '../msg/msg?type=msg_default&title=提示&info=功能开发中...&mainButton=确定',
            });
            return;
          case '新建客户':
            wx.navigateTo({
              url: '../msg/msg?type=msg_default&title=提示&info=功能开发中...&mainButton=确定',
            });
            return;
          case '新建企业':
            wx.navigateTo({
              url: '../msg/msg?type=msg_default&title=提示&info=功能开发中...&mainButton=确定',
            });
            return;
          case '我要投诉':
            wx.navigateTo({
              url: '../msg/msg?type=msg_default&title=提示&info=功能开发中...&mainButton=确定',
            });
            return;
        }
      }
    },
  });
}

/**
 * 跳转到其他地址的方法，相当于window.location
 * 在触发事件的控件上添加data-href即可指向对应链接，如果没有设置则返回上一级
 * index，work，application为三个特殊值
 * @param  {Object} event - 点击事件对象
 * @return {void}
 */
function location(event) {
  'use strict';
  let href = event.target.dataset.href;
  if (!href) {
    wx.navigateBack();
    return;
  }
  switch (href) {
    case 'index':
      wx.switchTab({
        url: '/pages/index/index',
      });
      return;
    case 'work':
      wx.switchTab({
        url: '/pages/work/work',
      });
      return;
    case 'application':
      wx.switchTab({
        url: '/pages/application/application',
      });
      return;
    default:
      wx.redirectTo({
        url: href,
      });
      return;
  }
}

/**
 * 检查页面是否就绪的方法
 * @function checkReady
 * @param  {Object} option - 传入对象
 * @param  {Array} option.readyList - 被监听的数组，依据数组的长度判断是否完成
 * @param  {number} option.aim - 目标数量，即数组长度到达这个数量就会报告完成
 * @param  {boolean} [option.showLoading=true] - 是否展示导航条加载动画，默认是true
 * @param  {successCallback} option.success - 成功后回调
 * @param  {failCallback} option.success - 失败后回调
 * @return {void}
 */
function checkReady(option) {
  'use strict';
  // 默认值检查
  console.log('开始监听参数，目标量' + option.aim);
  option.readyList.length = 0;
  if (option.showLoading === undefined) {
    option.showLoading = true;
  }
  // 先判断一次是否已经满足条件
  if (option.readyList.length === option.aim) {
    if (typeof option.success == 'function') {
      return option.success();
    } else {
      return;
    }
  }
  // 设置定时器
  let clock = setInterval(check, 500);
  let count = 1;
  let lastLength = 0;
  if (option.showLoading) {
    wx.showNavigationBarLoading();
  }
  /**
   * 循环检查数组是否满足条件的函数
   * @return {void}
   */
  function check() {
    if (lastLength != option.readyList.length) {
      console.log('已报告完成的参数：');
      console.log(option.readyList);
      lastLength = option.readyList.length;
    }
    if (option.readyList.length === option.aim) {
      wx.hideNavigationBarLoading();
      clearInterval(clock);
      if (typeof option.success == 'function') {
        return option.success();
      } else {
        return;
      }
    }
    if (count == 120) {
      wx.hideNavigationBarLoading();
      clearInterval(clock);
      if (typeof option.fail == 'function') {
        showError('等待参数超时');
        return option.fail();
      } else {
        showError('等待参数超时');
        return;
      }
    }
    count++;
  }
}

/**
 * 失败处理函数，用来弹出提示框
 * @function showError
 * @param  {string} err - 错误信息
 * @param  {string} [title=失败提示] 提示框标题
 * @return {void}
 */
function showError(err, title) {
  'use strict';
  console.log(err);
  if (!title) {
    title = '失败提示';
  }
  wx.showModal({
    title: title,
    content: err,
    confirmText: '联系小肖',
    success: function(res) {
      if (res.confirm) {
        wx.makePhoneCall({
          phoneNumber: '18819349336',
        });
      }
    },
  });
}

module.exports = {
  showAddSheet: showAddSheet,
  location: location,
  checkReady: checkReady,
  showError: showError,
};

/**
 * 成功回调函数
 * @callback successCallback
 */
/**
 * 失败回调函数
 * @callback failCallback
 */
