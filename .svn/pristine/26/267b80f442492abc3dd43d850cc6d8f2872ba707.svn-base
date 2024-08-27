<template>
	<view class='userAgreement'>
		<page-frame title="用户协议" :isRefresherEnabled="false" :isShowNodata="false">
			<view class="userAgreement-main">
				<view v-html="agreementData"></view>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='userAgreement'>
import { agreement } from '../../request/api/home.js'
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const agreementData = ref("")
onShow(() => {
	agreement().then(res => {
		agreementData.value = res.data
	})
})


</script>
<style lang='scss' scoped>
.userAgreement {
	.userAgreement-main {
		padding: 32rpx;
		box-sizing: border-box;
	}
}
</style>