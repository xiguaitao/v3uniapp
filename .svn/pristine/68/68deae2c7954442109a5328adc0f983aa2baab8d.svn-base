<template>
	<view class='picker-x'>
		<wd-picker :columns="columns" v-model="value" :loading="loading" :column-change="onChangeDistrict"
			:display-format="displayFormat" label-key="name" value-key="id" @open="open" />
	</view>
</template>
<script setup name='picker-x'>
import { regionList } from '../../request/api/home.js'
import { ref, reactive, defineProps, defineEmits, watch, nextTick } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { isFunction } from '../../uni_modules/wot-design-uni/components/common/util';
onShow(() => {

})


const provinceId = defineModel("provinceId", { type: String, default: '0' });
const cityId = defineModel("cityId", { type: String, default: '1' });
const areaId = defineModel("areaId", { type: String, default: '2' });

const props = defineProps({
	retracement: {
		type: Boolean,
		default: false
	}
})


const emit = defineEmits(["pickerData"])
const value = ref([])
const columns = reactive([[], [], []])
const onChangeDistrict = (pickerView, value, columnIndex, resolve) => {
	loading.value = true
	const { id: parentId, level } = value[columnIndex];
	getRegionLists({ parentId, level: level + 1 }, 3, (data, params) => {
		if (data.length > 0) {
			pickerView.setColumnData(params.level - 1, data)
		} else {
			pickerView.setColumnData(params.level, [{ id: '', name: '' }])
			pickerView.setColumnData(params.level - 1, [{ id: '', name: '' }])
		}
	});
}


const displayFormat = (items) => {
	if (items.every(element => element !== undefined)) {
		let data = items
			.map((item) => {
				return item.name;
			})
			.join('');
		provinceId.value = items[0].id;
		cityId.value = items[1].id;
		areaId.value = items[2].id;
		return data;
	} else {
		return '请选择';
	}
};

//回显
const retracementRegionList = async function () {
	const provinceIds = await regionList({ parentId: 0, level: 1 })
	const cityIds = await regionList({ parentId: provinceId.value, level: 2 })
	const areaIds = await regionList({ parentId: cityId.value, level: 3 })
	columns[0] = provinceIds.data;
	columns[1] = cityIds.data;
	columns[2] = areaIds.data;
	watchPpens.value = true
}



const getRegionLists = (params = { parentId: "0", level: 1 }, num = 2, callback) => {

	if (params.level > num) {
		loading.value = false
		return
	}
	regionList(params).then(res => {
		if (res.code == 0) {
			callback(res.data, params)
			if (res.data.length > 0) {
				getRegionLists({ parentId: res.data[0].id, level: res.data[0].level + 1 }, num, callback)
			} else {
				loading.value = false
			}
		}
	})

}

const opens = ref(false)
const loading = ref(false)
const open = function () {
	if (watchPpens.value) return
	loading.value = true
	opens.value = true
	getRegionLists({ parentId: '0', level: 1 }, 3, (data, params) => {
		columns[params.level - 1] = data;

	},)
}
const watchPpens = ref(false)
watch(() => provinceId.value, (newVal) => {
	if (provinceId.value && cityId.value && areaId.value && !watchPpens.value) {
		setTimeout(() => {
			retracementRegionList({ parentId: provinceId.value, level: 1 })
			value.value = [provinceId.value, cityId.value, areaId.value,]
		}, 500);
	}
}, {
	immediate: true
})

</script>
<style lang='scss' scoped></style>