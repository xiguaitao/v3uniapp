<template>
	<view class='modifyPassword'>
		<page-frame title="修改密码" :isRefresherEnabled="false" :isShowNodata="false" background="#fff">
			<view class="mains">
				<wd-form ref="form" :model="model">
					<wd-cell-group border>
						<view class="imput">
							<wd-input :no-border="true" label-width="0" prop="passWord" show-password clearable
								v-model="model.passWord" placeholder="请输入新密码"
								:rules="[{ required: true, message: '请输入新密码', }]" />
						</view>
						<view class="imput">
							<wd-input :no-border="true" label-width="0" prop="rePassWord" show-password clearable
								v-model="model.rePassWord" placeholder="请输入新密码"
								:rules="[{ required: true, message: '请输入新密码', validator: validator }]" />
						</view>
					</wd-cell-group>
					<view class="footer">
						<tn-button :loading="loading" @click="handleSubmit"
							:custom-style="{ width: '100%', height: '88rpx' }" bg-color="#1DABF2" text-color="#fff">{{
								loading
									? "提交中..." : "提交" }}</tn-button>
					</view>
				</wd-form>
			</view>
		</page-frame>
	</view>
</template>
<script setup name='modifyPassword'>
import { userReset } from '../../request/api/index.js'
import { ref, reactive } from 'vue'
import { onHide } from '@dcloudio/uni-app'
onHide(() => {
	loading.value = false
})
const model = reactive({
	passWord: '',
	rePassWord: ''
})
const form = ref()
const loading = ref(false)
const handleSubmit = function () {
	form.value
		.validate()
		.then(({ valid, errors }) => {
			if (valid) {
				loading.value = true
				userReset(model).then((res) => {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				}).catch((error) => {
					setTimeout(() => {
						loading.value = false
					}, 2000)
				})
			}
		})

}

const validator = function (val) {
	if (model.passWord != model.rePassWord) {
		return Promise.reject('两次密码不一致')
	} else {
		return true
	}
}
</script>
<style lang='scss' scoped>
.modifyPassword {
	.mains {
		/* background: #fff; */
		height: 100%;
		padding: 300rpx 54rpx 0;
		box-sizing: border-box;
		overflow: auto;


		.imput {
			border: 2rpx solid #CCECF9;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 32rpx;
			padding: 12rpx 32rpx;
			box-sizing: border-box;
		}
	}
}
</style>