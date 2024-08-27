
//====================
// 全局请求封装
import base_url from './address'
// 请求超出时间
const timeout = 5000

// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'token': uni.getStorageSync('token') || '',
		'Content-Type': "application/json",
		'Authorization': uni.getStorageSync('token') || '',
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': uni.getStorageSync('token') || '',
			'Authorization': uni.getStorageSync('token') || '',
			...params.header
		};
	}
	return new Promise((resolve, reject) => {
		uni.request({
			// #ifdef MP
			url: base_url + url,
			// #endif
			// #ifdef H5
			url: (process.env.NODE_ENV === 'development' ? '/api' : '') + '/water-platform-agency-api' + url,
			// #endif
			method: method,
			header: header,
			data: data,
			timeout,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				if (res.statusCode == 200) {
					if (res.data.code == 0) {
						resolve(res.data);
					} else {
						switch (res.data.code) {
							case 401:
								uni.clearStorageSync()
								uni.showToast({
									title: "登录过期",
									icon: 'none'
								})
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/login/login",
									})
								}, 1000);
								break;
							case 404:
								uni.showToast({
									title: '请求地址不存在...',
									duration: 2000,
								})
								break;
							default:
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								break;
						}
						resolve(res.data);
					}
				} else {
					reject(res.data);
					uni.clearStorageSync()
				}
			},
			fail(err) {
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					wx.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);

			},
			complete() {
				// 不管成功还是失败都会执行
				// uni.hideLoading();
				// uni.hideToast();
			}
		});
	}).catch(() => { });
};