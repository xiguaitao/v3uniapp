<template>
	<view class='modifications'>
		<page-frame :title="tabs[currentTabIndex]?.text" :isRefresherEnabled="false" :isShowNodata="false">
			<component :is="publishedBooksMessage" @formData="formData" v-model="loading" :formDatas="dataData" />
		</page-frame>
	</view>
</template>
<script setup name='modifications'>
import { ref, computed, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { masterInfo, masterUpdate, memberInfo, memberUpdate, } from '../../request/api/team.js'
import ChannelManagement from '../addUser/components/channelManagement.vue'
import ConsumerShareholderManagement from '../addUser/components/consumerShareholderManagement.vue'
import ConsumerShareholders from '../addUser/components/consumerShareholders.vue'
import MasterManagement from '../addUser/components/masterManagement.vue'

const currentTabIndex = ref(0)
onLoad((item) => {
	if (item) {
		currentTabIndex.value = +item.type;
		getDataData.id = item.id;
		getData()
	}
})

const currentList = [
	ChannelManagement,
	ConsumerShareholderManagement,
	MasterManagement,
	ConsumerShareholders,
]
const publishedBooksMessage = computed(() => {
	return currentList[currentTabIndex.value]
})

// 请求
const currentInfoReq = [
	"",
	"",
	masterInfo,
	memberInfo,
]
const currentUpdateReq = [
	"",
	"",
	masterUpdate,
	memberUpdate,
]
const getInfo = (calback, data) => {
	return calback(data)
}

// 获取数据
const getDataData = reactive({ id: "" })
const dataData = ref({})
const getData = () => {
	if (!currentInfoReq[currentTabIndex.value]) return
	getInfo(currentInfoReq[currentTabIndex.value], getDataData).then(res => {
		if (res.code == 0) {
			dataData.value = res.data
		}
	})
}


// 当前选中的标签索引
const tabs = [
	{ text: '渠道修改', id: 0 },
	{ text: '会员修改', id: 1 },
	{ text: '师傅修改', id: 2 },
	{ text: '成员修改', id: 3 }
]
// 修改用户
const loading = ref(false)
const formData = data => {
	if (!currentUpdateReq[currentTabIndex.value]) return
	loading.value = true
	if (data.cityId == "") {
		loading.value = false
		uni.showToast({
			title: '当前地区不可用',
			icon: 'none'
		})
		return
	}
	currentUpdateReq[currentTabIndex.value](data).then(res => {
		if (res.code == 0) {
			setTimeout(() => {
				loading.value = false
			}, 1000);
			uni.showToast({
				title: '修改成功',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				})
			}, 1000);
		} else {
			loading.value = false
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})
		}
	})
}

</script>
<style lang='scss' scoped></style>