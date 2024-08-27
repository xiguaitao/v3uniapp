<template>
	<view class='accreditation'>

		<page-frame title="账户认证" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
			background="#F0F3F5">
			<view class='accreditation-box'>
				<view class="accreditation-content">
					<tn-form ref="formRef" :model="formData" :rules="formRules" :hide-required-asterisk="true"
						label-width="150rpx" label-position="left">
						<tn-form-item label="公司名称" prop="companyName">
							<tn-input placeholder="请输入公司名称" v-model="formData.companyName"
								:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
						</tn-form-item>
						<tn-form-item label="企业法人" prop="legalPerson">
							<tn-input placeholder="请输入企业法人" v-model="formData.legalPerson"
								:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
						</tn-form-item>
						<tn-form-item label="营业执照" prop="licenseLogo">
							<image-upload-x v-model="formData.licenseLogo" :limit="1" />
						</tn-form-item>
						<!-- <tn-form-item label="所在地区" prop="data3">
							<picker-x v-model:provinceId="formData.provinceId" v-model:cityId="formData.cityId"
								v-model:areaId="formData.areaId"></picker-x>
						</tn-form-item> -->
						<tn-form-item label="详细地址" prop="address">
							<tn-input placeholder="请输入详细地址" v-model="formData.address"
								:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }">
							</tn-input>
						</tn-form-item>
					</tn-form>
				</view>
				<view class="accreditation-button">
					<view>
						<tn-button text-color="#fff" bg-color="RGBA(29, 171, 242, 1)" @click="submitForm" width="100%"
							height="88rpx" :loading="loading"> {{ loading ? '提交中...' : '提交' }} </tn-button>
					</view>
					<wd-gap safe-area-bottom height="0"></wd-gap>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='accreditation'>
import { initiateCertification } from '../../request/api/index.js'
import { reactive, ref } from 'vue'
// const pickerValue = ref("")

// 表单数据
const formRef = ref()
const formData = reactive({
	companyName: '',
	legalPerson: '',
	licenseLogo: '',
	provinceId: '',
	cityId: '',
	areaId: '',
	address: '',
})

// 规则
const formRules = {
	companyName: [
		{ required: true, message: '请输入公司名称', trigger: ['change', 'blur'] },
	],
	legalPerson: [
		{ required: true, message: '请输入企业法人', trigger: ['change', 'blur'] },
	],
	licenseLogo: [
		{ required: true, message: '请上传营业执照', trigger: ['change', 'blur'] },
	],
	provinceId: [
		{ required: true, message: '请选择所在地区', trigger: ['change', 'blur'] },
	],
	address: [
		{ required: true, message: '请输入详细地址', trigger: ['change', 'blur'] },
	],
}

/* 提交表单 */
const loading = ref(false)
const submitForm = () => {
	loading.value = true
	formRef.value?.validate((valid) => {
		if (valid) {
			initiateCertification(formData).then(res => {
				if (res.code == 0) {
					loading.value = false
					uni.showToast({
						title: '提交成功',
						icon: 'none',
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				} else {
					loading.value = true
					uni.showToast({
						title: res.msg,
						icon: 'none',
					})
				}
			})
		} else {
			uni.showToast({
				title: '校验失败',
				icon: 'none',
			})
		}
	})
}

const pickerValue = (data) => {
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

.accreditation {
	.accreditation-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding-top: 48rpx;
		box-sizing: border-box;

		.accreditation-content {
			margin: 32rpx;
			padding: 32rpx;
			box-sizing: border-box;
			background: #fff;
			box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
			border-radius: 8rpx;

		}

		.accreditation-button {
			background: #fff;

			>view {
				padding: 24rpx 32rpx;
				box-sizing: border-box;
			}
		}
	}
}
</style>