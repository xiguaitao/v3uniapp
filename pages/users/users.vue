<template>
	<view class='users'>
		<page-frame title="用户" :isRefresherEnabled="false" :isShowNodata="false" :isLeft="false"
			:safeAreaInsetBut="false">
			<view class="users-main">
				<view class="users-main-tabs">
					<view class="tab" v-for="item in tabList" :key="item.value" @click="tabChange(item)"
						:class="{ 'settle-upon ': tabIndex === item.id }">
						<view class="tab-s">
							<wd-transition :show="tabIndex === item.id" name="zoom-in" custom-class="transition"
								custom-style="height: 100%;display: flex;align-items: center;">
								<view class="tab-k"></view>
							</wd-transition>
						</view>
						<view class="tab-text">
							<label>{{ item.name }}</label>
							<!-- <label>({{ item.value }})</label> -->
						</view>
					</view>
				</view>
				<view class="users-main-list">
					<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
						style="height: 100%;overflow: auto;" :refresher-triggered="refresherTriggered"
						@scrolltolower="scrolltolower" :lower-threshold="20" refresher-background="transparent">
						<view style=" padding-bottom: 32rpx; box-sizing: border-box;">
							<TransitionGroup name="list" tag="view">
								<view style="width: 100%;" v-for="item in orderList" :key="item.id" @click="jump(item)"
									v-SildeIn>
									<list-x :status="[0].includes(tabIndex) ? item.level : item.status"
										:leftText="item.name"
										:statusList="[0].includes(tabIndex) ? statusList : statusList1"
										:statusColor="[0].includes(tabIndex) ? statusColor : statusColor1"
										:isRight="[0, 3].includes(tabIndex)">

										<!-- <template #right>
											<tn-icon name="link" size="40" @click="bind(item)"></tn-icon>
										</template> -->

										<!-- 渠道管理 -->
										<view class="list" style="order:1" v-if="[0].includes(tabIndex)">
											<view class="list-name">装机数量</view>
											<view class="list-content">{{ item.productCount }}台</view>
										</view>
										<view class="list" style="order:1" v-if="[0].includes(tabIndex)">
											<view class="list-name">会员人数</view>
											<view class="list-content">{{ item.customerCount }}人</view>
										</view>
										<!-- 消费股东管理 -->
										<view class="list" style="order:1" v-if="[1].includes(tabIndex)">
											<view class="list-name">所属代理商</view>
											<view class="list-content">{{ item.principalName }}</view>
										</view>
										<view class="list" style="order:1" v-if="[1].includes(tabIndex)">
											<view class="list-name">装机数量</view>
											<view class="list-content">{{ item.productCount }}台</view>
										</view>
										<!-- <view class="list" style="order:1" v-if="[1].includes(tabIndex)">
											<view class="list-name">推荐人数</view>
											<view class="list-content">{{ item.customerCount }}</view>
										</view> -->
										<view class="list" style="order:3" v-if="[1].includes(tabIndex)">
											<view class="list-name">注册时间</view>
											<view class="list-content">{{ item.createTime }}</view>
										</view>
										<!-- 消费股东 -->
										<view class="list" style="order:1" v-if="[3].includes(tabIndex)">
											<view class="list-name">收益比率</view>
											<view class="list-content">{{ (item.rate * 100).toFixed(0) }}%</view>
										</view>
										<!-- 公用 -->
										<view class="list" style="order:2">
											<view class="list-name">手机号码</view>
											<view class="list-content">{{ item.mobile }}</view>
										</view>
										<view class="list" style="order:2">
											<view class="list-name">详情地址</view>
											<view class="list-content"> {{ item.provinceName }}{{ item.cityName }}{{
												item.areaName }}{{ item.address }}</view>
										</view>
									</list-x>
								</view>
							</TransitionGroup>
							<wd-loadmore v-if="orderList.length > 0" custom-class="loadmore" :state="state"
								finished-text="加载更多" error-text="到底了" />
							<view v-else-if="orderList.length == 0" class="nodata">
								<view class="unoccupied">
									<tn-empty mode="data" />
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>
		</page-frame>
		<wd-fab :draggable="true" active-icon="add" :gap="{ top: 5, left: 5, right: 5, bottom: 5 }">
			<template #button>
				<view @click="fabClick" class="fab-box"> <wd-icon custom-class="wd-fab__icon" size="30px" color="#fff"
						name="add"></wd-icon></view>
			</template>
		</wd-fab>
	</view>
</template>
<script setup name='users'>
import { channelList, consumerShareholderList, memberList, masterList } from '../../request/api/team.js'
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
	getListData.page = 1;
	getlist()

})




//info
const statusList = ['省级代理商', '市级代理商', '县级代理商']
const statusList1 = ['发起人', '服务股东', '推广股东', '普通员工']
const statusColor = ['#FA573E', '#1DABF2', '#04CC89']
const statusColor1 = ['#2E3133', '#04CC89', '#1DABF2', '#FA573E']
const tabList = ref([
	{
		id: 0,
		name: '渠道管理',
		value: 0
	},
	{
		id: 1,
		name: '用户管理',
		value: 0
	},
	{
		id: 2,
		name: '师傅管理',
		value: 0
	},
	{
		id: 3,
		name: '成员管理',
		value: 0
	}
])


//切换
const tabIndex = ref(0)
const tabChange = (item) => {
	if (tabIndex.value == item.id) return;
	tabIndex.value = item.id;
	getListData.page = 1;
	getlist()
}

//刷新/加载
const refresherTriggered = ref(false)
const state = ref("finished")
const refresherrefresh = (params) => {
	refresherTriggered.value = true;
	getListData.page = 1;
	getlist()
}

const scrolltolower = () => {
	if (state.value == "error") return
	getListData.page++;
	getlist(false)
}

//请求数据
const currentReq = [
	channelList,
	consumerShareholderList,
	masterList,
	memberList,
]

const getListData = reactive({ page: 1, limit: 10 })
const orderList = ref([])
async function getlist(states = true) {
	state.value = "loading"
	currentReq[tabIndex.value](getListData).then(res => {
		refresherTriggered.value = false;
		if (states) {
			orderList.value = res.data
		} else {
			orderList.value.push(...res.data)
		}
		if (res.data.length < (getListData.limit)) {
			state.value = "error"
		}
	})


}
function fabClick() {
	uni.navigateTo({
		url: '/subpackageA/addUser/addUser'
	})
}

function jump({ id }) {
	if (tabIndex.value < 2) return;
	uni.navigateTo({
		url: '/subpackageA/modifications/modifications?type=' + tabIndex.value + '&id=' + id,
	})
}

function bind({ id }) {
	uni.navigateTo({
		url: '/subpackageA/bind/bind?id=' + id
	})
}
</script>
<style lang='scss' scoped>
.users {
	height: 100%;

	.users-main {
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: 32rpx 32rpx 0;
		box-sizing: border-box;

		.users-main-tabs {
			display: grid;
			grid-template-columns: repeat(v-bind('tabList.length'), auto);
			margin-bottom: 50rpx;

			.tab {
				display: flex;
				align-items: center;
				justify-content: center;

				.tab-s {
					width: 28rpx;
					height: 28rpx;
					display: grid;
					place-content: center;
					margin-right: 1rpx;

					.tab-k {
						width: 18rpx;
						height: 18rpx;
						background: linear-gradient(180deg, #04D9D9 0%, #1DABF2 100%);
						border-radius: 4rpx;
						transform: rotate(45deg);
					}
				}

				.tab-text {
					display: flex;
					align-items: center;

					label {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 22rpx;
						color: #2E3133;
						line-height: 38rpx;
					}
				}
			}

			.settle-upon {

				.tab-text {

					label {
						color: #1DABF2;
					}
				}
			}
		}

		.users-main-list {
			overflow: hidden;
			height: 100%;

			.list-move,
			// 对移动中的元素应用的过渡 
			.list-enter-active,
			.list-leave-active {
				transition: all 0.5s ease;
			}



			.list-enter-from,
			.list-leave-to {
				opacity: 0;
				transform: translateX(30px);
			}

			// 确保将离开的元素从布局流中删除   以便能够正确地计算移动的动画。
			.list-leave-active {
				position: absolute;
			}


			.nodata {
				display: grid;
				place-content: center;
				height: 100%;

			}

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

			.button-fw {
				display: flex;
				justify-content: flex-end;



				view {
					text-align: center;
					min-width: 176rpx;
					background: linear-gradient(135deg, #FA8C3E 0%, #FA573E 100%);
					border-radius: 4rpx;
					font-size: 28rpx;
					padding: 18rpx;
					box-sizing: border-box;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 33rpx;
					margin-left: 24rpx;
				}

				view:nth-child(1) {
					border: 2rpx solid;
					background: transparent;
					border-image: linear-gradient(135deg, rgba(250, 140, 62, 1), rgba(250, 87, 62, 1)) 2 2;
					color: #FA573E;
				}
			}

			.button-wc {
				display: flex;
				justify-content: flex-end;

				view {
					text-align: center;
					min-width: 176rpx;
					background: #1DABF2;
					border-radius: 4rpx;
					font-size: 28rpx;
					padding: 18rpx;
					box-sizing: border-box;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #FFFFFF;
					line-height: 33rpx;
				}
			}
		}





	}



	.popup-main {
		padding: 32rpx 0 0;
		box-sizing: border-box;

		.popup-main-title {
			padding: 0 32rpx;
			box-sizing: border-box;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #14181A;
			line-height: 38rpx;
			margin-bottom: 24rpx;
		}

		.popup-main-content {
			padding: 0 32rpx;
			box-sizing: border-box;
			margin-bottom: 48rpx;
		}

		.popup-main-btn {
			display: flex;
			align-items: center;

			view {
				flex: 1;
				padding: 24rpx 0;
				display: grid;
				place-content: center;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 32rpx;
				color: #14181A;
				line-height: 38rpx;
				border-top: 1rpx solid #E1E4E6;
			}

			view:nth-child(2) {
				color: #1DABF2;
				border-left: 1rpx solid #E1E4E6;
			}
		}
	}

	.fab-box {
		width: 88rpx;
		height: 88rpx;
		background: linear-gradient(135deg, #FA8C3E 0%, #FA573E 100%);
		box-shadow: inset 4rpx 4rpx 8rpx 0rpx #FA643E, inset -4rpx -4rpx 8rpx 0rpx #FA9C3E, 0rpx 8rpx 8rpx 0rpx rgba(250, 87, 62, 0.25);
		border-radius: 50%;
		display: grid;
		place-content: center;
	}

}
</style>