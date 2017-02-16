/**
 * 统一发送请求封装
 * @param {Object} data - 准备发送的数据
 * @param {function} success - 成功回调函数
 * @param {failCallback} fail - 失败回调
 * @return {void}
 */
function reqData(data, success, fail) {
  'use strict';
  let url = 'https://woa.zgcfo.com/api';
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  wx.request({
    url: url,
    method: 'POST',
    header: header,
    data: data,
    success: function(res) {
      let resData = res.data;
      console.log(res);
      resCheck(resData, success, fail);
    },
    fail: function(err) {
      fail(err.errMsg);
    },
  });
}

/**
 * 统一处理接收到的数据，依据flag进行初步处理
 * @param  {Object} resData 接收到的数据
 * @param  {successCallback} success 成功回调函数
 * @param  {failCallback} fail 失败回调
 * @return {void}
 */
function resCheck(resData, success, fail) {
  'use strict';
  console.log('接受到woa信息');
  let info = '';
  resData.flag = resData.flag.toString();
  switch (resData.flag) {
    case '0':
      info = '服务器内部错误';
      if (typeof fail == 'function') {
        fail(resData.msg, info);
      } else {
        console.log('失败回调不是函数');
      }
      return;
    case '1':
      info = '成功';
      if (typeof success == 'function') {
        if (resData.data === undefined) {
          success();
        } else {
          success(resData.data);
        }
      } else {
        console.log('成功回调不是函数');
      }
      return;
    case '-1':
      info = '没权限';
      if (typeof fail == 'function') {
        fail(info);
      } else {
        console.log('失败回调不是函数');
      }
      return;
    case '-2':
      info = '微信号未绑定WOA账号';
      if (typeof success == 'function') {
        if (resData.data === undefined) {
          success();
        } else {
          success(resData.data);
        }
      } else {
        console.log('成功回调不是函数');
      }
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    case '-3':
      info = 'WOA账号已被绑定';
      if (typeof fail == 'function') {
        fail(info);
      } else {
        console.log('失败回调不是函数');
      }
      return;
    case '-4':
      info = 'WOA密码不对';
      if (typeof fail == 'function') {
        fail(info);
      } else {
        console.log('失败回调不是函数');
      }
      return;
  }
}

module.exports = {
  reqData: reqData,
  resCheck: resCheck,
};

/**
 * 成功回调函数
 * @callback successCallback
 * @param {Object} res - 获取到的数据
 */
/**
 * 失败回调函数
 * @callback failCallback
 * @param {string} err - 错误信息
 */
