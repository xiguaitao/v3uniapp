<!-- 消费股东管理 -->
<template>
    <view class='consumerShareholderManagement'>
        <view class="consumerShareholderManagement-content">
            <tn-form ref="formRef" :model="formData" :rules="formRules" :hide-required-asterisk="true"
                label-width="200rpx" label-position="left">
                <tn-form-item label="姓名" prop="name">
                    <tn-input placeholder="请输入姓名" v-model="formData.name"
                        :custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
                </tn-form-item>
                <tn-form-item label="手机号码" prop="mobile">
                    <tn-input placeholder="请输入手机号码" :maxlength="11" v-model="formData.mobile"
                        :custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
                </tn-form-item>
                <tn-form-item label="推荐人电话" prop="refereeMobile">
                    <tn-input placeholder="请输入推荐人电话" v-model="formData.refereeMobile"
                        :custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
                </tn-form-item>
                <tn-form-item label="地址" prop="provinceId">
                    <picker-x v-model:provinceId="formData.provinceId" v-model:cityId="formData.cityId"
                        v-model:areaId="formData.areaId"></picker-x>
                </tn-form-item>
                <tn-form-item label="详情地址" prop="address">
                    <tn-input placeholder="请输入详情地址" v-model="formData.address"
                        :custom-style="{ backgroundColor: 'RGBA(240, 243, 245, 1)' }" />
                </tn-form-item>

            </tn-form>
        </view>
        <view class="consumerShareholderManagement-button">
            <view>
                <tn-button text-color="#fff" bg-color="RGBA(29, 171, 242, 1)" @click="submitForm" width="100%"
                    height="88rpx" :loading="loading"> {{loading?'提交中...':'提交'}} </tn-button>
            </view>
            <wd-gap safe-area-bottom height="0"></wd-gap>
        </view>
    </view>
</template>
<script setup name='consumerShareholderManagement'>
import { reactive, ref, defineEmits } from 'vue'

const loading = defineModel({ type: Boolean, default: false })
const emit = defineEmits(['formData'])

// 表单数据
const formRef = ref()
const formData = reactive({
    name: '',
    mobile: '',
    refereeMobile: '',
    provinceId: '',
    cityId: '',
    areaId: '',
    address: '',
})

// 规则
const formRules = {
    queryName: [
        { required: true, message: '请输入姓名', trigger: ['change', 'blur'] },
    ],
    queryMobile: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        { required: true, pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '请输入正确的手机号码' }
    ],
    provinceId: [
        { required: true, message: '请输入地址', trigger: ['change', 'blur'] },
    ],
    address: [
        { required: true, message: '请输入详情地址', trigger: ['change', 'blur'] },
    ],
}

/* 提交表单 */
const submitForm = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            emit('formData', formData)
        } else {
            uni.showToast({
                title: '校验失败',
                icon: 'none',
            })
        }
    })
}
</script>
<style lang='scss' scoped>
::v-deep .wd-picker__cell {
    background: #F0F3F5;
    border-radius: 16rpx;
    border: 2rpx solid #E6E6E6;
    padding: 12rpx 16rpx;
}

::v-deep .wd-picker__placeholder {
    color: #9C9C9C;
}

.consumerShareholderManagement {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .consumerShareholderManagement-content {
        margin: 32rpx;
        padding: 32rpx;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
        border-radius: 8rpx;

    }

    .consumerShareholderManagement-button {
        background: #fff;

        >view {
            padding: 24rpx 32rpx;
            box-sizing: border-box;
        }
    }
}
</style>