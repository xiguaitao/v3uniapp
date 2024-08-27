<template>
	<view class='applyToJoin'>
		<page-frame title="申请加盟" :isRefresherEnabled="false" :isShowNodata="false">
			<view class="form">
				<wd-form ref="form" :model="model" style="padding-top: 64rpx;box-sizing: border-box;">
					<wd-cell-group border>
						<view class="input">
							<wd-input :no-border="true" label-width="80px" prop="name" clearable v-model="model.name"
								placeholder="输入姓名" :rules="rules.name">
							</wd-input>
						</view>
						<view class="input">
							<wd-input :no-border="true" label-width="80px" prop="mobile" clearable
								v-model="model.mobile" placeholder="手机号码" :rules="rules.mobile" :maxlength="11" />
						</view>
						<view class="input">
							<wd-input :no-border="true" label-width="0" prop="code" v-model="model.code"
								placeholder="请输入验证码" :rules="rules.code" use-suffix-slot>
								<template #suffix>
									<computingButton-x @click="getCode" ref="computingButton"></computingButton-x>
								</template>
							</wd-input>
						</view>
						<view class="input">
							<wd-input :no-border="true" label-width="80px" prop="refereeMobile" clearable
								v-model="model.refereeMobile" placeholder="输入推荐人手机号码 (选填)" />
						</view>
						<view class="input">
							<picker-x v-model:provinceId="model.provinceId" v-model:cityId="model.cityId"
								v-model:areaId="model.areaId"></picker-x>
						</view>
						<view class="input">
							<wd-textarea auto-height type="textarea" v-model="model.address" :maxlength="300"
								show-word-limit placeholder="请输入详细地址" clearable prop="address" :rules="rules.address" />
						</view>
					</wd-cell-group>
					<view class="tip">
						<wd-checkbox v-model="model.read" custom-label-class="label-class">
							我已阅读并同意
							<text style="color: #4d80f0" @click.stop="jump">《用户使用协议》</text>
						</wd-checkbox>
					</view>
					<view class="footer">
						<wd-button type="primary" size="large" @click="handleSubmit" block
							:loading="loading">提交</wd-button>
					</view>
				</wd-form>

			</view>
		</page-frame>
	</view>
</template>
<script setup name='applyToJoin'>
import { sendSms, register, regionList } from '../../request/api/home.js'
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {

})


const form = ref()
const loading = ref(false)
const model = reactive({
	name: '',
	mobile: '',
	code: '',
	refereeMobile: '',
	provinceId: '1',
	cityId: '2',
	areaId: '3',
	address: '',
	read: '',
})
const rules = ref({
	name: [
		{ required: true, message: '请输入姓名', },
	],
	mobile: [
		{ required: true, message: '请输入手机号码' },
		{ required: true, pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '请输入正确的手机号码' }
	],
	code: [{ required: true, message: '请输入验证码' }],
	refereeMobile: [{ required: true, message: '请输入手机号码', }],
	value5: [{ required: true, message: '请选择省市区', }],
	address: [{ required: true, message: '请输入详细地址', }],
})
const handleSubmit = function () {
	form.value
		.validate()
		.then(({ valid, errors }) => {
			if (!model.read) {
				uni.showToast({
					title: '请勾选用户使用协议',
					icon: 'none'
				})
				return
			}
			if (valid) {
				loading.value = true;
				register(model).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: '申请成功',
							icon: 'none'
						})
						let time = setTimeout(() => {
							loading.value = false;
							clearTimeout(time)
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					} else {
						loading.value = false;
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		})
		.catch((error) => {
		})
}
const computingButton = ref()
const getCode = function () {
	form.value.validate("mobile").then((res) => {
		if (res.valid) {
			sendSms({ phone: model.mobile, type: 1, }).then((res) => {
				if (res.code == 0) {
					uni.showToast({
						title: '验证码发送成功',
						icon: 'none'
					})
					computingButton.value.getCode()
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
		}
	}
	)
}
const jump = function () {
	uni.navigateTo({
		url: '/subpackageA/userAgreement/userAgreement'
	})
}
</script>
<style lang='scss' scoped>
.applyToJoin {
	height: 100%;

	.form {
		padding: 66rpx 48rpx;
		box-sizing: border-box;
		height: 100%;
		/* background: #F2F2F2; */


		::v-deep .wd-cell-group__body,
		::v-deep .wd-cell,
		::v-deep .wd-textarea,
		::v-deep .wd-cell-group,
		::v-deep .wd-input {
			background: transparent;
		}


		::v-deep .wd-cell.is-border .wd-cell__wrapper {
			align-items: center;
		}




		::v-deep .picker-x {
			border: 2rpx solid #34B9FC;
			overflow: hidden;
			border-radius: 12rpx;
		}

		::v-deep .wd-textarea.is-auto-height:not(.is-cell) {
			border: 2rpx solid #34B9FC;
			overflow: hidden;
			border-radius: 12rpx;
			padding: 0 12rpx;
			box-sizing: border-box;
			background: #fff;
		}

		::v-deep .wd-textarea.is-cell .wd-textarea__value textarea {
			padding: 16rpx 10rpx;
			box-sizing: border-box;
		}

		::v-deep .wd-cell.is-border .wd-cell__wrapper {
			align-items: center;
		}

		::v-deep .wd-input__body {
			padding: 16rpx 10rpx;
			box-sizing: border-box;
			border: 2rpx solid #7FD4FF;
			border-radius: 12rpx;
			background: #fff;
		}

		.input {
			margin-bottom: 32rpx;
		}

		.tip {
			margin: 10px 15px 21px;
			color: #999;
			font-size: 12px;
		}


		.footer {
			margin-top: 162rpx;
		}
	}
}
</style>