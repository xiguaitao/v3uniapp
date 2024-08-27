<template>
	<view class='computingButton-x' @click="click">
		<wd-button :disabled="disabledCode">{{ codeText }}</wd-button>
	</view>
</template>
<script setup name='computingButton-x'>
import { ref, defineProps, watch, defineEmits , defineExpose} from 'vue'
const props = defineProps({
	disabled: {
		type: Boolean,
		default: false
	},
	time: {
		type: Number,
		default: 60000
	}
})
const emit = defineEmits(['close','click'])
watch(() => props.disabled, (newVal) => {
	disabledCode.value = newVal
})
const codeText = ref("获取验证码")
const disabledCode = ref(false)
const getCode = function () {
	let num = 60
	codeText.value = `重新获取(${num})`
	disabledCode.value = true
	let time = setInterval(() => {
		num--
		codeText.value = `重新获取(${num})`
	}, 1000);
	let time1 = setTimeout(() => {
		clearTimeout(time1)
		clearInterval(time)
		disabledCode.value = false
		codeText.value = "重新获取"
		emit('close')
	}, props.time);
}
const click = function () {
	emit('click')
}
defineExpose({
	getCode
});

</script>
<style lang='scss' scoped></style>