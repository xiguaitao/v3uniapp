<template>

	<view class='contractManagement'>

		<page-frame title="合同管理" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
			background="#F0F3F5">
			<template #titlem>
				<view class="titlem">
					<view>合同管理</view>
					<image src="../../static/img/icon-tixing.png" style="width: 48rpx;height: 48rpx;" @click="jump" />

				</view>
			</template>
			<view class="contractManagement-main">
				<view class="contractManagement-main-tabs">
					<tn-subsection v-model="subsectionValue" mode="button">
						<tn-subsection-item title="全部" />
						<tn-subsection-item title="待签约" />
						<tn-subsection-item title="待审核" />
						<tn-subsection-item title="已签约" />
					</tn-subsection>
				</view>
				<view class="contractManagement-main-list">
					<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
						style="height: 100%;overflow: auto;" :refresher-triggered="refresherTriggered"
						@scrolltolower="scrolltolower" :lower-threshold="20" refresher-background="transparent">
						<view style=" padding-bottom: 32rpx; box-sizing: border-box;">
							<TransitionGroup name="list" tag="view">
								<view class="list" v-for="item in orderList" :key="item.id" @click="toDetail(item)">
									<view class="list-title">
										<view>合同标题</view>
										<view>待签约</view>
									</view>
									<view class="list-text">合同编号：HT20240102001</view>
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
			<tn-popup v-model="showPopup" width="552">
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
			</tn-popup>
			<tn-modal ref="modalRef" />
		</page-frame>
	</view>
</template>
<script setup name='contractManagement'>
import { ref, reactive, } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {

})

const subsectionValue = ref(0)
const orderList = ref([{ id: 1 }])
const showPopup = ref(false)


//刷新/加载
const refresherTriggered = ref(false)
const state = ref("finished")
const refresherrefresh = (params) => {
	refresherTriggered.value = true;
	state.value = "loading"
	setTimeout(() => {
		refresherTriggered.value = false;
		state.value = "finished"
	}, 2000);
}

const scrolltolower = () => {
	if (state.value == "error") return
	state.value = "loading"
}

const jump = function () {
	uni.navigateTo({
		url: '/subpackageA/auditRejected/auditRejected'
	})
}
const toDetail = function () {
	uni.navigateTo({
		url: '/subpackageA/contractsManagement/contractsManagement'
	})
}
</script>
<style lang='scss' scoped>
.contractManagement {
	width: 100%;

	.titlem {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		font-size: 32rpx;
		color: #14181A;
		line-height: 38rpx;

		view:nth-child(1) {
			margin-right: 42rpx;
		}
	}

	.contractManagement-main {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: 32rpx 32rpx 0;
		box-sizing: border-box;



		.contractManagement-main-tabs {
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

		.contractManagement-main-list {
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

				.list-title {
					display: flex;
					justify-content: space-between;
					margin-bottom: 26rpx;

					view:nth-child(1) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #14181A;
						line-height: 33rpx;
					}

					view:nth-child(2) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #FA573E;
						line-height: 33rpx;
					}
				}

				.list-text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #616466;
					line-height: 28rpx;
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