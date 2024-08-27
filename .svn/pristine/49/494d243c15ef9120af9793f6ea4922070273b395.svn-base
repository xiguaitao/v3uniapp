<template>
	<view class='image-upload-x'>
		<tn-image-upload v-model="imageList" :limit="1" :action="actionUrl" :header="header" name="uploadImg"
			show-upload-progress />
	</view>
</template>
<script setup name='image-upload-x'>
import base_url from '../../request/address.js'
import { reactive, ref, defineProps, watch } from 'vue'

const props = defineProps({
	limit: {
		type: Number,
		default: 3
	},
})
const imageUrlList = defineModel({ type: String, default: "" })

const imageList = ref([])
const header = ref({
	'token': uni.getStorageSync('token') || '',
})
const actionUrl = base_url + '/fileUpload/save'

watch(() => imageList.value, (newVal) => {
	imageUrlList.value = newVal.join(',')
})
watch(() => imageUrlList.value, (newVal) => {
	if (newVal) {
		imageList.value = newVal.split(',').map(item => {
			return item
		})
	}
})
</script>
<style lang='scss' scoped></style>