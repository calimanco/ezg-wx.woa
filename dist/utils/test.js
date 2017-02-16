// 约定权限permissions，会在数据结构中出现，不同接口需要的不同
// 指定现在用户可新建的操作，暂定下面几个操作，后面可能增加
// os_add为订单新建
// customer_add为客户新建
// enterprise_add为企业新建
// complain_add为投诉新建
// approveDynamics为审批动态
// debtDynamics为余款动态
// woDynamics为工单动态

// os_remark为订单审批
// os_alter为订单编辑
// os_debt为订单补款
// wo_process为流转

// flag为状态码：
// 0 ： 内部错误
// 1  : 成功
// -1 : 没权限
// -2 : 小程序未绑定WOA账号
// -3 : WOA账号已被绑定
// -4 : WOA密码不对

// msg为错误信息
// 当flag标记错误时，会将msg里的信息弹框报告

// data为数据数组
// 结构见下面，及时没有数据也要有这个字段

// 绑定账号接口
// https://woa.zgcfo.com/api
// m=bindAccount
// storage=
// account=
// pwd=
// 返回值见状态码

// 解绑账号接口
// https://woa.zgcfo.com/api
// m=unBindAccount
// storage=
// 返回值见状态码

// 单据审批接口
// https://woa.zgcfo.com/api
// m=toAudit
// storage=
// bussinessId=
// auditFlag=agree/overrule
// auditMemo=
// 返回值见状态码

// 工单流转接口
// https://woa.zgcfo.com/api
// m=toNext
// storage=
// id=
// auditMemo=
// 返回值见状态码

// 注册接口
// https://woa.zgcfo.com/api
// m=toRegister
// code=
// encryptedData=
// iv=
// 返回值见状态码

// 审批动态接口
// https://woa.zgcfo.com/api
// m=approveDynamics
// storage=

// 余款动态接口
// https://woa.zgcfo.com/api
// m=debtDynamics
// storage=

// 工单动态接口
// https://woa.zgcfo.com/api
// m=woDynamics
// storage=

// 订单明细接口
// https://woa.zgcfo.com/api
// m=osDetail
// storage=
// id=

// 工单明细接口
// https://woa.zgcfo.com/api
// m=woDetail
// storage=
// id=

// 产品列表接口
// https://woa.zgcfo.com/api
// m=productionList
// storage=
// page=
// pageSize=
// searchKey=

// 产品详细接口
// https://woa.zgcfo.com/api
// m=productionDetail
// storage=
// id=

// 客户列表接口
// https://woa.zgcfo.com/api
// m=customerList
// storage=
// page=
// pageSize=
// searchKey=

// 客户详细接口
// https://woa.zgcfo.com/api
// m=customerDetail
// storage=
// id=

// 企业列表接口
// https://woa.zgcfo.com/api
// m=companyList
// storage=
// page=
// pageSize=
// searchKey=

// 企业详细接口
// https://woa.zgcfo.com/api
// m=companyDetail
// storage=
// id=

// 注册接口数据结构
let sessionKey = {
  flag: 1,
  msg: '123',
  data: [{
    sessionKey: '123456',
    permissions: {
      os_add: true,
      customer_add: true,
      enterprise_add: true,
      complain_add: true,
      approveDynamics: true,
      debtDynamics: true,
      woDynamics: true,
    },
  }],
};

// 审批动态接口数据结构
let approveDynamics = {
  flag: 1,
  msg: '123',
  data: [{
    companyName: '广州纯之萃文化传播有限公司',
    osId: '8aad341558f36b430158fb4a400702bd',
    osCode: 'os20161214001',
    payNumber: 100.00,
    realNumber: 0.00,
    nowProcess: '待财务部审批',
    createDate: '2016-12-14',
  }, {
    companyName: '广州纯之萃文化传播有限公司',
    osId: '8aad341558f36b430158fb4a400702bd',
    osCode: 'os20161214001',
    payNumber: 100.00,
    realNumber: 0.00,
    nowProcess: '待财务部审批',
    createDate: '2016-12-14',
  }],
};

// 余款动态接口数据结构
let debtDynamics = {
  flag: 1,
  data: [{
    companyName: '广州纯之萃文化传播有限公司',
    osId: '8aad341558f36b430158fb4a400702bd',
    osCode: 'os20161214001',
    payNumber: 0.00,
    realNumber: 0.00,
    nowProcess: '待财务部审批',
    createDate: '2016-12-14',
  }],
};

// 工单动态接口数据结构
let woDynamics = {
  flag: 1,
  msg: '123',
  data: [{
    companyName: '广州纯之萃文化传播有限公司',
    woId: '9aad341558f36b430158fb4a400702bd',
    osCode: 'wo20161214001',
    productionName: '内资公司注册',
    staff: '小台',
    nowProcess: '暂停服务',
    createDate: '2016-12-14',
  }, {
    companyName: '广州纯之萃文化传播有限公司',
    woId: '9aad341558f36b430158fb4a400702bd',
    osCode: 'wo20161214001',
    productionName: '内资公司注册',
    staff: '小台',
    nowProcess: '暂停服务',
    createDate: '2016-12-14',
  }],
};

// 订单明细接口数据结构
let osDetail = {
  flag: 1,
  msg: '123',
  data: [{
    osId: '8aad341558f36b430158fb4a400702bd',
    osCode: 'xyp20161205001',
    companyName: '广州亿账柜信息科技有限公司',
    payNumber: 1056,
    realNumber: 1000,
    isPaid: '是',
    payWay: '支付宝',
    payDate: '2016-11-11',
    permissions: 'os_remark',
    productionList: [{
      productionName: '代理记账',
      productionSellPrice: '1056',
      productionOrderPrice: '1056',
      serviceRemark: '代理记账一年送三个月',
    }, {
      productionName: '代理记账',
      productionSellPrice: '1056',
      productionOrderPrice: '1056',
      serviceRemark: '代理记账一年送三个月',
    }],
    remarkList: [{
      commentator: '总监审批',
      createDate: '2016-12-11',
      remarkMsg: '哈哈哈哈',
    }, {
      commentator: '财务审批',
      createDate: '2016-12-12',
      remarkMsg: '买买买买买',
    }],
  }],
};

// 工单明细接口数据结构
let woDetail = {
  flag: 1,
  msg: '123',
  data: [{
    woId: '8aad341558f36b430158fb4a400702bd',
    osCode: 'ltl20161214001',
    companyName: '广州亿账柜信息科技有限公司',
    productionName: '代理记账',
    serviceRemark: '代理记账一年送三个月',
    customer: '小肖',
    customerTel: '13500000000',
    salesman: '老王',
    salesmanTel: '13900000000',
    permissions: 'wo_process',
    nowProcess: '联系客户',
    nextProcess: '收集资料',
    processList: [{
      processType: '联系客户',
      createDate: '2016-12-30',
      processRemark: '客户满意',
    }, {
      processType: '联系客户',
      createDate: '2016-12-30',
      processRemark: '客户满意',
    }],
  }],
};

// 产品列表接口数据结构
let productionList = {
  flag: 1,
  msg: '123',
  data: [{
    productionName: '代理记账（小规模内资公司一个月）',
    productionId: '8aad341558f36b430158fb4a400702bd',
    productionPrice: 100.00,
    productionArea: '广州，深圳',
    productionType: '商事类',
  }],
};

// 产品明细接口数据结构
let productionDetail = {
  flag: 1,
  msg: '123',
  data: [{
    productionName: '代理记账（小规模内资公司一个月）',
    productionId: '8aad341558f36b430158fb4a400702bd',
    productionCode: 'ihACompany',
    productionPrice: 100.00,
    productionType: '商事类',
    productionDepartment: '商事部',
    productionArea: '广州，深圳',
    productionRemark: '代理记账',
    permissions: '',
  }],
};

// 客户列表接口数据结构
let customerList = {
  flag: 1,
  msg: '123',
  data: [{
    customerName: '小名',
    customerId: '8aad341558f36b430158fb4a400702bd',
    customerType: '已成交',
    customerArea: '广州',
    customerTel: '13500000000',
  }, {
    customerName: '小方',
    customerId: '8aad341558f36b430158fb4a400702bd',
    customerType: '已成交',
    customerArea: '广州',
    customerTel: '13500000000',
  }],
};

// 客户明细接口数据结构
let customerDetail = {
  flag: 1,
  msg: '123',
  data: [{
    customerName: '小名',
    customerId: '8aad341558f36b430158fb4a400702bd',
    customerType: '已成交',
    customerTel: '13500000000',
    customerAddress: '天河',
    customerArea: '广州',
    customerRemark: '来了来了',
    creater: '小肖',
    permissions: '',
    companyList: [{
      companyName: '亿账柜',
      companyId: '8aad341558f36b430158fb4a400702bd',
      companyLv: '较高',
      legalPerson: '小刚',
    }, {
      companyName: '亿账柜',
      companyId: '8aad341558f36b430158fb4a400702bd',
      companyLv: '较高',
      legalPerson: '小刚',
    }],
  }],
};

// 企业列表接口数据结构
let companyList = {
  flag: 1,
  msg: '123',
  data: [{
    companyName: '广州纯之萃文化传播有限公司',
    companyId: '8aad341558f36b430158fb4a400702bd',
    companyLv: '较高',
    legalPerson: '小刚',
  }, {
    companyName: '广州纯之萃文化传播有限公司',
    companyId: '8aad341558f36b430158fb4a400702bd',
    companyLv: '较高',
    legalPerson: '小刚',
  }],
};

// 企业详细接口数据结构
let companyDetail = {
  flag: 1,
  msg: '123',
  data: [{
    companyName: '广州纯之萃文化传播有限公司',
    companyId: '8aad341558f36b430158fb4a400702bd',
    companyLv: '较高',
    companyAddress: '广州市天河区体育西路维多利广场A座1501C',
    legalPerson: '小刚',
    creater: '小肖',
    stateTax: '12345678',
    localTax: '12345678',
    permissions: '',
    woList: [{
      woId: '9aad341558f36b430158fb4a400702bd',
      osCode: 'wo20161214001',
      productionName: '内资公司注册',
      staff: '小台',
      nowProcess: '暂停服务',
      createDate: '2016-12-14',
    }],
  }],
};
module.exports = {
  sessionKey: sessionKey,
  approveDynamics: approveDynamics,
  debtDynamics: debtDynamics,
  woDynamics: woDynamics,
  osDetail: osDetail,
  woDetail: woDetail,
  productionList: productionList,
  productionDetail: productionDetail,
  customerList: customerList,
  customerDetail: customerDetail,
  companyList: companyList,
  companyDetail: companyDetail,
};
