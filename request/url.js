const url = {
  // home
  _login: "/home/login/accountLogin", //登录
  _reset: "/home/login/reset", //忘记密码
  _sendSms: "/home/login/sendSms", //验证码
  _agreement: "/home/login/agreement", //用户协议
  _register: "/home/login/register", //用户协议
  _regionList: "/home/region/regionList", //行政区域
  _aftermarket: "/home/aftersales/list", //售后列表
  _aftermarketDetails: "/home/aftersales/single", //售后详情
  _facilityList: "/home/product/list", //设备列表
  _facilityDetails: "/home/product/single", //设备详情
  _engineerSelectList: "/home/aftersales/engineerSelect", //工程师列表
  _dispatch: "/home/aftersales/update", //派单
  _online: "/home/aftersales/online", //完成售后
  _bulletinList: "/home/notice/list", //公告
  _stock: "/home/product/stock", //设备入库
  _activate: "/home/product/activate", //设备激活
  _filterList: "/home/codeStock/list",
  _filterCounts: "/home/codeStock/listCount",
  _filterStock: "/home/codeStock/codeStock",
  // index
  _count: "/index/index/count", //首页
  _info: "/index/faq/info", //关于我们
  _faqList: "/index/faq/list", //常见问题
  _userReset: "/index/index/userReset", //修改密码
  _messagesList: "/index/message/list", //消息列表
  _userInfo: "/index/index/single", //用户信息
  _initiateCertification: "/index/auth/save", //发起认证
  // finance
  _statistics: "/finance/distributionRecord/statistics", //统计
  _atmCardList: "/finance/bankCard/list", //银行卡列表
  _addAtmCard: "/finance/bankCard/save", //添加银行卡
  _initiateWithdrawals: "/finance/applyWithdrawlRecord/save", //发起提现
  _detailedBalanceList: "/finance/distributionRecord/list", //余额明细
  _bankList: "/finance/bankCard/bankList", //银行列表
  // team
  _clientList: "/team/customer/list", //统计
  _addChannel: "/team/agency/add", //添加渠道
  _channelList: "/team/agency/list", //渠道列表
  _addConsumerShareholder: "/team/customer/add", //添加消费股东
  _consumerShareholderList: "/team/customer/list", //消费股东列表
  _addMember: "/team/user/add", //添加成员
  _memberList: "/team/user/list", //成员列表
  _memberInfo: "/team/user/info", //获取成员列表
  _memberUpdate: "/team/user/update", //修改成员信息
  _masterList: "/team/engineer/list", //添加师傅
  _addMaster: "/team/engineer/add", //添加师傅
  _masterInfo: "/team/engineer/info", //获取师傅信息
  _masterUpdate: "/team/engineer/update", //修改师傅信息
};
export default url;
