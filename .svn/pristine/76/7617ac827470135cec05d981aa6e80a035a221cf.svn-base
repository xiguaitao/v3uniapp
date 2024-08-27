<template>
	<view class='myMessage'>
		<page-frame @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower" title="我的消息" :isData="isData"
			:state="state" :refresherTriggered="refresherTriggered" v-model:isData="isData">
			<view class="myMessage-main">
				<view class="list" v-for="item in messagesListData" :key="item.id">
					<view class="list-up">
						<view class="list-up-title">{{ typeList[item.type - 1] }}</view>
						<view class="list-up-time">{{ item.updateTime }}</view>
					</view>
					<view class="list-down">{{ item.content }}</view>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='myMessage'>
import { messagesList } from '../../request/api/index.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
onLoad(() => {
	getUserReset()
})


const typeList = ["充值收益信息", "售后消息", "商品购买收益", "到期提醒", "提现审核", "库存消息", "增加渠道"]
const refresherTriggered = ref(false)
const isData = ref(true)

const refresherrefresh = function (params) {
	refresherTriggered.value = true;
	getMessagesListData.value.page = 1;
	state.value = "loading"
	getUserReset()
}


const scrolltolower = function (params) {
	if (state.value == "error") return
	getMessagesListData.value.page++
	getUserReset(false)
}


const getMessagesListData = ref({ page: 1, limit: 10 })
const messagesListData = ref([])
const state = ref("finished")
const getUserReset = function (states = true) {
	messagesList(getMessagesListData.value).then(res => {
		refresherTriggered.value = false;
		if (states) {
			messagesListData.value = res.data;
		} else {
			messagesListData.value.push(...res.data)
		}
		if (getMessagesListData.value.limit > res.data.length) {
			state.value = "error"
		}
		if (messagesListData.value.length == 0) {
			isData.value = false;
		}
	})
}
</script>
<style lang='scss' scoped>
.myMessage {
	.myMessage-main {
		padding: 50rpx 32rpx 0;
		box-sizing: border-box;

		.list {
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
			border-radius: 8rpx;
			margin-bottom: 32rpx;

			.list-up {
				display: flex;
				justify-content: space-between;
				margin-bottom: 24rpx;

				.list-up-title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #14181A;
					line-height: 33rpx;
				}

				.list-up-time {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #AFB1B2;
					line-height: 28rpx;
				}
			}

			.list-down {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #616466;
				line-height: 28rpx;
			}
		}
	}
}
</style>