<template>
	<view class='statisticians'>
		<page-frame title="统计" :isRefresherEnabled="false" :isShowNodata="false" iconRightColor="#fff"
			titleColor="#fff">
			<template #bg>
				<view class="statisticians-bg">
					<image src="../../static/img/bg-tj.png" />
				</view>
			</template>
			<view class="statisticians-main">
				<view class="statisticians-main-header">
					<view class="screening">
						<view class="screening-left">
							<label>当前统计：</label>
							<view @click="openDateTimePicker = true">{{ getStatisticsData.queryMonth }}<wd-icon
									name="arrow-down" size="16px" color="#1DABF2"></wd-icon></view>
						</view>
						<view class="screening-right">
							<view :class="{ choose: getStatisticsData.type == 1 }" @click="incomeExpenditures(1)">
								收入
							</view>
							<view :class="{ choose: getStatisticsData.type == 2 }" @click="incomeExpenditures(2)">
								支出
							</view>
						</view>
					</view>
					<view class="consider">共收入{{ statisticsData.number }}笔，合计</view>
					<view class="number">
						<label>￥</label>
						<label>{{ statisticsData.money }}</label>
					</view>
				</view>
				<view class="statisticians-main-content">
					<view class="title">收入统计图</view>
					<view class="content">
						<histogram :list="statisticsDataList"></histogram>
					</view>
				</view>
			</view>
			<TnDateTimePicker v-model="getStatisticsData.queryMonth" v-model:open="openDateTimePicker" mode="yearmonth"
				@cancel="cancelTime" @confirm="confirmTiem" format="YYYY-MM" />
		</page-frame>
	</view>
</template>
<script setup name='statisticians'>
import { statistics, } from '../../request/api/finance.js'
import { ref, reactive, createApp } from 'vue'
import { onShow } from '@dcloudio/uni-app'

onShow(() => {
	const { year, month } = getCurrentDate()
	getStatisticsData.queryMonth = `${year}-${month < 10 ? '0' + month : month}`
	getStatistics()
})


const app = createApp({});
import TnDateTimePicker from '@/uni_modules/tuniaoui-vue3/components/date-time-picker/src/date-time-picker.vue'
app.component({
	TnDateTimePicker,
});



const getStatisticsData = reactive({ type: 2, queryMonth: '' })
const statisticsData = ref({})
const statisticsDataList = ref([])
const getStatistics = function () {
	statistics(getStatisticsData).then(res => {
		statisticsData.value = res.data;
		const maxNum = Math.max(...res.data.moneys)
		statisticsDataList.value = res.data.days.map((item, index) => {
			const times = item.split('-')
			let height = "0%"
			if (res.data.moneys[index] != 0) {
				height = `${((res.data.moneys[index] / maxNum * 100))}%`;
			}
			return {
				id: 'x' + index,
				years: times[0],
				months: +times[1],
				number: res.data.moneys[index],
				height,
			}
		});
	})
}

const openDateTimePicker = ref(false)
const cancelTime = function () {
	openDateTimePicker.value = false
}
const confirmTiem = function (item) {
	openDateTimePicker.value = false
	getStatistics()
}



const incomeExpenditures = function (index) {
	getStatisticsData.type = index
	getStatistics()
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
.statisticians {
	.statisticians-bg {
		width: 100%;
		height: 534.9rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.statisticians-main {
		display: flex;
		flex-direction: column;
		height: 100%;

		.statisticians-main-header {
			padding: 68rpx 32rpx 0;
			box-sizing: border-box;
			margin-bottom: 16rpx;

			>view {
				margin-bottom: 32rpx;
			}

			.screening {
				display: flex;
				justify-content: space-between;

				.screening-left {
					display: flex;
					align-items: center;

					label {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(255, 255, 255, 0.7);
						line-height: 28rpx;
					}

					view {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #FFFFFF;
						line-height: 33rpx;
					}
				}

				.screening-right {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.7);
					line-height: 28rpx;
					display: flex;

					view {
						border-radius: 4rpx;
						border: 2rpx solid transparent;
						padding: 8rpx 20rpx;
						box-sizing: border-box;
						margin-left: 32rpx;
					}

					.choose {
						border: 2rpx solid #FFFFFF;
						color: #FFFFFF;
					}

				}
			}

			.consider {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.7);
				line-height: 28rpx;
			}

			.number {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 20rpx;
				color: #FFFFFF;
				line-height: 42rpx;

				label:nth-child(2) {
					font-size: 36rpx;
				}
			}

		}

		.statisticians-main-content {
			flex: 1;
			background: #fff;
			padding: 48rpx 32rpx 0;
			box-sizing: border-box;
			border-radius: 16rpx;

			.title {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 36rpx;
				color: #2E3133;
				line-height: 42rpx;
			}

			.content {
				padding-top: 80rpx;
				box-sizing: border-box;
			}
		}
	}
}
</style>