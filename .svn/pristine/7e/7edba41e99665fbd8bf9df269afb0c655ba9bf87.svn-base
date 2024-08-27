<template>

	<view class='myEquipment'>

		<page-frame title="我的设备" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
			:isRight="true" background="#F0F3F5">
			<template #titlem>
				<view style="margin:8rpx 0;background: #fff;border-radius: 999rpx; padding-right: 8rpx;">
					<tn-search-box v-model="getDigitalData.queryCode" @blur="searchInputEvent"
						@search="searchBtnClickEvent" clearable :search-button="false" shape="round" :border="false"
						placeholder-icon="" />
				</view>
			</template>
			<template #right>
				<view style="width: 100rpx;">
					<tn-icon name="scan"></tn-icon>
				</view>
			</template>
			<view class="myEquipment-main">
				<view class="myEquipment-main-tabs">
					<tn-subsection v-model="subsectionValue" mode="button" @change="subsectionChange">
						<tn-subsection-item :title="item.name" v-for="item in subsectionList" :key="item.id" />
					</tn-subsection>
				</view>
				<view class="myEquipment-main-list">
					<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
						style="height: 100%;overflow: auto;" :refresher-triggered="refresherTriggered"
						@scrolltolower="scrolltolower" :lower-threshold="20" refresher-background="transparent">
						<view style=" padding-bottom: 32rpx; box-sizing: border-box;height: 100%;">
							<TransitionGroup name="list" tag="view">
								<view class="list" v-for="item in digitalData" :key="item.id" @click="toDetail(item)">
									<view class="list-title">
										<view class="list-title-left list-content">
											<view>设备编号</view>
											<view>{{ item.code }}</view>
										</view>
										<view class="list-title-right" :style="{
											'--color': item.networkStatus == 1 ? '#14181A' : '#AFB1B2',
											'--borderColor': item.networkStatus == 1 ? '#04CC89' : '#AFB1B2'
										}">{{ item.networkStatus == 1 ? '在线' : '离线' }}
										</view>
									</view>
									<view class="list-text list-content">
										<view>使用客户</view>
										<view>{{ item.customerName }}</view>
									</view>
									<view class="list-text list-content">
										<view>手机号码</view>
										<view>{{ item.customerMobile }}</view>
									</view>
									<view class="list-text list-content">
										<view>设备地址</view>
										<view>{{ item.address }}</view>
									</view>
									<view class="list-text list-content">
										<view>激活时间</view>
										<view>{{ item.startTime }}</view>
									</view>
								</view>
							</TransitionGroup>
							<wd-loadmore v-if="digitalData.length > 0" custom-class="loadmore" :state="state"
								finished-text="加载更多" error-text="到底了" />
							<view v-else-if="digitalData.length == 0" class="nodata">
								<view class="unoccupied">
									<tn-empty mode="data" />
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>
			<!-- <tn-popup v-model="showPopup" width="552">
				<view class="popup-main">
					<view class="popup-main-title">拒绝原因</view>
					<view class="popup-main-content">
						<tn-input :custom-style="{ background: '#F0F3F5', 'border-radius': '4rpx' }" :border="false"
							v-model="inputValue" clearable auto-height :maxlength="256" show-word-limit :height="152"
							type="textarea" placeholder="请输入原因" underline />
					</view>
					<view class="popup-main-btn">
						<view @click="cancel">取消</view>
						<view @click="reject">确定</view>
					</view>
				</view>
			</tn-popup> -->
			<tn-modal ref="modalRef" />
		</page-frame>
	</view>
</template>
<script setup name='myEquipment'>
import { facilityList } from '../../request/api/home.js'
import { ref, reactive, } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
	getDigital()
})



// const showPopup = ref(false)

// const searchValue = ref('')
const searchInputEvent = () => {
	getDigital()
}
const searchBtnClickEvent = (value) => {
}

const getDigitalData = reactive({ page: 1, limit: 10, queryCode: '', })
const digitalData = ref([])
const state = ref("finished")
const getDigital = (states = true) => {
	if (states) {
		getDigitalData.page = 1;
	}
	facilityList(getDigitalData).then(res => {
		refresherTriggered.value = false;
		if (states) {
			digitalData.value = res.data;
		} else {
			digitalData.value.push(...res.data)
		}
		if (getDigitalData.limit > res.data.length) {
			state.value = "error"
		}
	})
}

//刷新/加载
const refresherTriggered = ref(false)
const refresherrefresh = () => {
	refresherTriggered.value = true;
	state.value = "loading"
	getDigital()
}

const scrolltolower = () => {
	if (state.value == "error") return
	getDigitalData.page++
	getDigital(false)
}

const subsectionList = [{ id: 0, name: '全部设备', type: -1 }, { id: 1, name: '未激活设备', type: 1, key: 'startStatus' }, { id: 2, name: '在线设备', type: 1, key: 'networkStatus' }, { id: 3, name: '离线设备', type: 0, key: 'networkStatus' }]
const subsectionValue = ref(0)
const subsectionChange = (index) => {
	if (subsectionList[index].type === -1) {
		delete getDigitalData.networkStatus
		delete getDigitalData.startStatus
	} else if (subsectionList[index].id === 1) {
		delete getDigitalData.networkStatus
		getDigitalData.startStatus = subsectionList[index].type;
	} else {
		// getDigitalData.networkStatus = subsectionList[index].type;
		delete getDigitalData.startStatus
		getDigitalData.networkStatus = subsectionList[index].type;
	}
	getDigital()
}

const toDetail = ({ id }) => {
	uni.navigateTo({
		url: '/subpackageA/facilityDetails/facilityDetails?id=' + id,
	})
}
const cancel = () => {

}
</script>
<style lang='scss' scoped>
.myEquipment {
	width: 100%;

	.myEquipment-main {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: 32rpx 32rpx 0;
		box-sizing: border-box;

		.myEquipment-main-tabs {
			margin-bottom: 32rpx;
			margin-top: 12rpx;

			::v-deep .tn-subsection {
				border: 1px solid #E1E4E6;
				padding: 4px 0;
				box-sizing: border-box;
				background: #EBEEF0 !important;
			}

			::v-deep .tn-subsection--button .tn-subsection__slider {
				background: #fff;
				box-shadow: 4px 4px 12px 0px rgba(3, 18, 26, 0.1);
			}
		}

		.myEquipment-main-list {
			overflow: hidden;
			height: 100%;

			.list-move,
			/* 对移动中的元素应用的过渡 */
			.list-enter-active,
			.list-leave-active {
				transition: all 0.5s ease;
			}


			.list-enter-from,
			.list-leave-to {
				opacity: 0;
				transform: translateX(30px);
			}

			/* 确保将离开的元素从布局流中删除   以便能够正确地计算移动的动画。 */
			.list-leave-active {
				position: absolute;
			}


			.nodata {
				display: grid;
				place-content: center;
				height: 100%;

			}

			.list {
				width: 100%;
				background: #fff;
				box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(3, 18, 26, 0.05);
				border-radius: 8rpx;
				padding: 32rpx;
				box-sizing: border-box;
				margin-bottom: 32rpx;


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

					.list-title-right {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: var(--color);
						line-height: 28rpx;
						display: flex;
						align-items: center;

						&::before {
							display: block;
							content: '';
							width: 12rpx;
							height: 12rpx;
							background: var(--borderColor);
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

}
</style>