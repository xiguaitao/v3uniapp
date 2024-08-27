import { withNoopInstall } from '@tuniao/tnui-vue3-uniapp/utils'
import SignBoard from './index.vue'

export const TnSignBoard = withNoopInstall(SignBoard)
export default TnSignBoard

export * from './types'
export type { TnSignBoardInstance } from './instance'
