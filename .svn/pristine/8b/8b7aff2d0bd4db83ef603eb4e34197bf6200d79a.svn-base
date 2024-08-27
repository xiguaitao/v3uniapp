<template>
	<view class="header">
		<view class="bg">
			<image src="../../static/img/bg2@2x.png" />
		</view>
		<view class="navbar">
			<wd-navbar :title="title" custom-style="background-color: transparent !important;color:#fff;"
				@click-left="handleClickLeft"  @click-right="handleClickRight">
				<template #left>
					<wd-icon name="thin-arrow-left" size="30rpx"></wd-icon>
				</template>
				<template #title>
					<view style="color: #FFF;font-weight: 500; font-size: 32rpx;">{{ title }}</view>
				</template>
				<template #right>
					<slot></slot>
				</template>
			</wd-navbar>
		</view>
	</view>
</template>

<script setup name="tito">
import { ref, defineEmits, defineProps } from 'vue'
const props = defineProps({
	title: {
		type: String,
		default: "标题"
	},
})
const emit = defineEmits(['handleClickRight'])
const handleClickLeft = function () {
	uni.navigateBack();
};
const handleClickRight = function() {
		emit('handleClickRight')
	}
</script>

<style lang="scss">
.header {
	height: 88rpx;
	position: relative;

	::v-deep .wd-navbar.is-border::after {
		background-color: transparent;
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
</style>