<template>
	<view class='withdrawal'>
		<page-frame title="提现" :isRefresherEnabled="false" :isShowNodata="false" iconRightColor="#fff"
			titleColor="#fff">
			<template #bg>
				<image src="../../static/img/bg-tx.png" style="width: 100%;height: 530rpx;" />
			</template>
			<view class="withdrawal-main">
				<view class="number">
					<label>￥</label>
					<label>{{ userInfoData.nonPresentIncome }}</label>
				</view>
				<view class="text">可提现金额 (元)</view>
				<view class="card">
					<view class="card-text">提现金额</view>
					<view class="card-tixian">
						<view class="card-tixian-input">
							<label>￥</label>
							<TnInput type="number" :border="false" v-model="submitData.money" :height="90"
								:placeholder-style="{ 'font-size': '40rpx', }" placeholder="请输入提现金额">
							</TnInput>
						</view>
						<view class="card-tixian-btn" @click="withdrawal">全部提现</view>
					</view>
					<view class="card-yinhang">
						<view>提现至</view>
						<view @click="atmCardClick">{{ submitData.bankName }}<wd-icon name="arrow-right" size="16px"
								color="#AFB1B2"></wd-icon>
						</view>
					</view>
					<!-- <view class="card-btn" @click="handleSubmit">申请提现</view> -->
					<wd-button @click="handleSubmit" plain hairline custom-class="card-btn"
						:loading="loading">申请提现</wd-button>
				</view>
				<wd-popup v-model="show9" position="bottom" :safe-area-inset-bottom="true"
					custom-style="min-height: 600rpx;border-radius:32rpx;padding: 32rpx;" @close="handleClose9">
					<view class="popup-header">
						<view class="popup-header-title">选择提现银行卡</view>
						<view class="popup-header-icon" @click="handleClose9"><wd-icon name="close"
								size="18px"></wd-icon></view>
					</view>
					<view class="popup-content">
						<wd-radio-group v-model="submitData.bankId" shape="dot" safe-area-inset-bottom
							@change="submitDataChange">
							<view class="radio" v-for="item in atmCardListData" :key="item.id">
								<wd-radio :value="item.id">{{ item.bankName }}</wd-radio>
							</view>
						</wd-radio-group>
						<wd-cell-group>
							<wd-cell title="添加银行卡" to="/subpackageA/addBankCard/addBankCard" :is-link="true">
								<template #icon>
									<image src="../../static/img/icon-tjyhk.png"
										style="width: 48rpx;height: 48rpx;margin-right: 16rpx;" />
								</template>
							</wd-cell>
						</wd-cell-group>
					</view>
				</wd-popup>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='withdrawal'>
import { atmCardList, initiateWithdrawals } from '../../request/api/finance.js'
import { userInfo } from '../../request/api/index.js'
import { ref, createApp, reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app'
onLoad(() => {
})
onShow(() => {
	getAtmCardList()
	getUserInfo()
})
const app = createApp({});
import TnInput from '@/uni_modules/tuniaoui-vue3/components/input/src/input.vue'
app.component({
	TnInput,
});


const show9 = ref(false);
const handleClose9 = () => {
	show9.value = false;
}

const atmCardListData = ref([])
const getAtmCardListData = reactive({ page: 1, limit: 10 })
const getAtmCardList = function () {
	atmCardList(getAtmCardListData).then(res => {
		atmCardListData.value = res.data
		if (res.data.length > 1) {
			res.data.find((item) => {
				if (item.isdefault == 1) {
					submitData.bankId = item.id;
					submitData.bankName = item.bankName;
				}
			})
		} else if (res.data.length != 0) {
			submitData.bankId = res.data[0].id;
			submitData.bankName = res.data[0].bankName;
		}
	})
}
const atmCardClick = function () {
	show9.value = true;
}


const submitData = reactive({
	bankId: "",
	bankName: "",
	money: "",
})
const loading = ref(false)
function handleSubmit() {
	if (!submitData.bankId) {
		uni.showToast({
			title: "请选择银行卡",
			icon: "none"
		})
		show9.value = true;
		return
	} else if (!submitData.money && submitData.money !== 0) {
		uni.showToast({
			title: "请输入提现金额",
			icon: "none"
		})
		return
	} else if (userInfoData.value.nonPresentIncome < submitData.money) {
		uni.showToast({
			title: "当前可提现金额为" + userInfoData.value.nonPresentIncome,
			icon: "none"
		})
		return
	} else if (userInfoData.value.nonPresentIncome == 0) {
		uni.showToast({
			title: "当前金额为0,无法提现",
			icon: "none"
		})
		return
	}else if (submitData.money<100) {
		uni.showToast({
			title: "提现金额不能小于100",
			icon: "none"
		})
		return
	}
	loading.value = true
	initiateWithdrawals(submitData).then(res => {
		if (res.code == 0) {
			uni.showToast({
				title: "申请成功",
				icon: "none"
			})
			const time = setTimeout(() => {
				clearTimeout(time)
				loading.value = false
				// uni.navigateBack({
				// 	delta: 1
				// })
			}, 2000)
		} else {
			const time = setTimeout(() => {
				clearTimeout(time)
				loading.value = false
			}, 2000)
		}
	})
}
const userInfoData = ref({})
function getUserInfo() {
	userInfo().then(res => {
		userInfoData.value = res.data;
	})
}
function withdrawal() {
	submitData.money = userInfoData.value.nonPresentIncome;
}

function submitDataChange({ value }) {
	atmCardListData.value.find(
		(item) => {
			if (item.id == value) {
				submitData.bankName = item.bankName;
			}
		}
	)
}
</script>
<style lang='scss' scoped>
.withdrawal {
	.withdrawal-main {
		padding: 32rpx;
		box-sizing: border-box;

		.number {
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 38rpx;
			margin-top: 64rpx;
			margin-bottom: 24rpx;

			label {
				font-size: 36rpx;
			}
		}

		.text {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: rgba(255, 255, 255, 0.7);
			line-height: 33rpx;
			margin-bottom: 48rpx;
		}

		.card {
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 32rpx;
			box-sizing: border-box;
			box-shadow: 0 24rpx 20rpx rgba(0, 0, 0, 0.1);

			.card-text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #2E3133;
				line-height: 33rpx;
				margin-bottom: 48rpx;
			}

			.card-tixian {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 32rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #E1E4E6;
				margin-bottom: 32rpx;

				.card-tixian-input {
					flex: 1;
					font-family: PingFang SC, PingFang SC;
					font-weight: 600;
					font-size: 60rpx;
					color: #14181A;
					line-height: 70rpx;
					display: flex;
					align-items: flex-end;

					::v-deep .tn-input--input {
						font-size: 80rpx;
					}

					/* label {
						font-size: 80rpx;
					} */
				}

				.card-tixian-btn {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1DABF2;
					line-height: 33rpx;
				}
			}

			.card-yinhang {
				display: flex;
				justify-content: space-between;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #2E3133;
				line-height: 33rpx;
				margin-bottom: 64rpx;

				view:nth-child(2) {
					color: #14181A;
					display: flex;
					align-items: center;

				}
			}

			.card-btn {
				padding: 24rpx 0;
				box-sizing: border-box;
				color: #fff;
				background: #1DABF2;
				border-radius: 8rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.popup-header {
			position: relative;

			.popup-header-title {
				text-align: center;
			}

			.popup-header-icon {
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				display: grid;
				place-content: center;
			}
		}

		.popup-content {
			max-height: 500rpx;
			overflow: auto;

			::v-deep .wd-radio {
				margin-top: 0 !important;
			}

			::v-deep .wd-cell__wrapper {
				align-items: center;
			}

			::v-deep .wd-cell__title {
				display: flex;
			}

			&:not(:last-child) {
				padding: 24rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #E1E4E6;
			}

			.radio {
				padding: 24rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #E1E4E6;
			}


		}
	}
}
</style>