<template>
	<view class='list-x'>
		<view class="lists">
			<view class="lists-header">
				<view class="left" >
					<view class="name">{{ leftText }}</view>
					<view class="code">{{ code }}</view>
				</view>
				<view class="right" v-if="isRight">
					<slot name="right">{{ props.statusList[status - 1] }}</slot>
				</view>
			</view>
			<view class="lists-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script setup name='list-x'>
import { ref, reactive, toRefs, defineProps, computed } from 'vue';

const props = defineProps({
	isRight: {
		type: Boolean,
		default: true
	},
	status: {
		type: Number,
		default: 1
	},
	code: {
		type: String,
		default: " "
	},
	leftText: {
		type: String,
		default: "售后单据："
	},
	statusList: {
		type: Array,
		default: () => ["待接单", "服务中", "已拒绝", "已完成"]
	},
	statusColor: {
		type: Array,
		default: () => ["#1DABF2", "#1DABF2", "#FA573E", "#04CC89"]
	},
})


const textColor = computed(() => props.statusColor[props.status - 1])


</script>
<style lang='scss' scoped>
.list-x {
	margin-top: 10rpx;

	.lists {
		background: #fff;
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
		border-radius: 8rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.lists-header {
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx dashed #DFDFDF;
			padding-bottom: 32rpx;
			box-sizing: border-box;

			.left {
				display: flex;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #14181A;
				line-height: 33rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}

			}

			.right {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: v-bind(textColor);
				line-height: 33rpx;
			}
		}

		.lists-content {
			padding-top: 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
