# 图鸟UI vue3 uniapp 插件 - 签名板

![TuniaoUI vue3 uniapp](https://resource.tuniaokj.com/images/vue3/market/vue3-banner-min.jpg 'TuniaoUI vue3 uniapp')

[Tuniao UI vue3官方仓库](https://github.com/tuniaoTech/tuniaoui-rc-vue3-uniapp)

该组件一般用于让用户填写签名

## 组件安装

```bash
npm i tnuiv3p-tn-sign-board
```

## 组件位置

```bash
tnuiv3p-tn-sign-board/index.vue
```

## 平台差异说明

| App(vue) | H5  | 微信小程序 | 支付宝小程序 |  ...   |
| :------: | :-: | :--------: | :----------: | :----: |
|    √     |  √  |     √      |      √       | 适配中 |

## 基础使用

在一个设置了宽高的容器中使用`TnSignBoard`组件

调用组件的`save`方法可以获取到签名的临时地址（在h5中获取到的是base64的数据），`save`方法返回一个`Promise`对象，可以使用`await`关键字等待获取到签名的地址

调用组件的`clear`方法可以重置签名板

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnSignBoard from 'tnuiv3p-tn-sign-board/index.vue'
import type { TnSignBoardInstance } from 'tnuiv3p-tn-sign-board'

const signBoardRef = ref<TnSignBoardInstance>()

// 图片地址
const imagePath = ref('')

// 保存签名
const saveSign = () => {
  signBoardRef.value?.save().then((res) => {
    imagePath.value = res
  })
}
const roateSaveSign = () => {
  signBoardRef.value
    ?.save(true)
    .then((res) => {
      imagePath.value = res
    })
    .catch((err) => {
      console.error(err)
      uni.showToast({
        title: '保存失败',
        icon: 'none',
      })
    })
}
// 清空签名，重新签名
const clearSign = () => {
  signBoardRef.value?.clear()
}
</script>

<template>
  <view class="content">
    <view class="demo">
      <TnSignBoard ref="signBoardRef" />
    </view>
    <view class="tn-mt tn-flex-center">
      <TnButton @click="saveSign">保存</TnButton>
      <TnButton @click="roateSaveSign">旋转保存</TnButton>
      <TnButton type="danger" @click="clearSign">重新签名</TnButton>
    </view>
    <view class="tn-mt save-wrapper tn-w-full">
      <image class="sign-image" :src="imagePath" mode="heightFix" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30rpx;

  .demo {
    position: relative;
    width: 100%;
    height: 460rpx;
    border: 1rpx solid var(--tn-color-gray-disabled);
  }

  .save-wrapper {
    position: relative;
    border: 1rpx solid var(--tn-color-gray-disabled);
    height: 360rpx;
  }
}
</style>
```

## API

### Props

| 属性名     | 说明                                               | 类型    | 默认值  | 可选值 |
| ---------- | -------------------------------------------------- | ------- | ------- | ------ |
| width      | 签名板宽度，默认单位为 rpx，可以传入带单位的尺寸值 | String  | 100%    | -      |
| height     | 签名板高度，默认单位为 rpx，可以传入带单位的尺寸值 | String  | 100%    | -      |
| text-color | 签名的颜色，只支持css命名的颜色值                  | String  | #080808 | -      |
| disabled   | 禁止使用签名板                                     | Boolean | `false` | `true` |

### Emits

| 事件名      | 说明         | 类型         |
| ----------- | ------------ | ------------ |
| touch-start | 触摸开始事件 | `() => void` |
| touch-end   | 触摸结束事件 | `() => void` |

### Methods

| 方法名 | 说明       | 类型                     |
| ------ | ---------- | ------------------------ |
| save   | 保存签名   | `() => Promise<string> ` |
| clear  | 清空签名板 | `() => void`             |
