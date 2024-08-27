<script lang="ts" setup>
import { signBoardEmits, signBoardProps } from './types'
import { useSignBoard, useSignBoardCustomStyle } from './composables'

const props = defineProps(signBoardProps)
const emits = defineEmits(signBoardEmits)

const { ns, signBoardStyle } = useSignBoardCustomStyle(props)
const {
  componentId,
  canvasId,
  ghostCanvasId,
  rectInfo,
  canvasTouchStart,
  canvasTouchMove,
  canvasTouchEnd,
  canvasErrorEvent,
  saveImage,
  clearCanvas,
} = useSignBoard(props, emits)

defineExpose({
  /**
   * @description 获取签名图片
   */
  save: saveImage,
  /**
   * @description 清空签名
   */
  clear: clearCanvas,
})
</script>

<template>
  <view
    :id="componentId"
    :class="[ns.b(), ns.is('disabled', disabled)]"
    :style="signBoardStyle"
  >
    <view :class="[ns.e('wrapper')]">
      <canvas
        :id="canvasId"
        :class="[ns.e('canvas')]"
        :canvas-id="canvasId"
        disable-scroll
        @touchstart="canvasTouchStart"
        @touchmove="canvasTouchMove"
        @touchend="canvasTouchEnd"
        @error="canvasErrorEvent"
      />
    </view>
  </view>

  <!-- 伪全屏生成旋转图片canvas容器，不展示在页面上 -->
  <view :class="[ns.e('ghost-wrapper')]">
    <canvas
      :id="ghostCanvasId"
      :class="[ns.e('ghost-canvas')]"
      :style="{
        width: `${rectInfo.height}px`,
        height: `${rectInfo.width}px`,
      }"
      :canvas-id="ghostCanvasId"
    />
  </view>
</template>

<style lang="scss" scoped>
@import './theme-chalk/index.scss';
</style>
