import { buildProps } from '@tuniao/tnui-vue3-uniapp/utils'

import type { ExtractPropTypes } from 'vue'

export type SignBoardLine = {
  x: number
  y: number
  r: number
  time: number
  distance: number
}

export type SignBoardPoint = {
  x: number
  y: number
}

export const signBoardProps = buildProps({
  /**
   *  @description 签名板的宽度
   */
  width: {
    type: String,
    default: '100%',
  },
  /**
   * @description 签名板的高度
   */
  height: {
    type: String,
    default: '100%',
  },
  /**
   * @description 签名的颜色，只支持css命名的颜色值
   */
  textColor: {
    type: String,
    default: '#080808',
  },
  /**
   * @description 禁止使用签名板
   */
  disabled: Boolean,
})

export const signBoardEmits = {
  /**
   * @description 开始触摸签名板时触发
   */
  'touch-start': () => true,
  /**
   * @description 离开签名板时触发
   */
  'touch-end': () => true,
}

export type SignBoardProps = ExtractPropTypes<typeof signBoardProps>

export type SignBoardEmits = typeof signBoardEmits
