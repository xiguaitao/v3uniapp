<template>
	<view class='inputPicker-x'>

		<tn-input v-model="inputValue" placeholder="请选择" :custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
		<view class="input-zz" @click.stop="open"></view>
		<tn-picker v-model="pickerValue" v-model:open="openPicker" :data="pickerData" @confirm="pickerConfirm"
			@cancel="pickerCancel" :label-key="labelKey" :value-key="valueKey" />
	</view>
</template>
<script setup name='inputPicker-x'>
import { ref, defineEmits } from 'vue';

const props = defineProps({
	pickerData: {
		type: Array,
		default: () => [],
	},
	labelKey: {
		type: String,
		default: "",
	},
	valueKey: {
		type: String,
		default: "",
	},
})
const emit = defineEmits(['confirm',]);
const value = defineModel({ type: String, default: "" });
const valueName = defineModel("valueName", { type: String, default: "" });
const openPicker = defineModel("openPicker", { type: Boolean, default: false });

const pickerValue = ref();
const inputValue = ref("");

const open = () => {
	openPicker.value = true
}
const pickerCancel = () => {
	emit("pickerCancel")
}
const pickerConfirm = (val) => {
	props.pickerData.find(item => {
		if (item[props.valueKey] == val) {
			inputValue.value = item[props.labelKey]
			valueName.value = item[props.labelKey]
			value.value = item[props.valueKey]
			emit("confirm", item)
		}
	})
}
</script>
<style lang='scss' scoped>
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
</style>