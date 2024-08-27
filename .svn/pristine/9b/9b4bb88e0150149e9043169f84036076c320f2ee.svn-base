<template>
	<view class='personalCenter'>
		<view class="header">
			<image src="../../static/img/bgImg.png" style="height: 532rpx;" model="widthFix" />
			<view class="header-content">
				<!-- <view class="toggle">
					<image style="width: 48rpx;height: 48rpx;" src="../../static/img/icon-qiehuan.png" />
					<view>切换账号</view>
					<view class="toggle-icon">
						<wd-popover use-content-slot>
							<template #content>
								<view class="pop-content">这是一段自定义样式的内容。</view>
							</template>
<wd-icon name="arrow-down" size="18px"></wd-icon>
</wd-popover>
</view>
</view> -->

			</view>
		</view>
		<view class="userInfo">
			<view>{{ userInfoData.name }}</view>
			<view>{{ userInfoData.mobile }}</view>
			<view style="margin-top: 16rpx;">
				<!-- <tn-tag bg-color="#E1FAF2" text-color="#04CC89" font-size="18">{{ typeList[userInfoData.type]
					}}</tn-tag> -->
				<!-- <tn-tag @click="jump" bg-color="#E1F2FA" text-color="#1DABF2" font-size="18"
					:custom-style="{ 'margin-left': '16rpx' }">
					<label style="margin-right: 6rpx;">去认证</label>
					<tn-icon name="right" type="primary" size="18" :custom-style="{ height: '10rpx' }"
						color="#1DABF2" />
				</tn-tag> -->

			</view>
		</view>
		<view class="content">
			<view class="cells">
				<wd-cell-group>
					<wd-cell to="/subpackageA/myEquipment/myEquipment" :is-link="true">
						<template #icon>
							<image src="../../static/img/icon-1.png"
								style="width: 48rpx;height: 48rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">设备管理</view>
						</template>
					</wd-cell>
					<wd-cell to="/subpackageA/myEarnings/myEarnings" :is-link="true">
						<template #icon>
							<image src="../../static/img/icon-2.png"
								style="width: 48rpx;height: 48rpx;margin-top: 12rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">我的收益</view>
						</template>
					</wd-cell>
					<!-- <wd-cell to="/subpackageA/contractManagement/contractManagement" :is-link="true">
						<template #icon>
							<image src="../../static/img/icon-3.png"
								style="width: 48rpx;height: 48rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">合同管理</view>
						</template>
					</wd-cell> -->
					<wd-cell to="/subpackageA/myFilter/myFilter" :is-link="true">
						<template #icon>
							<image src="../../static/img/filter.png"
								style="width: 48rpx;height: 48rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">滤芯管理</view>
						</template>
					</wd-cell>
					<wd-cell :is-link="true" to="/subpackageA/customerServiceCenter/customerServiceCenter">
						<template #icon>
							<image src="../../static/img/icon-4.png"
								style="width: 48rpx;height: 48rpx;margin-top: 12rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">客服中心</view>
						</template>
					</wd-cell>
					<wd-cell :is-link="true" to="/subpackageA/modifyPassword/modifyPassword">
						<template #icon>
							<image src="../../static/img/icon-5.png"
								style="width: 48rpx;height: 48rpx;margin-top: 12rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">修改密码</view>
						</template>
					</wd-cell>
					<wd-cell :is-link="true" @click="abort">
						<template #icon>
							<image src="../../static/img/icon-6.png"
								style="width: 48rpx;height: 48rpx;margin-top: 12rpx;margin-right: 16rpx;" />
						</template>
						<template #title>
							<view style="display: flex;align-items: center;">退出登录</view>
						</template>
					</wd-cell>
				</wd-cell-group>
			</view>
			<tn-modal ref="modalRef" />
		</view>
		<wd-gap safe-area-bottom height="0"></wd-gap>
	</view>
</template>
<script setup name='personalCenter'>
import { userInfo } from '../../request/api/index.js'
import { ref, } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'
onShow(() => {
	getUserInfo()
})
// accreditation/accreditation
// const show = ref(false)
// const selectValue = ref(false)
// setTimeout(() => {
// 	show.value = true;
// }, 2000);

const typeList = ["发起人", "服务股东", "推广股东", "普通员工"]


const userInfoData = ref({})
const getUserInfo = function () {
	userInfo().then(res => {
		userInfoData.value = res.data
	})
}



const modalRef = ref()
const abort = function () {

	modalRef.value?.showModal({
		title: '操作提示',
		content: '是否退出？',
		showCancel: true,
		confirm: () => {
			uni.clearStorageSync()
			uni.navigateTo({
				url: "/pages/login/login",
			})
		},
		cancelStyle: {
			color: 'tn-gray-dark',
		},
		confirmStyle: {
			color: 'tn-red',
		},
	})
}
const jump = function (url) {
	uni.navigateTo({
		url: '/subpackageA/accreditation/accreditation',
	})
}
</script>
<style lang='scss' scoped>
.personalCenter {
	display: flex;
	flex-direction: column;

	.header {
		height: 532rpx;
		position: relative;

		.header-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 32rpx;
			box-sizing: border-box;

			.toggle {
				display: flex;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #14181A;
				line-height: 33rpx;
				align-items: center;

				.toggle-icon {
					position: relative;

					.toggle-box {
						position: absolute;
						right: 0;
						bottom: 0;
						transform: translate(70%, 110%);
						background: rgba(0, 0, 0, 0.5);
						border-radius: 12rpx;
						padding: 32rpx;
						box-sizing: border-box;

						&::after {
							content: "";
							display: block;
							border: 20rpx solid transparent;
							border-right-color: rgba(0, 0, 0, 0.5);
							position: absolute;
							left: 21%;
							top: 0;
							transform: translateY(-100%) rotate(90deg);
						}

						.toggle-box-item {
							display: flex;
							align-items: center;



							image {
								width: 72rpx;
								height: 72rpx;
								margin-right: 24rpx;
								border-radius: 50%;
							}

							.info {
								flex-shrink: 0;
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 28rpx;
								color: #FFFFFF;
								line-height: 33rpx;
								margin-right: 56rpx;

								view:nth-child(2) {
									font-size: 20rpx;
									color: rgba(255, 255, 255, 0.7);
								}
							}
						}
					}
				}

				>view {
					margin-right: 8rpx;
				}
			}
		}

		image {
			width: 100%;
		}
	}

	.userInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		view:nth-child(1) {
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #14181A;
			line-height: 38rpx;
		}

		view:nth-child(2) {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #2E3133;
			line-height: 28rpx;
		}
	}

	.content {
		flex: 1;
		padding: 32rpx;
		box-sizing: border-box;
		overflow: auto;
		margin-top: 16rpx;

		.cells {
			border: 2rpx solid #E1E4E6;
			border-radius: 8rpx;
			box-sizing: border-box;
			overflow: auto;

			image {
				margin-top: -3rpx !important;
			}
		}

		::v-deep .wd-cell__title {
			display: flex;
		}

		::v-deep .wd-cell__wrapper {
			align-items: center;
		}
	}
}
</style>