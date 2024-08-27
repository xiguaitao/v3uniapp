<template>
	<view class='timeline-x'>
		<view class="month">
			<view>{{ month }}月</view>
			<view>{{ year }}</view>
		</view>
		<view class="timeline">
			<view class="content" v-for="item in list" :key="item.id">
				<view class="line">
					<view></view>
				</view>
				<view class="content-item">
					<view class="content-item-top">
						<view class="content-item-top-date">{{ item.day }}日</view>
						<view class="content-item-top-label">
							<label>收入￥{{ item.incomeMoney }}</label>
							<label>支出￥{{ item.outcomeMoney }}</label>
						</view>
					</view>
					<view class="content-item-bottom">
						<view class="content-item-list" v-for="(detailListItem, detailListIndex) in item.detailList"
							:key="detailListItem.id">
							<view class="content-item-bottom-left">
								<view>{{ detailListItem?.type == 1 ? '完成售后' : '收益提现' }}</view>
								<view>{{ detailListItem?.times }}</view>
							</view>
							<view class="content-item-bottom-right">{{ detailListItem?.money }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup name='timeline-x'>
import { ref, defineProps, } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
	month: {
		type: String,
		default: '6'
	},
	year: {
		type: String,
		default: '2000'
	},
})
</script>
<style lang='scss' scoped>
.timeline-x {
	display: flex;

	/* &:not(:first-child) {

		.line {

			&::after {
				border-right: 2rpx dashed transparent !important;
			}
		}
	} */

	.month {
		margin-right: 32rpx;

		view:nth-child(1) {
			font-family: PingFang SC, PingFang SC;
			font-weight: 600;
			font-size: 44rpx;
			color: #14181A;
			line-height: 52rpx;
		}

		view:nth-child(2) {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #616466;
			line-height: 33rpx;
		}
	}

	.timeline {
		flex: 1;

		.content {
			display: flex;

			&:last-child {

				.line {
					&::after {
						border-right: 2rpx dashed transparent;
					}
				}

			}

			.line {
				width: 26rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 32rpx;

				&::after {
					flex: 1;
					display: block;
					content: '';
					width: 0rpx;
					border-right: 2rpx dashed #1DABF2;
				}

				view {
					width: 30rpx;
					height: 30rpx;
					background: #1DABF2;
					border: 6rpx solid #C8E9FA;
					border-radius: 50%;
					flex-shrink: 0;
				}
			}

			&:not(:first-child) {
				.line {
					view {
						width: 20rpx;
						height: 20rpx;
						border: 0;
					}
				}

			}



			.content-item {
				flex: 1;
				margin-top: -6rpx;

				&::after {
					display: block;
					content: "";
					height: 64rpx;
				}

				.content-item-top {
					display: flex;
					justify-content: space-between;
					margin-bottom: 30rpx;

					.content-item-top-date {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #2E3133;
						line-height: 33rpx;
					}

					.content-item-top-label {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #AFB1B2;
						line-height: 23rpx;

						label {
							margin-left: 16rpx;
						}
					}
				}

				.content-item-bottom {
					.content-item-list {
						padding: 32rpx;
						background: #fff;
						box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
						border-radius: 8rpx;
						display: flex;
						justify-content: space-between;
						margin-bottom: 32rpx;

						.content-item-bottom-left {

							view:nth-child(1) {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #2E3133;
								line-height: 33rpx;
								margin-bottom: 16rpx;
							}

							view:nth-child(2) {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #AFB1B2;
								line-height: 33rpx;
							}
						}

						.content-item-bottom-right {
							font-family: PingFang SC, PingFang SC;
							font-weight: 500;
							font-size: 28rpx;
							color: #1DABF2;
							line-height: 33rpx;
						}
					}
				}
			}
		}
	}



}
</style>