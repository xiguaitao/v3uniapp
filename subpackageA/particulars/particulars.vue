<template>
	<view class='particulars'>
		<page-frame :title="titleList[active]" :isRefresherEnabled="false" :isShowNodata="false"
			background="#F0F3F5">
			<view class="mains">
				<view class="fil">
					<view class="header">
						<view class="header-name">售后进度</view>
						<view class="header-content">
							<tn-steps v-model="currentStep" mode="dotIcon" disabled>
								<tn-steps-item v-for="(item, index) in stepsData" :key="index" :title="item.title"
									:icon="item.icon" :active-icon="item.activeIcon" :active-color="item.activeColor" />
							</tn-steps>
						</view>
						<view class="line"></view>
					</view>
					<view class="lists">
						<view class="list">
							<view class="list-name">售后单号</view>
							<view class="list-content">{{ afterSalesDetailsData.code }}</view>
						</view>
						<view class="list">
							<view class="list-name">售后类型</view>
							<view class="list-content">{{ typeList[afterSalesDetailsData.type - 1] }}</view>
						</view>
						<view class="list">
							<view class="list-name">消费股东</view>
							<view class="list-content">{{ afterSalesDetailsData.customerName }}</view>
						</view>
						<view class="list">
							<view class="list-name">手机号码</view>
							<view class="list-content">{{ afterSalesDetailsData.customerMobile }}</view>
						</view>
						<view class="list">
							<view class="list-name">售后人员</view>
							<view class="list-content">{{ afterSalesDetailsData.engineerName }}</view>
						</view>
						<view class="list">
							<view class="list-name">售后电话</view>
							<view class="list-content">{{ afterSalesDetailsData.engineerMobile }}</view>
						</view>
						<view class="list">
							<view class="list-name">上门地址</view>
							<view class="list-content">{{ afterSalesDetailsData.provinceName }}{{
								afterSalesDetailsData.cityName }}{{ afterSalesDetailsData.areaName }}{{
									afterSalesDetailsData.address }}</view>
						</view>
						<view class="list">
							<view class="list-name">创建时间</view>
							<view class="list-content">{{ afterSalesDetailsData.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='particulars'>
import { aftermarketDetails } from '../../request/api/home.js'
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
onLoad((item) => {
	const { id, type } = item
	if (id) {
		getAfterSalesDetailsData.aftersalesId = id;
	}
	if (type) {
		if (type == 1) {
			currentStep.value = 0
			active.value = 0
		} else if (type == 2) {
			currentStep.value = 1
			active.value = 1
		} else if (type == 3) {
			currentStep.value = 2
			active.value =2
			stepsData.value[2] = {
				title: '已拒绝',
				activeIcon: 'close-fill',
				activeColor: '#FA573E'
			}
		} else if (type == 4) {
			currentStep.value = 3
			active.value = 3
		} else if (type == 5) {
			currentStep.value = 3
			active.value = 4
		} else if (type == 6) {
			currentStep.value = 4
			active.value = 5
		}


	}
})
onShow((item) => {
	getAfterSalesDetails()
})




//info
const typeList = ["水机安装", "滤芯更换", "故障报修", "其他"];
const titleList = ["待派发", "待接单", "已拒绝", "已接单", "服务中", "已完成"];
const active = ref(0);

const getAfterSalesDetailsData = reactive({ aftersalesId: "" })
const afterSalesDetailsData = ref({})
const getAfterSalesDetails = function () {
	aftermarketDetails(getAfterSalesDetailsData).then(res => {
		afterSalesDetailsData.value = res.data
	})
}

const currentStep = ref(0)
const stepsData = ref([
	{
		title: '待派发',
		activeIcon: 'circle-fill',
	},
	{
		title: '待接单',
		activeIcon: 'circle-fill',
	},
	{
		title: '已接单',
		activeIcon: 'circle-fill',
	},
	{
		title: '服务中',
		activeIcon: 'circle-fill',
	},
	{
		title: '已完成',
		activeIcon: 'success-circle-fill',
	},
])
</script>
<style lang='scss' scoped>
.particulars {
	.mains {
		padding: 48rpx 32rpx;
		box-sizing: border-box;
		filter: drop-shadow(0px 0px 16rpx rgba(3, 18, 26, 0.05));


		.header {
			padding: 32rpx 52rpx 32rpx;
			box-sizing: border-box;
			position: relative;
			background:
				radial-gradient(circle at left bottom, transparent 20rpx, #fff 0) left bottom,
				radial-gradient(circle at right bottom, transparent 20rpx, #fff 0) right bottom;
			background-repeat: no-repeat;
			background-size: 60% 100%;
			border-radius: 8rpx;

			.header-name {
				margin-bottom: 44rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #14181A;
				line-height: 33rpx;
			}

			.header-content {}

			.line {
				position: absolute;
				left: 50%;
				bottom: -2rpx;
				width: calc(100% - 40rpx);
				transform: translateX(-50%);
				border-bottom: 2rpx dashed #C8CBCC;
			}

		}

		.lists {
			padding: 52rpx 32rpx 32rpx;
			box-sizing: border-box;
			background:
				radial-gradient(circle at left top, transparent 20rpx, #fff 0) left top,
				radial-gradient(circle at right top, transparent 20rpx, #fff 0) right top;
			background-repeat: no-repeat;
			background-size: 60% 100%;
			border-radius: 8rpx;

			.list {
				display: flex;
				margin-bottom: 24rpx;

				.list-name {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #616466;
					line-height: 33rpx;
					margin-right: 24rpx;
				}

				.list-content {
					flex: 1;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #14181A;
					line-height: 33rpx;
				}

			}
		}

	}
}
</style>