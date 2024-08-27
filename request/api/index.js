
import request from '../index.js'
import url from '../url.js'
const {_count,_info,_faqList,_userReset,_messagesList,_userInfo,_initiateCertification} = url
//首页
export const count = (params) => {
	return request({
		url: _count,
		method: 'get',
		data: params,
	})
}
//关于我们
export const info = (params) => {
	return request({
		url: _info,
		method: 'get',
		data: params,
	})
}
//常见问题
export const faqList = (params) => {
	return request({
		url: _faqList,
		method: 'get',
		data: params,
	})
}
//修改密码
export const userReset = (params) => {
	return request({
		url: _userReset,
		method: 'get',
		data: params,
	})
}
//消息列表
export const messagesList = (params) => {
	return request({
		url: _messagesList,
		method: 'get',
		data: params,
	})
}
//用户信息
export const userInfo = (params) => {
	return request({
		url: _userInfo,
		method: 'get',
		data: params,
	})
}
//发起认证
export const initiateCertification = (params) => {
	return request({
		url: _initiateCertification,
		method: 'get',
		data: params,
	})
}