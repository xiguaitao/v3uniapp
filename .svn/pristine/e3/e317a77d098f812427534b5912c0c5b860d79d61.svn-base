<template>
	<view class="box">
		<view class="header">
			<view class="bg">
				<image src="../../static/img/bg.png" />
			</view>
			<view class="navbar">
				<wd-navbar :title="title" custom-style="background-color: transparent !important;color:#fff;"
					@click-left="handleClickLeft" @click-right="handleClickRight">
					<template #left>
						<wd-icon name="thin-arrow-left" size="30rpx"></wd-icon>
					</template>
					<template #title>
						<view class="text-icon" @click="geticonShow">
							{{ title }}
							<wd-icon :class="overlay ?  'icon' : 'icons'" name="arrow-down" size="22px"
								color="#FFF"></wd-icon>
						</view>
					</template>
					<template #right>
						<slot></slot>
					</template>
				</wd-navbar>
			</view>
		</view>
		<view class="overlay-transition">
			<wd-overlay :show="overlay" @click="overlay = false">
				<wd-transition :show="overlay" name="slide-down">
					<view class="conter">
						<slot name="conter"></slot>
					</view>
				</wd-transition>
			</wd-overlay>
		</view>
	</view>
</template>

<script setup name="tito">
	import {
		ref,
		defineEmits,
		defineProps
	} from 'vue'
	const props = defineProps({
		title: {
			type: String,
			default: "标题"
		},
	})
	let overlay = ref(false)
	const emit = defineEmits(['handleClickRight'])
	const handleClickLeft = function() {
		uni.navigateBack();
	};
	const handleClickRight = function() {
		emit('handleClickRight')
	}
	const geticonShow = () => {
		overlay.value = !overlay.value
	}
</script>

<style lang="scss">
	.header {
		height: 300rpx;
		position: relative;

		::v-deep .wd-navbar.is-border::after {
			background-color: transparent;
		}

		.text-icon {
			color: #FFF;
			font-weight: 500;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				transition: 0.2s;
				transform: rotateZ(180deg);
			}

			.icons {
				transition: 0.2s;
				transform: rotateZ(0deg);
			}
		}

		.bg {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.navbar {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}

	.overlay-transition {
		.wd-overlay {
			background-color: transparent;
		}

		.conter {
			margin: 0 30rpx;
			margin-top: 88rpx;
			height: 700rpx;
			background-color: red;
			border-radius: 12rpx;
		}
	}
</style>