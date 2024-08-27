<template>
	<view class='retrievePassword'>
		<page-frame title="找回密码" :isRefresherEnabled="false" :isShowNodata="false">
			<view class="mains">
				<wd-form ref="form" :model="model">
					<wd-cell-group border>
						<view class="imput">
							<wd-input :no-border="true" :maxlength="11" label-width="0" prop="mobile" clearable
								v-model="model.mobile" placeholder="输入手机号码" :rules="rules.mobile" />
						</view>
						<view class="imput">
							<wd-input :no-border="true" label-width="0" prop="code" v-model="model.code"
								placeholder="请输入验证码" :rules="rules.code" use-suffix-slot>
								<template #suffix>
									<computingButton-x @click="getCode" ref="computingButton"></computingButton-x>
								</template>
							</wd-input>
						</view>
						<view class="imput">
							<wd-input :no-border="true" label-width="0" prop="passWord" show-password clearable
								v-model="model.passWord" placeholder="请输入新密码" :rules="rules.passWord" />
						</view>
						<view class="imput">
							<wd-input :no-border="true" label-width="0" prop="value4" show-password clearable
								v-model="model.value4" placeholder="请确认新密码"
								:rules="[{ required: true, message: '请确认新密码', validator: validator }]" />
						</view>
					</wd-cell-group>
					<view class="footer">
						<wd-button type="primary" size="large" @click="handleSubmit" block
							:loading="loading">确定</wd-button>
					</view>
				</wd-form>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='retrievePassword'>
import { reset, sendSms, } from '../../request/api/home.js'
import { ref, reactive } from 'vue'



const rules = ref({
	mobile: [
		{ required: true, message: '输入手机号码', },
		{ required: true, pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '请输入正确的手机号码' }
	],
	code: [{ required: true, message: '请输入验证码' }],
	passWord: [{ required: true, message: '请输入新密码' }],
})

const model = reactive({
	mobile: '',
	code: '',
	passWord: '',
	value4: '',

})
const form = ref()
const loading = ref(false)
const handleSubmit = function () {
	form.value
		.validate()
		.then(({ valid, errors }) => {
			if (valid) {
				loading.value = true;
				reset(model).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: '修改成功，请重新登陆！',
							icon: 'none'
						})
						let time = setTimeout(() => {
							loading.value = false;
							clearTimeout(time)
							uni.navigateTo({
								url: '/pages/login/login'
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
var validator = function () {
	if (model.passWord != model.value4) {
		return Promise.reject('两次密码不一致')
	} else {
		return true
	}
}

const computingButton = ref()
const getCode = function () {
	form.value.validate("mobile").then((res) => {
		if (res.valid) {
			sendSms({ phone: model.mobile, type: 3, }).then((res) => {
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
</script>
<style lang='scss' scoped>
.retrievePassword {
	.mains {
		padding: 264rpx 50rpx 0;
		box-sizing: border-box;

		::v-deep .wd-cell-group__body,
		::v-deep.wd-cell-group {
			background: transparent;
		}

		.imput {
			background: #fff;
			border: 2rpx solid #CCECF9;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 32rpx;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
		}
	}
}
</style>