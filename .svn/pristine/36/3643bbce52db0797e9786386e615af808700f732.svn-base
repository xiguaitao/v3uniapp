<template>
	<view class='facilityDetails'>
		<page-frame title="设备详情" :isRefresherEnabled="false" :isShowNodata="false">
			<view class="facilityDetails-main">
				<view class="facilityDetails-main-item">
					<view class="details">
						<view class="list-title">
							<view class="list-title-left list-content">
								<view>设备编号</view>
								<view>{{ digitalData.code }}</view>
							</view>
							<view class="" v-if="digitalData.signaType == 1 || digitalData.signaType == 2 || digitalData.signaType == 0">
								<view v-if="digitalData.networkStatus == 1">在线</view>
								<view v-if="digitalData.networkStatus == 0">离线</view>
							</view>
						</view>
						<view class="list-text list-content">
							<view>使用客户</view>
							<view>{{ digitalData.customerName }}</view>
						</view>
						<view class="list-text list-content">
							<view>设备地址</view>
							<view>{{ digitalData.provinceName }}{{ digitalData.cityName }}{{ digitalData.areaName }}{{ digitalData.adress }}</view>
						</view>
						<view class="list-text list-content">
							<view>激活时间</view>
							<view>{{ digitalData.startTime }}</view>
						</view>
						<view class="list-text list-content">
							<view>到期时间</view>
							<view>{{ digitalData.endTime }}</view>
						</view>
						<view class="list-text list-content">
							<view>剩余服务</view>
							<view>{{ digitalData.leftNumber }}{{digitalData.mealType == 2 ? 'L' : '天'}}</view>
						</view>
					</view>

					<view class="digital-tab">
						<view>
							<view>净水总量</view>
							<view>{{ digitalData?.productWaterStatus?.totalwater }}</view>
						</view>
						<view>
							<view>净化前TDS</view>
							<view>{{ digitalData?.productWaterStatus?.enterTds }}</view>
						</view>
						<view>
							<view>净化后TDS</view>
							<view>{{ digitalData?.productWaterStatus?.outTds }}</view>
						</view>
					</view>
					<view class="digital">
						<view class="digital-list" v-for="item in digitalData.productSuppliesVos" :key="item.id">
							<view class="digital-list-name">{{ item.suppliesName }}</view>
							<view class="digital-list-progress">
								<view class="digital-list-progress-bar"><tn-line-progress
										:percent="item.leftPercent" />
								</view>
								<view class="digital-list-progress-text">{{ item.suppliesRemark }}</view>
							</view>
							<view style="display: flex;align-items: center;" class="digital-list-percent">
								<tn-count-scroll :value="item.leftPercent" />
								<view>%</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='facilityDetails'>
import { facilityDetails } from '../../request/api/home.js'
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
onLoad((opts) => {
	if (opts) {
		const { id } = opts;
		getDigitalData.productId = id;
		getDigital();
	}
})


const daysBetweenDates = (inputDate, replacementcycle) => {

	// 将输入日期转换为 Date 对象
	const date = new Date(inputDate);

	// 获取当前日期
	const currentDate = new Date();

	// 计算两个日期之间的时间差（以毫秒为单位）
	const timeDifference = currentDate - date;

	// 将时间差转换为天数
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	if (daysDifference >= replacementcycle) {
		return 100;
	}
	return (daysDifference / replacementcycle) * 100;
}

const getDigitalData = reactive({})
const digitalData = ref({})
const getDigital = () => {
	facilityDetails(getDigitalData).then(res => {
		digitalData.value = res.data
	})
}


const progressPercent = ref(30)

</script>
<style lang='scss' scoped>
.facilityDetails {

	.facilityDetails-main {
		padding: 32rpx 32rpx 0;
		box-sizing: border-box;

		.facilityDetails-main-item {
			margin-top: 12rpx;
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx;

			.details {
				width: 100%;
				padding-bottom: 48rpx;
				box-sizing: border-box;
				border-bottom: 2rpx dashed #E1E4E6;

				.list-content {
					view:nth-child(1) {
						width: 160rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #616466;
						line-height: 33rpx;
					}

					view:nth-child(2) {
						flex: 1;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #14181A;
						line-height: 33rpx;
					}
				}

				.list-title {
					display: flex;
					justify-content: space-between;

					.list-title-left {
						display: flex;
					}

					.list-content {}

					.list-title-right {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #14181A;
						line-height: 28rpx;
						display: flex;
						align-items: center;

						&::before {
							display: block;
							content: '';
							width: 12rpx;
							height: 12rpx;
							background: #04CC89;
							border-radius: 0rpx 0rpx 0rpx 0rpx;
							margin-right: 8rpx;
							border-radius: 50%;

						}
					}


				}

				.list-text {
					display: flex;
				}

				&>*:not(:last-child) {
					margin-bottom: 26rpx;
				}
			}

			.digital-tab {
				padding: 48rpx 0;
				box-sizing: border-box;
				display: grid;
				grid-template-columns: repeat(3, 1fr);

				>view {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					view:nth-child(1) {
						margin-bottom: 20rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #616466;
						line-height: 33rpx;
					}

					view:nth-child(2) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 32rpx;
						color: #14181A;
						line-height: 38rpx;
					}
				}

				>view:nth-child(2) {
					border: 2rpx dashed #E1E4E6;
					border-top: 0;
					border-bottom: 0;
				}

			}

			.digital {
				&>*:not(:last-child) {
					margin-bottom: 42rpx;
				}

				.digital-list {
					display: flex;
					align-items: flex-start;

					.digital-list-name {
						width: 150rpx;
						line-height: 22rpx;
					}

					.digital-list-progress {
						padding: 0 26rpx;
						box-sizing: border-box;
						flex: 1;

						.digital-list-progress-bar {
							height: 20rpx;
							margin-bottom: 16rpx;
						}

						.digital-list-progress-text {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 20rpx;
							color: #616466;
							line-height: 23rpx;
						}
					}

					.digital-list-percent {
						line-height: 22rpx;
						width: 78rpx;
						display: flex;
						justify-content: center;
					}
				}
			}
		}

	}
}
</style>