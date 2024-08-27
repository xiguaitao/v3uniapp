<template>
	<view class='qr'>
		<qr-x v-if="show" @success='qrcodeSucess' @error="qrcodeError" :definition="true"></qr-x>
		{{ type }}
	</view>
</template>
<script setup name='qr'>
// import { stock } from '../../request/api/home.js'
import { stock, filterStock } from '../../request/api/home.js'
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
const show = ref(false)
const type = ref(1)
onLoad((option) => {
	type.value = option.type
})
const { platform, osVersion } = uni.getSystemInfoSync()
if (platform == 'ios') {
	const releases = osVersion.split('.')
	if (+releases[0] < 14 && +releases[1] < 3) {
		uni.showToast({
			title: '当前只支持ios14.3及以上的系统，请先升级系统版本',
			icon: 'none'
		})
		uni.navigateBack({})
	} else {
		show.value = true
	}
} else {
	show.value = true
}



const qrcodeSucess = (data) => {
	// uni.$emit('qrcodeSucess', data);
	// uni.navigateBack({})

	setStock(data)

}

const qrcodeError = (err) => {
	uni.showModal({
		title: '摄像头授权失败',
		content: '摄像头授权失败，请检测当前浏览器是否有摄像头权限。',
		success: () => {
			uni.navigateBack({})
		}
	})
}
const setStock = (equipCode) => {
	uni.showLoading({
		title: '正在入库中...'
	});
	if (type.value == 1) {
		stock({ codeNumber: equipCode }).then(res => {
			if (res.code === 0) {
				uni.hideLoading();
				uni.showToast({
					title: '入库成功',
					icon: 'success'
				})

				uni.redirectTo({
					url: '/subpackageA/qr/qr?type=' + type.value
				});
			} else {
				uni.hideLoading();
				uni.showToast({
					title: res.msg,
					icon: 'error'
				})
				uni.redirectTo({
					url: '/subpackageA/qr/qr?type=' + type.value
				});
			}

		}).catch(err => {
			uni.hideLoading();
			uni.showToast({
				title: res.msg,
				icon: 'error'
			})

			uni.redirectTo({
				url: '/subpackageA/qr/qr?type=' + type.value
			});


		})
	} else {
		filterStock({ codeNumber: equipCode }).then(res => {
			if (res.code === 0) {
				uni.hideLoading();
				uni.showToast({
					title: '入库成功',
					icon: 'success'
				})

				uni.redirectTo({
					url: '/subpackageA/qr/qr?type=' + type.value
				});

			} else {
				uni.hideLoading();
				uni.showToast({
					title: res.msg,
					icon: 'error'

				})
				uni.redirectTo({
					url: '/subpackageA/qr/qr?type=' + type.value
				});
			}
		}).catch(err => {
			uni.hideLoading();
			uni.showToast({
				title: res.msg,
				icon: 'error'
			})
			uni.redirectTo({
				url: '/subpackageA/qr/qr?type=' + type.value
			});
		})
	}

}


</script>
<style lang='scss' scoped></style>