<template>
	<view class='aftermarket'>
		<page-frame title="售后" :isRefresherEnabled="false" :isShowNodata="false" :isLeft="false"
			:safeAreaInsetBut="false">
			<view class="aftermarket-main">
				<view class="aftermarket-main-tabs">
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
						</view>
					</view>
				</view>
				<view class="aftermarket-main-tabs-2">
					<view class="tab" v-for="item in typeLists" :key="item.id" @click="tabChange2(item)"
						:class="{ 'settle-upon ': tabIndex2 === item.id }">
						<view class="tab-text">
							<label>{{ item.name }}</label>
						</view>
					</view>
				</view>
				<view class="aftermarket-main-list">
					<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
						style="height: 100%;overflow: auto;" :refresher-triggered="refresherTriggered"
						@scrolltolower="scrolltolower" :lower-threshold="20" refresher-background="transparent">
						<view style=" padding-bottom: 32rpx; box-sizing: border-box;height: 100%;">
							<TransitionGroup name="list" tag="view">
								<view style="width: 100%;" v-for="item in orderList" :key="item.id"
									@click="toDetail(item)">
									<list-x :status="item.status" :statusList="statusList" :statusColor="statusColor"
										:code="item.code">
										<view class="list">
											<view class="list-name">售后类型</view>
											<view class="list-content">{{ typeList[item.type - 1] }}</view>
										</view>
										<view class="list">
											<view class="list-name">会员名称</view>
											<view class="list-content">{{ item.customerName }}</view>
										</view>
										<view class="list">
											<view class="list-name">手机号码</view>
											<view class="list-content">{{ item.customerMobile }}</view>
										</view>
										<view class="list">
											<view class="list-name">售后人员</view>
											<view class="list-content">{{ item.engineerName }}</view>
										</view>
										<view class="list">
											<view class="list-name">售后电话</view>
											<view class="list-content">{{ item.engineerMobile }}</view>
										</view>
										<view class="list">
											<view class="list-name">上门地址</view>
											<view class="list-content">
												{{ item.provinceName }}{{ item.cityName }}{{ item.areaName }}{{
													item.address }}
											</view>
										</view>
										<view class="list">
											<view class="list-name">创建时间</view>
											<view class="list-content">{{ item.createTime }}</view>
										</view>


										<view class="list" v-if="[3].includes(item.status)">
											<view class="list-name">拒绝原因</view>
											<view class="list-content">{{ item.refuseReason }}</view>
										</view>
										<view style="display: flex;justify-content: flex-end;">
											<view class="button-fw" v-if="[1, 3].includes(item.status)">
												<view @click.stop="setAccept(item)">去派单</view>
											</view>
											<view class="button-wc" v-if="[1].includes(item.status)">
												<view @click.stop="setFinish(item)">确认完成</view>
											</view>
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
			<tn-popup v-model="showPopup" width="552">
				<view class="popup-main">
					<!-- <view class="popup-main-title">拒绝原因</view> -->
					<view class="popup-main-content">
						<tn-form ref="formRef" :model="formData" :rules="formRules" :hide-required-asterisk="true"
							label-width="150rpx" label-position="left">
							<tn-form-item label="师傅姓名" prop="engineerId">
								<view class='inputPicker-x'>

									<tn-input v-model="formData.engineerName" placeholder="请选择"
										:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
									<view class="input-zz" @click.stop="open"></view>
								</view>
							</tn-form-item>
							<tn-form-item label="金额" prop="amount">
								<tn-input type="digit" placeholder="请输入金额" :maxlength="11" v-model="formData.amount"
									:custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }">
									<template #prefix>￥</template>
								</tn-input>
							</tn-form-item>
						</tn-form>
					</view>
					<view class="popup-main-btn">
						<view @click="cancel">取消</view>
						<view @click="reject">确定</view>
					</view>
				</view>
			</tn-popup>
			<tn-modal ref="modalRef" />
			<tn-picker  v-model:open="openPicker" :data="engineerSelectListData"
				@confirm="pickerConfirm" label-key="name" value-key="id" />
		</page-frame>
	</view>
</template>
<script setup name='aftermarket'>
import { aftermarket, engineerSelectList, dispatch, online } from '../../request/api/home.js'
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
	getListData.page = 1;
	getlist()
	getEngineerSelectList()
})



//info
const statusList = ['未开始', '待接单', '已拒绝', '接单', '服务中', '已完成', '评价']
const statusColor = ['#1DABF2', '#1DABF2', '#FA573E', '#4981F2', '#4981F2', '#04CC89', '#04CC89']
const typeList = ref(["设备安装", "故障报修", "水机回收", "其他"])
const typeLists = ref([{ id: 0, name: "设备安装" }, { id: 1, name: "故障报修" }, { id: 2, name: "水机回收" }, { id: 3, name: "其他" }])
const tabList = ref([
	{
		id: 0,
		name: '全部',
		value: 0
	},
	{
		id: 1,
		name: '待接单',
		value: 2
	},
	{
		id: 2,
		name: '服务中',
		value: 5
	},
	{
		id: 3,
		name: '已拒绝',
		value: 3
	},
	{
		id: 4,
		name: '已完成',
		value: 6
	}
])





//切换
const tabIndex = ref(0)
const tabChange = (item) => {
	if (tabIndex.value == item.id) return;
	tabIndex.value = item.id
	if (item.value == 0) {
		delete getListData.status
	} else {
		getListData.status = item.value
	}
	getlist()
}
const tabIndex2 = ref(0)
const tabChange2 = (item) => {
	if (tabIndex2.value == item.id) return;
	tabIndex2.value = item.id
	getListData.type = item.id + 1
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
const getListData = reactive({ page: 1, limit: 10, type: 1 })
const orderList = ref([])
async function getlist(states = true) {
	state.value = "loading"
	aftermarket(getListData).then(res => {
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



// 派单
const formRef = ref()
const formData = reactive({
	id: '',
	engineerId: '',
	amount: '',
})
const formRules = {
	engineerId: [
		{ required: true, message: '请选择工程师', trigger: ['change', 'blur'] }
	],
	amount: [
		{ required: true, message: '请输入金额', trigger: ['change', 'blur'] },
	],
}

const showPopup = ref(false)
const setAccept = function ({ id }) {
	formData.id = id
	showPopup.value = true;
}
const cancel = function () {
	formData.id = ''
	formData.engineerId = ''
	formData.amount = ''
	formData.engineerName = ""
	showPopup.value = false;
}
const reject = function () {
	formRef.value?.validate((valid) => {
		if (valid) {
			dispatch(formData).then(res => {
				if (res.code == 0) {
					showPopup.value = false;
					uni.showToast({
						title: "派单成功",
						icon: "none"
					})
					getlist()
					formData.id = ''
					formData.engineerId = ''
					formData.amount = ''
					formData.engineerName = ""
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			})
		} else {
			uni.showToast({
				title: '校验失败',
				icon: 'none',
			})
		}
	})

}
//确认完成
const modalRef = ref()
const setFinish = function ({ id }) {
	modalRef.value?.showModal({
		title: '确认提示',
		content: '是否确认完成？',
		showCancel: true,
		cancel: () => {
		},
		confirm: () => {
			online({ id }).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: "确认完成成功",
						icon: "none"
					})
					getlist()
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			})
		},
	})
}

//工程师
const engineerSelectListData = ref([])
const getEngineerSelectList = () => {
	engineerSelectList().then(res => {
		if (res.code == 0) {
			engineerSelectListData.value = res.data;
		}
	})
}

const pickerConfirm = (val) => {
	engineerSelectListData.value.find(item => {
		if (item.id == val) {
			formData.engineerId = item.id
			formData.engineerName = item.name
		}
	})
}
const openPicker = ref(false);
const open = () => {
	openPicker.value = true
}

const toDetail = ({ status, id }) => {
	if (status == 2) {

	}
	uni.navigateTo({
		url: "/subpackageA/particulars/particulars?id=" + id + '&type=' + status,
	})

}

</script>
<style lang='scss' scoped>
.aftermarket {
	height: 100%;

	.aftermarket-main {
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: 32rpx 32rpx 0;
		box-sizing: border-box;

		.aftermarket-main-tabs {
			display: grid;
			grid-template-columns: repeat(v-bind('tabList.length'), 1fr);
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

		.aftermarket-main-tabs-2 {
			display: grid;
			grid-template-columns: repeat(v-bind('typeLists.length'), auto);
			margin-bottom: 50rpx;



			.tab {
				display: flex;
				align-items: center;
				justify-content: center;


				.tab-text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #2E3133;
					line-height: 28rpx;
					background: #E1E4E6;
					border-radius: 4rpx;
					padding: 12rpx 32rpx;
					box-sizing: border-box;

					label {}
				}
			}

			.settle-upon {
				.tab-text {

					background: #1DABF2;

					label {
						color: #FFFFFF;
					}
				}
			}
		}

		.aftermarket-main-list {
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
				padding-left: 12rpx;
				order: 2;

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

			}

			.button-wc {
				display: flex;
				justify-content: flex-end;
				order: 1;

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

			.inputPicker-x {
				position: relative;

				.input-zz {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
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