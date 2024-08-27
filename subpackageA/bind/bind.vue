<template>
	<view class='bind'>
		<page-frame title="绑定设备" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
			background="#F0F3F5">
			<view class="bind-main">
				<view class="bind-main-contnet">
					<view class="form">
						<tn-form ref="formRef" :model="model" :rules="formRules" :hide-required-asterisk="true"
							label-width="150rpx" label-position="left">
							<tn-form-item label="设备ID" prop="code">
								<tn-input placeholder="请输入设备ID" v-model="model.code"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }">
									<template #suffix>
										<tn-icon name="scan" size="40" @click="toQr"></tn-icon>
									</template>
								</tn-input>
							</tn-form-item>
							<tn-form-item label="所在地区" prop="provinceId">
								<picker-x v-model:provinceId="model.provinceId" v-model:cityId="model.cityId"
									v-model:areaId="model.areaId"></picker-x>
							</tn-form-item>
							<tn-form-item label="详情地址" prop="address">
								<tn-input placeholder="请输入详细地址" v-model="model.address" type="textarea"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
							</tn-form-item>

						</tn-form>
					</view>
				</view>
				<view class="button">
					<view class="bu">
						<tn-button text-color="#fff" bg-color="RGBA(29, 171, 242, 1)" @click="submitForm" width="100%"
							height="88rpx" :loading="loading"> {{ loading ? ' 绑定设备中...' : ' 绑定设备' }}
						</tn-button>
					</view>
					<wd-gap safe-area-bottom height="0"></wd-gap>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='bind'>
import { activate } from '../../request/api/home.js'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { extractQueryParameter } from '../../utils/index';


onLoad((item) => {
	if (item.id) {
		model.customerId = item.id;
	}
	uni.$on('qrcodeSucess', function (data) {
		console.log('data::: ', data);
		model.code = extractQueryParameter(data, 'equipCode');
	})
})
// 表单数据
const formRef = ref()
const url = 'https://water.cnjly.net/?equipCode='
const model = reactive({
	code: "",
	provinceId: '',
	cityId: '',
	areaId: '',
	address: '',
	customerId: '',
})

// 规则
const formRules = {
	code: [
		{ required: true, message: '请输入设备ID', trigger: ['change', 'blur'] },
	],
	provinceId: [
		{ required: true, message: '请选择地区', trigger: ['change', 'blur'] },
	],
	address: [
		{ required: true, message: '请输入详细地址', trigger: ['change', 'blur'] },
	],
}

/* 提交表单 */
const loading = ref(false)
const submitForm = () => {
	formRef.value?.validate((valid) => {
		if (valid) {

			loading.value = true
			const data = { ...model, code: url + model.code }
			activate(data).then((res) => {
				console.log('res::: ', res);

				if (res.code == 0) {
					uni.showToast({
						title: '绑定成功',
						icon: 'none',
						duration: 2000
					})
					const time = setTimeout(() => {
						clearTimeout(time)
						uni.navigateBack()
					}, 2000)
				} else {
					loading.value = false
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}

			}).catch((error) => {
				const time = setTimeout(() => {
					clearTimeout(time)
					loading.value = false
				}, 2000)
			})
		} else {
			uni.showToast({
				title: '校验失败',
				icon: 'none',
			})
		}
	})
}

const toQr = () => {
	uni.navigateTo({
		url: '/subpackageA/qr/qr'
	})
}

</script>
<style lang='scss' scoped>
::v-deep .wd-picker__cell {
	background: #F0F3F5;
	border-radius: 16rpx;
	border: 2rpx solid #E6E6E6;
	padding: 12rpx 16rpx;
}

::v-deep .wd-picker__placeholder {
	color: #9C9C9C;
}

.bind {
	height: 100%;

	.bind-main {
		height: 100%;
		display: flex;
		flex-direction: column;

		.bind-main-contnet {
			padding: 32rpx 32rpx 0;
			box-sizing: border-box;
			flex: 1;

			.form {
				padding: 32rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 16rpx;
			}
		}

		.button {
			background: #fff;

			.bu {
				padding: 32rpx;
				box-sizing: border-box;
			}
		}
	}
}
</style>