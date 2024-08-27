<template>
	<view class='histogram'>
		<view class="histogram-item" v-for="item in list" :key="item.id" :class="{ choose: item.id == 4 }">
			<view class="histogram-item-up">
				<!-- <tn-bubble-box :options="bubbleOptions"> -->
				<view class="histogram-item-up-number">
					<label>￥</label>
					<TnCountTo start="0" :end="item.number" :decimals="2"
						:text-color="item.id == 4 ? '#1DABF2' : '#AFE1FA'" font-size="28rpx" :duration="700" />
				</view>
				<view class="histogram-item-up-text" :style="{ height: item.height }"></view>
			</view>
			<view class="histogram-item-down histogram-item-down-left-borde">
				<view class="months">{{ item.months }}月</view>
				<view class="years">{{ item.years }}年</view>
			</view>
		</view>
	</view>
</template>
<script setup name='histogram'>
import { ref, defineProps, createApp, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
})
onLoad(() => {

})
watch(
	() => props.list,
	(newValue, oldValue) => {
		let time = setTimeout(() => {
			clearTimeout(time)
			lists.value = newValue
		}, 300);
	},
	{
		deep: true,
		immediate: true,
	}
)
const app = createApp({});
import TnCountTo from '@/uni_modules/tuniaoui-vue3/components/count-to/src/count-to.vue'
import TnBubbleBox from '@/uni_modules/tuniaoui-vue3/components/bubble-box/src/bubble-box.vue'
app.component({
	TnCountTo,
	TnBubbleBox,
});

const bubbleOptions = ref([
	{ text: '收藏', icon: 'star-fill' },
	{ text: '分享', icon: 'share-triangle' },
])


const lists = ref([
	{
		id: 1,
		number: "0",
		months: "00",
		years: "0000",
		height: '0%',
	},
	{
		id: 2,
		number: "0",
		months: "00",
		years: "0000",
		height: '0%',
	},
	{
		id: 3,
		number: "0",
		months: "00",
		years: "0000",
		height: '0%',
	},
	{
		id: 4,
		number: "0",
		months: "00",
		years: "0000",
		height: '0%',
	},
])
</script>
<style lang='scss' scoped>
.histogram {
	display: flex;
	overflow: auto;

	.histogram-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;


		.histogram-item-up {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			flex-direction: column;
			align-items: center;
			border-bottom: 2rpx solid #AFE1FA;
			height: 400rpx;

			.histogram-item-up-number {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 28rpx;
				color: #AFE1FA;
				line-height: 33rpx;
				margin-bottom: 16rpx;
				display: flex;
			}

			.histogram-item-up-text {
				width: 40rpx;
				/* height: 100%; */
				background: #AFE1FA;
				border-radius: 8rpx 8rpx 0 0;
				transition: all 0.5s;
			}
		}

		.histogram-item-down {
			width: 100%;
			padding-top: 24rpx;
			box-sizing: border-box;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #616466;
			line-height: 28rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;


			.months {
				margin-bottom: 18rpx;
			}

			.years {}
		}

		.histogram-item-down-left-border {
			border-right: 2rpx solid #AFE1FA;
		}
	}

	.choose {

		.histogram-item-up {
			.histogram-item-up-number {
				color: #1DABF2;
			}

			.histogram-item-up-text {
				background: #1DABF2;
			}
		}

		.histogram-item-down {
			color: #14181A;
		}
	}
}
</style>