<template>
	<view class='customerServiceCenter'>
		<page-frame title="客服中心" :isRefresherEnabled="false" :isShowNodata="false" iconRightColor="#fff"
			titleColor="#fff">
			<template #bg>
				<view class="customerServiceCenter-bg">
				</view>
			</template>
			<view class="customerServiceCenter-main">
				<view class="customerServiceCenter-main-bg">
					<view class="customerServiceCenter-main-bg-title">
						<view>Hi~</view>
						<view>请问有什么可以帮您？</view>
					</view>
					<image src="../../static/img/kf.png" style="width: 280rpx;height: 280rpx;" />
				</view>
				<view class="kf">
					<view class="kf-title">联系客服</view>
					<view class="kf-main">
						<view class="list">
							<label>QQ客服</label>
							<label>{{ infoData.qq }}</label>
							<label @click="copy(infoData.qq, 'QQ号')">复制</label>
						</view>
						<view class="list">
							<label>微信客服</label>
							<label>{{ infoData.weixin }}</label>
							<label @click="copy(infoData.weixin, '微信号')">复制</label>
						</view>
						<view class="list">
							<label>客服电话</label>
							<label>{{ infoData.phone }}</label>
							<label @click="call">拨打</label>
						</view>
					</view>
					<view class="kf-gzh">
						<label>关注公众号</label>
						<label>{{ infoData.wechatPublicAccountName }}</label>
					</view>
				</view>
				<view class="cjwt">
					<view class="cjwt-title">猜你想问</view>
					<view class="cjwt-main">
						<wd-collapse v-model="value1" custom-class="customerServiceCenter-collapse">
							<wd-collapse-item :title="item.question" :name="item.id" v-for="item in faqListData"
								:key="item.id">
								<view v-html="item.answer"></view>
							</wd-collapse-item>
						</wd-collapse>
					</view>
				</view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='customerServiceCenter'>
import { info, faqList } from '../../request/api/index.js'
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
onLoad(() => {
	getInfo()
	getFaqList()
})


const infoData = ref({
	qq: "",
	weixin: "",
	phone: "",
	wechatPublicAccountName: "",
})
const getInfo = function () {
	info().then(res => {
		infoData.value = res.data
	})
}


const faqListData = ref([])
const value1 = ref([])
const getFaqList = function () {
	faqList({
		limit: 30,
		page: 1,
	}).then(res => {
		faqListData.value = res.data
	})
}

const copy = function (item, toast) {
	uni.setClipboardData({
		data: item,
		success: () => {
			uni.showToast({ icon: 'none', title: '已复制' + toast })
		}
	})
}

const call = function () {
	uni.makePhoneCall({
		phoneNumber: infoData.value.phone //仅为示例
	});
}


</script>
<style lang='scss' scoped>
.customerServiceCenter {
	.customerServiceCenter-bg {
		height: 488rpx;
		background: linear-gradient(135deg, #1DABF2 0%, #4981F2 100%);
	}

	.customerServiceCenter-main {
		padding: 32rpx;
		box-sizing: border-box;

		.customerServiceCenter-main-bg {
			display: flex;
			justify-content: space-between;

			.customerServiceCenter-main-bg-title {
				padding-top: 56rpx;
				box-sizing: border-box;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 42rpx;

				view:nth-child(1) {
					margin-bottom: 32rpx;
				}
			}

			image {}
		}

		.kf {
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 8rpx;
			box-shadow: 0 24rpx 20rpx rgba(0, 0, 0, 0.1);
			margin-top: -38rpx;
			margin-bottom: 48rpx;
			position: relative;

			.kf-title {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 32rpx;
				color: #14181A;
				line-height: 38rpx;
				margin-bottom: 24rpx;
			}

			.kf-main {
				.list {
					display: flex;

					label {
						margin-right: 32rpx;
						margin-bottom: 24rpx;
					}

					label:nth-child(1) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #616466;
						line-height: 33rpx;
					}

					label:nth-child(2) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #2E3133;
						line-height: 33rpx;
					}

					label:nth-child(3) {
						background: #F0F3F5;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #2E3133;
						line-height: 23rpx;
						padding: 4rpx 8rpx;
						border-radius: 999rpx;
					}
				}
			}

			.kf-gzh {
				label {
					margin-right: 32rpx;
				}

				label:nth-child(1) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #616466;
					line-height: 33rpx;
				}

				label:nth-child(2) {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1DABF2;
					line-height: 33rpx;
				}
			}
		}

		.cjwt {
			padding: 32rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 8rpx;
			box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, 0.1);
			margin-bottom: 48rpx;

			.cjwt-title {
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 32rpx;
				color: #14181A;
				line-height: 38rpx;
				margin-bottom: 24rpx;
			}

			.cjwt-main {
				::v-deep .wd-collapse-item__title {
					font-size: 28rpx;
				}

				::v-deep .wd-collapse-item__body {
					font-size: 20rpx;
				}
			}
		}
	}
}
</style>