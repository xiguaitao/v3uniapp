import request from "../index.js";
import url from "../url.js";
const {
  _login,
  _reset,
  _sendSms,
  _agreement,
  _register,
  _regionList,
  _facilityList,
  _facilityDetails,
  _aftermarket,
  _aftermarketDetails,
  _dispatch,
  _engineerSelectList,
  _online,
  _bulletinList,
  _stock,
  _activate,
  _filterList,
  _filterCounts,
  _filterStock,
} = url;
//关于我们
export const login = (params) => {
  return request({
    url: _login,
    method: "post",
    data: params,
  });
};
// 忘记密码
export const reset = (params) => {
  return request({
    url: _reset,
    method: "post",
    data: params,
  });
};
// 验证码
export const sendSms = (params) => {
  return request({
    url: _sendSms,
    method: "get",
    data: params,
  });
};
// 用户协议
export const agreement = (params) => {
  return request({
    url: _agreement,
    method: "post",
    data: params,
  });
};
// 加盟
export const register = (params) => {
  return request({
    url: _register,
    method: "post",
    data: params,
  });
};
// 行政区域
export const regionList = (params) => {
  return request({
    url: _regionList,
    method: "post",
    data: params,
  });
};
// 设备列表
export const facilityList = (params) => {
  return request({
    url: _facilityList,
    method: "get",
    data: params,
  });
};
//设备详情
export const facilityDetails = (params) => {
  return request({
    url: _facilityDetails,
    method: "get",
    data: params,
  });
};
//售后列表
export const aftermarket = (params) => {
  return request({
    url: _aftermarket,
    method: "get",
    data: params,
  });
};
//售后详情
export const aftermarketDetails = (params) => {
  return request({
    url: _aftermarketDetails,
    method: "get",
    data: params,
  });
};
//派单
export const dispatch = (params) => {
  return request({
    url: _dispatch,
    method: "get",
    data: params,
  });
};
//工程师列表
export const engineerSelectList = (params) => {
  return request({
    url: _engineerSelectList,
    method: "get",
    data: params,
  });
};
//完成售后
export const online = (params) => {
  return request({
    url: _online,
    method: "get",
    data: params,
  });
};
//公告
export const bulletinList = (params) => {
  return request({
    url: _bulletinList,
    method: "get",
    data: params,
  });
};
//设备入库
export const stock = (params) => {
  return request({
    url: _stock,
    method: "get",
    data: params,
  });
};
// 激活
export const activate = (params) => {
  return request({
    url: _activate,
    method: "get",
    data: params,
  });
};

// 滤芯列表
export const filterList = (params) => {
  return request({
    url: _filterList,
    method: "get",
    data: params,
  });
};

// 滤芯列表统计
export const filterCounts = (params) => {
  return request({
    url: _filterCounts,
    method: "get",
    data: params,
  });
};

// 滤芯入库
export const filterStock = (params) => {
  return request({
    url: _filterStock,
    method: "get",
    data: params,
  });
};
