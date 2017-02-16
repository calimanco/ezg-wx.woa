let connect = require('connect.js');
let reqData = connect.reqData;

// let test = require('test.js');
// let _reviewDynamics = test.reviewDynamics;
// let _debtDynamics = test.debtDynamics;
// let _woDynamics = test.woDynamics;
// let _osDetail = test.osDetail;
// let _woDetail = test.woDetail;
// let _productionList = test.productionList;
// let _productionDetail = test.productionDetail;
// let _customerList = test.customerList;
// let _customerDetail = test.customerDetail;
// let _companyList = test.companyList;
// let _companyDetail = test.companyDetail;
// let _sessionKey = test.sessionKey;

/**
 * 在woa上登录、获取sessionKey
 * @function toRegister
 * @param  {Object} option - 传入对象
 * @param  {string} option.code - 解密需要
 * @param  {string} option.encryptedData - 解密需要
 * @param  {string} option.iv - 解密需要
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function toRegister(option) {
  'use strict';
  let data = {
    m: 'toRegister',
    code: option.code,
    encryptedData: option.encryptedData,
    iv: option.iv,
  };
  // option.success(_sessionKey.data[0]);
  reqData(data, option.success, option.fail);
}

/**
 * 获取详细页(包含订单、工单、产品、企业、客户)
 * @function getDetail
 * @param  {Object} option - 传入对象
 * @param  {string} option.id - 订单、工单、产品、客户或企业的id
 * @param  {string} option.aim - 指定需要获取的类型，枚举值：os、wo、production、customer、company
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function getDetail(option) {
  'use strict';
  let data = {};
  switch (option.aim) {
    case 'os':
      // option.success(_osDetail.data[0]);
      data = {
        m: 'osDetail',
        storage: option.sessionKey,
        id: option.id,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'wo':
      // option.success(_woDetail.data[0]);
      data = {
        m: 'woDetail',
        storage: option.sessionKey,
        id: option.id,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'production':
      // option.success(_productionDetail.data);
      data = {
        m: 'getProductDetail',
        storage: option.sessionKey,
        id: option.id,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'customer':
      // option.success(_customerDetail.data);
      data = {
        m: 'getCustomerDetail',
        storage: option.sessionKey,
        id: option.id,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'company':
      // option.success(_companyDetail.data);
      data = {
        m: 'getCompanyDetail',
        storage: option.sessionKey,
        id: option.id,
      };
      reqData(data, option.success, option.fail);
      return;
    default:
      option.fail('无可运行方法');
      return;
  }
}

/**
 * 订单审批备注提交
 * @function postOSReviewRemark
 * @param  {Object} option - 传入对象
 * @param  {string} option.id - 订单、工单、产品、客户或企业的id
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {string} option.flag - 标记“同意”或”驳回”，枚举值：agree、overrule
 * @param  {string} option.remark - 备注内容字符串
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function postOSReviewRemark(option) {
  'use strict';
  // option.success();
  let data = {
    m: 'toAudit',
    storage: option.sessionKey,
    bussinessId: option.id,
    auditFlag: option.flag,
    auditMemo: option.remark,
  };
  reqData(data, option.success, option.fail);
}

/**
 * 工单流转备注提交
 * @function postWOProcessRemark
 * @param  {Object} option - 传入对象
 * @param  {string} option.id - 订单、工单、产品、客户或企业的id
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {string} option.remark - 备注内容字符串
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function postWOProcessRemark(option) {
  'use strict';
  // option.success();
  let data = {
    m: 'toNext',
    storage: option.sessionKey,
    id: option.id,
    auditMemo: option.remark,
  };
  reqData(data, option.success, option.fail);
}

/**
 * 使用微信号绑定woa帐号
 * @function bindAccount
 * @param  {Object} option - 传入对象
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {string} option.username - woa用户名
 * @param  {string} option.password - woa密码
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function bindAccount(option) {
  'use strict';
  // option.success();
  let data = {
    m: 'bindAccount',
    storage: option.sessionKey,
    account: option.username,
    pwd: option.password,
  };
  reqData(data, option.success, option.fail);
}

/**
 * 解绑woa帐号
 * @function unBindAccount
 * @param  {Object} option - 传入对象
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function unBindAccount(option) {
  'use strict';
  // option.success();
  let data = {
    m: 'unBindAccount',
    storage: option.sessionKey,
  };
  reqData(data, option.success, option.fail);
}

/**
 * 获取数据列表
 * @function getLists
 * @param  {Object} option - 传入对象
 * @param  {string} option.sessionKey - 验证用户身份的sessionKey
 * @param  {string} option.aim - 指定需要获取的类型，枚举值：approveDynamics、debtDynamics、woDynamics、production、customer、company、complain
 * @param  {number} [option.page] - 指定页码
 * @param  {number} [option.pageSize] - 指定每页数量
 * @param  {string} [option.searchKey] - 搜索关键词
 * @param  {function} option.success - 成功回调函数
 * @param  {function} option.fail - 失败回调函数
 * @return {void}
 */
function getLists(option) {
  'use strict';
  let sessionKey = option.sessionKey;
  let data = {};
  switch (option.aim) {
    case 'reviewDynamics':
      // option.success(_reviewDynamics.data);
      data = {
        m: 'approveDynamics',
        storage: sessionKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'debtDynamics':
      // option.success(_debtDynamics.data);
      data = {
        m: 'debtDynamics',
        storage: sessionKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'woDynamics':
      // option.success(_woDynamics.data);
      data = {
        m: 'woDynamics',
        storage: sessionKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'production':
      // if (option.page == 4) {
      //   option.success([]);
      // } else {
      //   option.success(_productionList.data);
      // }
      data = {
        m: 'getProductList',
        storage: sessionKey,
        page: option.page,
        pageSize: option.pageSize,
        searchKey: option.searchKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'customer':
      // if (option.page == 4) {
      //   option.success([]);
      // } else {
      //   option.success(_customerList.data);
      // }
      data = {
        m: 'getCustomerList',
        storage: sessionKey,
        page: option.page,
        pageSize: option.pageSize,
        searchKey: option.searchKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'company':
      // if (option.page == 4) {
      //   option.success([]);
      // } else {
      //   option.success(_companyList.data);
      // }
      data = {
        m: 'getCompanyList',
        storage: sessionKey,
        page: option.page,
        pageSize: option.pageSize,
        searchKey: option.searchKey,
      };
      reqData(data, option.success, option.fail);
      return;
    case 'complain':
      if (option.page == 4) {
        option.success([]);
      } else {
        option.success([{
          total: 0,
        }]);
      }
      // data = {
      //   m: "getComplainList",
      //   storage: sessionKey,
      //   page: option.page,
      //   pageSize: option.pageSize,
      //   searchKey: option.searchKey
      // };
      // reqData(data, option.success, option.fail);
      return;
    default:
      option.fail('无可运行方法');
      return;
  }
}

module.exports = {
  toRegister: toRegister,
  getDetail: getDetail,
  postOSReviewRemark: postOSReviewRemark,
  postWOProcessRemark: postWOProcessRemark,
  bindAccount: bindAccount,
  unBindAccount: unBindAccount,
  getLists: getLists,
};
