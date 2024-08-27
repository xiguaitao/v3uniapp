<template>
	<view class='myEarnings'>
		<page-frame @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower" title="收益" :isData="isData"
			:state="state" :refresherTriggered="refresherTriggered" :isShowNodata="isShowNodata"
			:safeAreaInsetBut="false" background="#F0F3F5">
			<view class="myEarnings-content">
				<view class="card">
					<image src="../../static/img/ye-bg.png" />
					<view class="card-content">
						<view class="number">￥<label>{{ detailedBalanceListData.nonPresentIncome }}</label></view>
						<view class="ts">可提现金额 (元)</view>
						<view class="txian" @click="jump">
							<view>提现</view>
							<wd-icon name="arrow-right" size="16px"></wd-icon>
						</view>
					</view>
				</view>
				<view class="time">
					<view class="time-left">
						<view>当前明细：</view>
						<view @click="openDateTimePicker = true">{{ getDetailedBalanceListData.queryMonth }}<wd-icon
								name="arrow-down" size="16px" color="#1DABF2"></wd-icon></view>
					</view>
					<view class="time-right" @click="jump2">
						<view>统计</view>
						<wd-icon name="arrow-right" size="16px" color="#1DABF2"></wd-icon>
					</view>
				</view>
				<view class="tiemlines">
					<timeline-x :list="detailedBalanceListData.list" :month="months" :year="years"></timeline-x>
				</view>
			</view>
			<TnDateTimePicker v-model="getDetailedBalanceListData.queryMonth" v-model:open="openDateTimePicker"
				mode="yearmonth" @cancel="cancelTime" @confirm="confirmTiem" format="YYYY-MM" />
		</page-frame>
	</view>
</template>
<script setup name='myEarnings'>
import { detailedBalanceList } from '../../request/api/finance.js'
import { ref, createApp, reactive } from 'vue'
import { onShow, } from '@dcloudio/uni-app'

onShow(() => {
	const { year, month } = getCurrentDate()
	months.value = month < 10 ? '0' + month : `${month}`
	years.value = `${year}`
	getDetailedBalanceListData.queryMonth = `${year}-${month < 10 ? '0' + month : month}`
	getDetailedBalanceList()
})

const app = createApp({});
import TnDateTimePicker from '@/uni_modules/tuniaoui-vue3/components/date-time-picker/src/date-time-picker.vue'
app.component({
	TnDateTimePicker,
});



const refresherTriggered = ref(false)
const state = ref("finished")
const isData = ref(false)
const isShowNodata = ref(true)
const refresherrefresh = function () {
	refresherTriggered.value = true;
	getDetailedBalanceList()
}


const scrolltolower = function () {
}

const detailedBalanceListData = ref({ nonPresentIncome: 0 })
const getDetailedBalanceListData = reactive({ type: 1, queryMonth: '' })
const getDetailedBalanceList = function () {
	detailedBalanceList(getDetailedBalanceListData).then(res => {
		if (res.data.list && res.data.list.length > 0) {
			isData.value = false;
			isShowNodata.value = false
		} else {
			isShowNodata.value = true;
			isData.value = false;
		}
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
		url: "/subpackageA/withdrawal/withdrawal",
	})
}
const jump2 = function () {
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
	height: 100%;

	.myEarnings-content {
		/* height: 100%; */
		padding: 32rpx;
		box-sizing: border-box;

		.card {
			position: relative;
			height: 174rpx;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);

			image {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			.card-content {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				padding: 32rpx;
				box-sizing: border-box;
				color: #fff;

				.number {
					margin-bottom: 16rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 26rpx;
					color: #FFFFFF;
					line-height: 38rpx;

					label {
						font-size: 42rpx;
					}
				}

				.ts {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.7);
					line-height: 33rpx;
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
					font-family: PingFang SC, PingFang SC;
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

			.time-left {
				display: flex;

				view:nth-child(1) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #616466;
					line-height: 28rpx;
				}

				view:nth-child(2) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #1DABF2;
					line-height: 33rpx;
				}
			}

			.time-right {
				display: flex;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #1DABF2;
				line-height: 33rpx;
			}
		}

		.tiemlines {
			padding-bottom: 64rpx;
		}
	}
}
</style>