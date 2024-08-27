<template>
	<view class='addBankCard'>
		<page-frame title="添加银行卡" :isRefresherEnabled="false" :isShowNodata="false" :bg="false" navbarColor="#fff"
			background="RGBA(240, 243, 245, 1)">

			<view class="addBankCard-main">

				<view class='addBankCard'>
					<view class="addBankCard-content">
						<tn-form ref="formRef" :model="model" :rules="formRules" :hide-required-asterisk="true"
							label-width="200rpx" label-position="left">
							<tn-form-item label="持卡人" prop="bankName">
								<tn-input placeholder="请输入持卡人" v-model="model.bankName"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
							</tn-form-item>
							<tn-form-item label="卡号" prop="bankAccount">
								<tn-input placeholder="请输入卡号" v-model="model.bankAccount"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />

							</tn-form-item>
							<tn-form-item label="所属银行" prop="bankId">
								<inputPicker-x v-model="model.bankId" v-model:valueName="model.bank" label-key="bank"
									value-key="id" :pickerData="bankListData"></inputPicker-x>
							</tn-form-item>
							<tn-form-item label="所属支行" prop="bankAddress">
								<tn-input placeholder="请输入所属支行" v-model="model.bankAddress"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
							</tn-form-item>
							<tn-form-item label="是否默认" prop="isdefault">
								<tn-radio-group v-model="model.isdefault">
									<tn-radio label="0">否</tn-radio>
									<tn-radio label="1">是</tn-radio>
								</tn-radio-group>
							</tn-form-item>

						</tn-form>
					</view>
					<view class="addBankCard-button">
						<view>
							<tn-button text-color="#fff" bg-color="RGBA(29, 171, 242, 1)" @click="submitForm"
								width="100%" height="88rpx" :loading="loading"> {{ loading ? '添加中...' : '添加' }}
							</tn-button>
						</view>
						<wd-gap safe-area-bottom height="0"></wd-gap>
					</view>
				</view>
			</view>

		</page-frame>
	</view>
</template>
<script setup name='addBankCard'>
import { addAtmCard, bankList } from '../../request/api/finance.js'
import { reactive, ref } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'
onShow(() => {
	getBankList()
})
onHide(() => {
	loading.value = false
})
// 银行列表
const bankListData = ref([])
const getBankList = () => {
	bankList().then((res) => {
		bankListData.value = res.data
	})
}

// 表单数据
const formRef = ref()
const model = reactive({
	bankName: '',
	bankAccount: '',
	bankId: '',
	bank: '',
	bankAddress: '',
	isdefault: '0',
})

// 规则
const formRules = {
	bankName: [
		{ required: true, message: '请输入持卡人', trigger: ['change', 'blur'] },
	],
	bankAccount: [
		{ required: true, message: '请输入卡号', trigger: ['change', 'blur'] },
		{ required: true, pattern: /^[1-9]\d{9,29}$/, message: '请输入正确的银行卡号' }
	],
	bankId: [
		{ required: true, message: '请输入所属银行', trigger: ['change', 'blur'] },
	],
	bankAddress: [
		{ required: true, message: '请输入所属支行', trigger: ['change', 'blur'] },
	],
}

/* 提交表单 */
const loading = ref(false)
const submitForm = () => {
	formRef.value?.validate((valid) => {
		if (valid) {

			loading.value = true
			addAtmCard(model).then((res) => {
				uni.showToast({
					title: '添加成功',
					icon: 'none',
					duration: 2000
				})
				const time = setTimeout(() => {
					clearTimeout(time)
					uni.navigateBack({
						delta: 1
					})
				}, 2000)
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
</script>
<style lang='scss' scoped>
.addBankCard {
	.addBankCard-main {
		height: 100%;
		padding-top: 64rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.addBankCard {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;

			.addBankCard-content {
				margin: 32rpx;
				padding: 32rpx;
				box-sizing: border-box;
				background: #fff;
				box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
				border-radius: 8rpx;

			}

			.addBankCard-button {
				background: #fff;

				>view {
					padding: 24rpx 32rpx;
					box-sizing: border-box;
				}
			}
		}

		.footer {
			background: #fff;

			>view {
				padding: 24rpx 32rpx;
				box-sizing: border-box;
			}
		}
	}


	::v-deep .wd-input {
		background: transparent;
	}

	::v-deep .wd-radio-group {
		background: transparent;
	}

	::v-deep .wd-cell-group__body {
		background: transparent;
	}

	::v-deep .wd-cell-group {
		background: transparent;
	}

	::v-deep .wd-input__body {
		padding: 16rpx 10rpx;
		box-sizing: border-box;
		border: 2rpx solid #7FD4FF;
		border-radius: 12rpx;
		background: #fff;
	}


}
</style>