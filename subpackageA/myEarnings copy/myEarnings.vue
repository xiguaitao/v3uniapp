<template>
	<view class='myEarnings'>
		<page-frame title="我的收益" :isRefresherEnabled="false" :isShowNodata="false" background="#F0F3F5"
			transitionName="fade">
			<view class="myEarnings-content">
				<tn-tabs v-model="currentTabIndex" bg-color="tn-red_bg" :bar="false">
					<tn-tabs-item v-for="(item, index) in tabsData" :key="index" :title="item.text">
						<view class="tabs-item ">{{ item.text }}</view>
					</tn-tabs-item>
				</tn-tabs>
				<view class="card">
					<image src="../../static/img/ye-bg.png" />
					<view class="card-content">
						<view class="ts">累计总收益（元）</view>
						<view class="number">{{ detailedBalanceListData.nonPresentIncome }}</view>
						<view class="card-content-bottom">
							<view class="">
								<view>本月预估（元）</view>
								<view>327.00</view>
							</view>
							<view class="">
								<view>上月结算（元）</view>
								<view>1152.00</view>
							</view>
						</view>
						<view class="txian" @click="jump">
							<view>统计</view>
							<wd-icon name="arrow-right" size="16px"></wd-icon>
						</view>
					</view>
				</view>
				<view class="time">
					<view class="time-left">
						<view class="text">收益：</view>
						<view class="number"><label>￥</label>560</view>
					</view>
					<view class="time-right">
						<view>当前明细：</view>
						<view @click="openDateTimePicker = true">{{ getDetailedBalanceListData.queryMonth }}<wd-icon
								name="arrow-down" size="16px" color="#1DABF2"></wd-icon></view>
					</view>

				</view>
				<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
					style="height: 100%;overflow: auto; flex:1;" :refresher-triggered="refresherTriggered"
					@scrolltolower="scrolltolower" :lower-threshold="20" refresher-background="transparent">
					<view class="tiem-list">
						<view class="list">
							<view class="list-up">
								<view class="list-up-left">产品1收益</view>
								<view class="list-up-right">+100</view>
							</view>
							<view class="list-down">20240521 18:36</view>
						</view>
						<view class="list">
							<view class="list-up">
								<view class="list-up-left">产品1收益</view>
								<view class="list-up-right">+100</view>
							</view>
							<view class="list-down">20240521 18:36</view>
						</view>
						<view class="list">
							<view class="list-up">
								<view class="list-up-left">产品1收益</view>
								<view class="list-up-right">+100</view>
							</view>
							<view class="list-down">20240521 18:36</view>
						</view>
					</view>
					<wd-loadmore v-if="orderList.length > 0" custom-class="loadmore" :state="state" finished-text="加载更多"
						error-text="到底了" />
					<view v-else-if="orderList.length == 0" class="nodata">
						<view class="unoccupied">
							<tn-empty mode="data" />
						</view>
					</view>
				</scroll-view>
			</view>
			<tn-date-time-picker v-model="getDetailedBalanceListData.queryMonth" v-model:open="openDateTimePicker"
				mode="yearmonth" @cancel="cancelTime" @confirm="confirmTiem" format="YYYY-MM" />
		</page-frame>
	</view>
</template>
<script setup name='myEarnings'>
// import { detailedBalanceList } from '../../request/api/finance.js'
import { ref, reactive } from 'vue'
import { onLoad, onShow, } from '@dcloudio/uni-app'
onLoad(() => {
})

onShow(() => {
	const { year, month } = getCurrentDate()
	months.value = month < 10 ? '0' + month : `${month}`
	years.value = `${year}`
	getDetailedBalanceListData.queryMonth = `${year}-${month < 10 ? '0' + month : month}`
	// getDetailedBalanceList()
})


const currentTabIndex = ref(0)
const tabsData = [
	{
		text: '全部',
	},
	{
		text: '产品1',
	},
	{
		text: '产品2',
	},
	{
		text: '产品3',
	},
	{
		text: '产品4',
	},
	{
		text: '产品5',
	},
	{
		text: '产品6',
	},
	{
		text: '产品7',
	},
	{
		text: '产品8',
	},
	{
		text: '产品9',
	},
]

const refresherTriggered = ref(false)
const state = ref("finished")
const orderList = ref([])
const refresherrefresh = function () {
	refresherTriggered.value = true;
	setTimeout(() => {
		refresherTriggered.value = false;
	}, 2000);
	// getDetailedBalanceList()
}


const scrolltolower = function () {
}

const detailedBalanceListData = ref({
	nonPresentIncome: 0,
})
const getDetailedBalanceListData = reactive({ type: 1, queryMonth: '' })
const getDetailedBalanceList = function () {
	detailedBalanceList(getDetailedBalanceListData).then(res => {
		detailedBalanceListData.value = res.data
		refresherTriggered.value = false;
	})
}



const openDateTimePicker = ref(false)
const months = ref("")
const years = ref("")
const cancelTime = function () {
	openDateTimePicker.value = false
}
const confirmTiem = function (item) {
	const times = item.split('-')
	openDateTimePicker.value = false
	years.value = times[0]
	months.value = times[1]
	getDetailedBalanceList()
}


const jump = function () {
	uni.navigateTo({
		url: "/subpackageA/statisticians/statisticians",
	})
}


const getCurrentDate = function () {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // 月份是从0开始的，所以要加1
	const day = now.getDate();

	return {
		year: year,
		month: month,
		day: day
	};
}
</script>
<style lang='scss' scoped>
.myEarnings {
	font-family: PingFang SC, PingFang SC;
	height: 100%;

	.myEarnings-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 32rpx;
		box-sizing: border-box;

		::v-deep .tn-tabs-item--scroll {
			padding: 0 12rpx;
		}

		.tabs-item {
			padding: 8rpx 32rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 8rpx;
			/* margin-right: 24rpx; */
		}

		.card {
			position: relative;
			box-shadow: 0 15px 15px -10px rgba(89, 134, 178, 1), ;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			.card-content {
				position: relative;
				padding: 32rpx;
				box-sizing: border-box;
				color: #fff;

				.number {
					margin-bottom: 16rpx;

					font-weight: 600;
					font-size: 60rpx;
					color: #FFFFFF;
					line-height: 70rpx;
					margin-bottom: 32rpx;
				}

				.ts {

					font-weight: 400;
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.7);
					line-height: 33rpx;
					margin-bottom: 24rpx;
				}

				.card-content-bottom {
					display: flex;

					>view {
						flex: 1;

						view:nth-child(1) {

							font-weight: 400;
							font-size: 24rpx;
							color: rgba(255, 255, 255, 0.7);
							line-height: 28rpx;
							margin-bottom: 32rpx;
						}

						view:nth-child(2) {
							font-weight: 500;
							font-size: 36rpx;
							color: #FFFFFF;
							line-height: 42rpx;
						}
					}
				}

				.txian {
					width: 202rpx;
					height: 76rpx;
					position: absolute;
					right: 0;
					top: 0;
					padding: 14rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					font-weight: 400;
					font-size: 28rpx;
					color: #2E3133;
					line-height: 33rpx;
				}

			}
		}

		.time {
			margin: 64rpx 0;
			display: flex;
			justify-content: space-between;

			.time-right {
				display: flex;

				view:nth-child(1) {

					font-weight: 400;
					font-size: 24rpx;
					color: #616466;
					line-height: 28rpx;
				}

				view:nth-child(2) {

					font-weight: 500;
					font-size: 28rpx;
					color: #1DABF2;
					line-height: 33rpx;
				}
			}

			.time-left {
				display: flex;

				font-weight: 400;
				font-size: 28rpx;
				color: #1DABF2;
				line-height: 33rpx;

				.text {

					font-weight: 400;
					font-size: 24rpx;
					color: #616466;
					line-height: 28rpx;
				}

				.number {

					font-weight: 500;
					font-size: 28rpx;
					color: #2E3133;
					line-height: 33rpx;

					label {
						font-size: 24rpx;
					}
				}
			}
		}

		.tiem-list {
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx;
			padding: 32rpx;
			box-sizing: border-box;

			&>*:not(:last-child) {
				border-bottom: 1rpx dashed #E1E4E6;
			}

			&>*:not(:first-child) {
				padding-top: 32rpx;
			}

			&>*:not(:last-child) {
				padding-bottom: 32rpx;
			}

			.nodata {
				display: grid;
				place-content: center;
				height: 100%;
			}

			.list {
				box-sizing: border-box;

				.list-up {
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.list-up-left {
						flex: 1;

						font-weight: 500;
						font-size: 28rpx;
						color: #2E3133;
						line-height: 33rpx;

					}

					.list-up-right {

						font-weight: 500;
						font-size: 28rpx;
						color: #FA573E;
						line-height: 33rpx;
					}
				}

				.list-down {

					font-weight: 400;
					font-size: 24rpx;
					color: #AFB1B2;
					line-height: 28rpx;
				}
			}
		}
	}
}
</style>