
import request from '../index.js'
import url from '../url.js'
const {_clientList,  _addChannel,  _addConsumerShareholder,_addMember, _channelList  ,_consumerShareholderList , _memberList ,_addMaster,_masterList ,_masterInfo   ,_masterUpdate  ,_memberInfo  ,_memberUpdate  } = url
//首页
export const clientList = (params) => {
	return request({
		url: _clientList,
		method: 'get',
		data: params,
	})
}
//添加渠道
export const addChannel = (params) => {
	return request({
		url: _addChannel,
		method: 'get',
		data: params,
	})
}
//渠道列表
export const channelList = (params) => {
	return request({
		url: _channelList,
		method: 'get',
		data: params,
	})
}
//添加消费股东
export const addConsumerShareholder = (params) => {
	return request({
		url: _addConsumerShareholder,
		method: 'get',
		data: params,
	})
}
//消费股东列表
export const consumerShareholderList = (params) => {
	return request({
		url: _consumerShareholderList,
		method: 'get',
		data: params,
	})
}
//添加成员
export const addMember = (params) => {
	return request({
		url: _addMember,
		method: 'post',
		data: params,
	})
}
//成员列表
export const memberList = (params) => {
	return request({
		url: _memberList,
		method: 'get',
		data: params,
	})
}
//获取成员列表
export const memberInfo = (params) => {
	return request({
		url: _memberInfo,
		method: 'get',
		data: params,
	})
}
//修改成员信息
export const memberUpdate = (params) => {
	return request({
		url: _memberUpdate,
		method: 'post',
		data: params,
	})
}
// 添加师傅
export const addMaster = (params) => {
	return request({
		url: _addMaster,
		method: 'get',
		data: params,
	})
}
// 师傅列表
export const masterList = (params) => {
	return request({
		url: _masterList,
		method: 'get',
		data: params,
	})
}
// 获取师傅信息
export const masterInfo = (params) => {
	return request({
		url: _masterInfo,
		method: 'get',
		data: params,
	})
}
// 修改师傅
export const masterUpdate = (params) => {
	return request({
		url: _masterUpdate,
		method: 'get',
		data: params,
	})
}