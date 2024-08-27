<template>
	<view class='addUser'>
		<view class="tabs">
			<view v-for="item in tabs" :key="item.id" @click="currentTabIndex = item.id">{{ item.text }}</view>
			<view class="sliders">
				<view class="sliders-left"></view>
				<view class="sliders-right"></view>
				<view class="sliders-buttom"></view>
			</view>
		</view>
		<view class="content">

			<KeepAlive>
				<component :is="publishedBooksMessage" @formData="formData" v-model="loading" />
			</KeepAlive>
		</view>
	</view>
</template>
<script setup name='addUser'>
import { addChannel, addConsumerShareholder, addMember, addMaster } from '../../request/api/team.js'
import { ref, computed } from 'vue'

import ChannelManagement from './components/channelManagement.vue'
import ConsumerShareholderManagement from './components/consumerShareholderManagement.vue'
import ConsumerShareholders from './components/consumerShareholders.vue'
import MasterManagement from './components/masterManagement.vue'

// 组件
const currentList = [
	ChannelManagement,
	ConsumerShareholderManagement,
	MasterManagement,
	ConsumerShareholders,
]
const publishedBooksMessage = computed(() => {
	return currentList[currentTabIndex.value]
})

// 请求
const currentReq = [
	addChannel,
	addConsumerShareholder,
	addMaster,
	addMember,
]


// 当前选中的标签索引
const currentTabIndex = ref(0)
const tabs = [
	{ text: '分销管理', id: 0 },
	{ text: '用户管理', id: 1 },
	{ text: '师傅管理', id: 2 },
	{ text: '股东成员管理', id: 3 }
]


// 添加用户
const loading = ref(false)
const formData = data => {
	loading.value = true

	currentReq[currentTabIndex.value](data).then(res => {
		if (res.code == 0) {
			setTimeout(() => {
				loading.value = false
			}, 1000);
			uni.showToast({
				title: '添加成功',
				icon: 'none'
			})
		} else {
			loading.value = false
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})
		}
	})
}
</script>
<style lang='scss' scoped>
.addUser {
	background: RGBA(240, 243, 245, 1);
	display: flex;
	flex-direction: column;

	.tabs {
		display: grid;
		grid-template-columns: repeat(v-bind('tabs.length'), 1fr);
		background: #fff;
		position: relative;
		box-shadow: 0px 6rpx 10rpx 0px rgba(100, 101, 102, 0.1);
		margin-bottom: 64rpx;

		.sliders {
			width: calc(100% / v-bind('tabs.length'));
			height: 100%;
			background: RGBA(240, 243, 245, 1);
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 16rpx 16rpx 0 0;
			box-shadow: inset 0px 0 16rpx 0px rgba(100, 101, 102, 0.1);
			transform: translateX(calc(v-bind('currentTabIndex') * 100%));
			transition: all 0.3s ease-in-out;
			display: flex;
			justify-content: center;
			align-items: flex-end;

			view {
				width: calc(100% - 13rpx);
				height: 30%;
				background: RGBA(240, 243, 245, 1);
				transform: translateY(16rpx);
			}

			.sliders-left,
			.sliders-right {
				width: 1000px;
				height: 30rpx;
				background: RGBA(240, 243, 245, 1);
				position: absolute;

				&::after {
					width: 100%;
					height: 100%;
					display: block;
					content: "";
					background: #fff;
				}


			}

			.sliders-left {
				left: 0;
				bottom: 0;
				transform: translate(calc(-100% + 10rpx), 10rpx);

				&::after {
					border-radius: 0 0 16rpx 0;
					box-shadow: 6rpx 6rpx 10rpx 0px rgba(100, 101, 102, 0.1);
					transform: translate(-10rpx, -10rpx);
				}
			}

			.sliders-right {
				right: 0;
				bottom: 0;
				transform: translate(calc(100% - 10rpx), 10rpx);

				&::after {
					border-radius: 0 0 0 16rpx;
					box-shadow: -6rpx 6rpx 10rpx 0px rgba(100, 101, 102, 0.1);
					transform: translate(10rpx, -10rpx);
				}
			}

		}

		&>*:not(:last-child) {
			position: relative;
			display: grid;
			place-content: center;
			padding: 32rpx 0;
			box-sizing: border-box;
			z-index: 2;

		}

	}

	.content {
		flex: 1;
	}

}
</style>