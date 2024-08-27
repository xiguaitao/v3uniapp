import { computed } from 'vue'
import { useNamespace } from '@tuniao/tnui-vue3-uniapp/hooks'
import { formatDomSizeValue } from '@tuniao/tnui-vue3-uniapp/utils'

import type { CSSProperties } from 'vue'
import type { SignBoardProps } from '../types'

export const useSignBoardCustomStyle = (props: SignBoardProps) => {
  const ns = useNamespace('sign-board')

  // 签名版对应的样式
  const signBoardStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.width) {
      style.width = formatDomSizeValue(props.width)
    }
    if (props.height) {
      style.height = formatDomSizeValue(props.height)
    }

    return style
  })

  return {
    ns,
    signBoardStyle,
  }
}
