<template>
	<view class='page-frame'>
		<view class="page-frame-bg" v-if="props.bg">
			<slot name="bg">
				<view class="bg">
					<image src="../../static/img/bg-header.png"></image>
				</view>
			</slot>
		</view>
		<view class="page-frame-content">
			<view class="header" v-if="props.header">
				<wd-navbar :title="title" custom-style="background-color: transparent !important;color:#000;"
					@click-left="handleClickLeft" safeAreaInsetTop @click-right="handleClickRight" :bordered="false">
					<template #left v-if="isLeft">
						<wd-icon name="thin-arrow-left" size="38rpx" :color="iconRightColor"></wd-icon>
					</template>
					<template #title>
						<slot name="titlem">
							<view v-if="!isDown" :style="{ color: titleColor, 'font-weight': 500 }">{{ title }}</view>
							<view v-if="isDown" class="header-title" @click="openDown">
								<view :style="{ color: titleColor, 'font-weight': 500 }">{{ title }}</view>
								<wd-icon v-if="!overlay" name="arrow-down" size="22px"></wd-icon>
								<wd-icon v-if="overlay" name="arrow-up" size="22px"></wd-icon>
							</view>
						</slot>
					</template>
					<template #right v-if="isRight">
						<slot name="right"><wd-icon name="add1" size="28px"></wd-icon></slot>
					</template>
				</wd-navbar>
			</view>
			<view class="content">
				<wd-transition :show="transitionShow" custom-class="transition" :name="props.transitionName"
					custom-style="height: 100%;">
					<scroll-view :scroll-y="true" :refresher-enabled="isRefresherEnabled"
						@refresherrefresh="refresherrefresh" style="height: 100%;overflow: auto;"
						:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower" :lower-threshold="20"
						refresher-background="transparent">

						<view class="main">
							<slot></slot>
							<wd-loadmore v-if="isData" custom-class="loadmore" :state="state" finished-text="加载更多"
								error-text="到底了" />
							<view v-else-if="isShowNodata" class="nodata">
								<view class="unoccupied">
									<tn-empty mode="data" />
								</view>
							</view>
						</view>
					</scroll-view>
				</wd-transition>

				<wd-overlay :show="overlay">
					<view class="conter" @click.stop>
						<wd-transition :show="overlay" name="slide-down" custom-class="transition-slide-down">
							<view class="dialog-box">
								<slot name="slideDown"></slot>
								<view class="dialog-footer">
									<wd-button type="primary" size="large" @click="handleSubmit" block>查询</wd-button>
								</view>
							</view>
						</wd-transition>
					</view>
				</wd-overlay>
			</view>
			<wd-gap safe-area-bottom height="0" v-if="safeAreaInsetBut"></wd-gap>
		</view>
	</view>
</template>
<script setup name='PageFrame'>
import { ref, defineEmits, defineProps, } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'

const props = defineProps({
	refresherTriggered: {
		type: Boolean,
		default: false
	},
	state: {
		type: String,
		default: "loading"
	},
	title: {
		type: String,
		default: "标题"
	},
	isData: {
		type: Boolean,
		default: false
	},
	isShowNodata: {
		type: Boolean,
		default: true
	},
	isRefresherEnabled: {
		type: Boolean,
		default: true
	},
	isRight: {
		type: Boolean,
		default: false
	},
	isLeft: {
		type: Boolean,
		default: true
	},
	isDown: {
		type: Boolean,
		default: false
	},
	background: {
		type: String,
		default: '#F2F2F2'
	},
	titleColor: {
		type: String,
		default: '#141819'
	},
	iconRightColor: {
		type: String,
		default: '#141819'
	},
	safeAreaInsetBut: {
		type: Boolean,
		default: false
	},
	bg: {
		type: Boolean,
		default: true
	},
	header: {
		type: Boolean,
		default: true
	},
	navbarColor: {
		type: String,
		default: ""
	},
	transitionName: {
		type: String,
		default: "fade-right"
	},
})



const emit = defineEmits(['refresherrefresh', 'scrolltolower', 'clickRight', 'handleSubmit'])
const handleClickRight = function () {
	emit('clickRight')
}
const refresherrefresh = function () {
	emit('refresherrefresh')
}
const scrolltolower = function () {
	emit('scrolltolower')
}
const handleSubmit = function () {
	emit('handleSubmit')
}
const handleClickLeft = function () {
	if (!props.isLeft) return
	uni.navigateBack()
}


const transitionShow = ref(true)
// const overlay = ref(false)
const overlay = defineModel('overlay', { type: Boolean, default: false })
// const isData = defineModel('isData', { type: Boolean, default: false })
const openDown = function () {
	overlay.value = true
}


</script>
<style lang='scss' scoped>
.page-frame {
	height: 100%;
	position: relative;
	background: v-bind('props.background');

	.page-frame-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		.bg {
			width: 100%;
			height: 176rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.bg-down {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
			}
		}
	}

	.page-frame-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		.header {
			/* height: 84rpx; */
			background: v-bind('props.navbarColor');

			::v-deep .wd-navbar.is-border::after {
				background: transparent;
			}

			.header-title {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-weight: 500;
			}
		}

		.content {
			flex: 1;
			overflow: auto;

			.main {
				display: flex;
				flex-direction: column;
				height: 100%;

				:deep(.loadmore) {
					margin: 0 !important;
					color: #979797;
					margin: 20px 0;
				}

				.nodata {
					display: grid;
					place-content: center;
					height: 100%;


				}
			}

			.conter {
				height: 100%;
				overflow: auto;

				.dialog-box {
					margin: 84rpx 26rpx 0;
					padding: 32rpx 24rpx 42rpx;
					box-sizing: border-box;
					background: #fff;
					border-radius: 12rpx;
					position: relative;
					box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);

					.dialog-footer {
						position: absolute;
						bottom: 0;
						transform: translate(-50%, 50%);
						left: 50%;
					}
				}
			}

			::v-deep .wd-overlay {
				background-color: rgba(0, 0, 0, 0.0);
			}

			:deep(.transition-slide-down) {}

		}
	}
}
</style>