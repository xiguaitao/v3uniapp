<template>
	<view class='signBoard'>
		<view class="content">
			<TnSignBoard ref="signBoardRef" />
			<view class="tn-mt tn-flex-center">
				<tn-button @click="saveSign">保存</tn-button>
				<tn-button @click="roateSaveSign">旋转保存</tn-button>
				<tn-button type="danger" @click="clearSign">重新签名</tn-button>
			</view>

		</view>
	</view>
</template>
<script setup name='signBoard'>
import { ref, createApp } from 'vue'
const app = createApp({});
import TnSignBoard from 'tnuiv3p-tn-sign-board/index.vue'
app.component({
	TnSignBoard,
});

const signBoardRef = ref()

// 图片地址
const imagePath = ref('')

// 保存签名
const saveSign = () => {
	signBoardRef.value?.save().then((res) => {
		imagePath.value = res
	}).catch((err) => {
		uni.showToast({
			title: '保存失败,没有笔迹',
			icon: 'none',
		})
	})
}

// 清空签名，重新签名
const clearSign = () => {
	signBoardRef.value?.clear()
}
</script>
<style lang='scss' scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30rpx;

	width: 100%;
	height: 460rpx;
	border: 1rpx solid var(--tn-color-gray-disabled);

	.demo {
		position: relative;
	}

	.save-wrapper {
		position: relative;
		border: 1rpx solid var(--tn-color-gray-disabled);
		height: 360rpx;
	}
}
</style>