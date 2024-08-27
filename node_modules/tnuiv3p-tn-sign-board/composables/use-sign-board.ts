import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { debugWarn, generateId } from '@tuniao/tnui-vue3-uniapp/utils'
import { useSelectorQuery } from '@tuniao/tnui-vue3-uniapp/hooks'

import { useDrawLine } from './use-draw-line'

import type { SetupContext } from 'vue'
import type { SignBoardEmits, SignBoardLine, SignBoardProps } from '../types'

interface RectInfo {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

export const useSignBoard = (
  props: SignBoardProps,
  emits: SetupContext<SignBoardEmits>['emit']
) => {
  const instance = getCurrentInstance()
  // 组件唯一ID
  const componentId = `tsb-${generateId()}`
  // 画布id
  const canvasId = `${componentId}-canvas`
  const ghostCanvasId = `${componentId}-ghost`
  let ctx: UniApp.CanvasContext | null = null
  let ghostCtx: UniApp.CanvasContext | null = null

  const { getSelectorNodeInfo } = useSelectorQuery(instance)

  // 笔画颜色
  const lineColor = computed<string>(() => props.textColor || '#080808')

  const { setCanvasContext, calcDistance, drawLine } = useDrawLine(lineColor)

  // 容器信息
  const rectInfo = ref<RectInfo>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
  })
  // 初始化组件
  let initCount = 0
  const initSignBoard = async () => {
    try {
      const rect = await getSelectorNodeInfo(`#${componentId}`)
      if (!rect) {
        if (initCount > 10) {
          throw new Error('获取组件信息失败')
        }
        setTimeout(() => {
          initCount++
          initSignBoard()
        }, 50)
        return
      }

      initCount = 0
      rectInfo.value.left = rect.left || 0
      rectInfo.value.right = rect.right || 0
      rectInfo.value.top = rect.top || 0
      rectInfo.value.bottom = rect.bottom || 0
      rectInfo.value.width = rect.width || 0
      rectInfo.value.height = rect.height || 0

      // 创建画布
      if (!ctx) {
        ctx = uni.createCanvasContext(canvasId, instance)
        setCanvasContext(ctx)
      }
      // 初始化画布
      initCanvas()
    } catch (err) {
      initCount = 0
      debugWarn('TnSignBoard', `获取组件信息失败: ${err}`)
    }
  }

  // 初始化画板
  const initCanvas = () => {
    clearCanvas()
  }

  // 清空画布
  const clearCanvas = () => {
    ctx?.clearRect(0, 0, rectInfo.value.width, rectInfo.value.height)
    ctx?.draw()
    ghostCtx?.clearRect(0, 0, rectInfo.value.height, rectInfo.value.width)
    ghostCtx?.draw()
    currentLine = []
    lines = []
  }

  /* 画线操作 */

  // 裁剪区域
  let firstTouch = true
  const cutArea = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  // 当前的触摸点
  const currentPoint = {
    x: 0,
    y: 0,
  }
  // 最后一个触摸点
  const lastPoint = {
    x: 0,
    y: 0,
  }
  // 当前的线条
  let currentLine: SignBoardLine[] = []
  // 线条集合
  let lines: SignBoardLine[] = []
  // 画布开始触摸事件
  const canvasTouchStart = (e: any) => {
    if (props.disabled || !e.changedTouches[0]) return
    const touches = e.changedTouches[0]

    // 设置笔画的颜色
    ctx?.setFillStyle(lineColor.value)
    // 设置点线信息
    currentLine.unshift({
      x: touches.x,
      y: touches.y,
      r: 0,
      time: Date.now(),
      distance: 0,
    })
    currentPoint.x = touches.x
    currentPoint.y = touches.y

    // 如果是第一次触发记录裁剪区域
    if (firstTouch) {
      firstTouch = false
      cutArea.top = touches.y
      cutArea.right = touches.x
      cutArea.bottom = touches.y
      cutArea.left = touches.x
    }

    currentLine = drawLine(currentLine)

    emits('touch-start')
  }
  // 画布触摸移动事件
  const canvasTouchMove = (e: any) => {
    if (props.disabled || !e.changedTouches[0]) return
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault()
      }
    }
    const touches = e.changedTouches[0]
    const point: { x: number; y: number } = {
      x: touches.x,
      y: touches.y,
    }

    // 边缘判断
    if (point.x < 0) point.x = 0
    if (point.x > rectInfo.value.right) point.x = rectInfo.value.right
    if (point.y < 0) point.y = 0
    if (point.y > rectInfo.value.bottom) point.y = rectInfo.value.bottom

    // 更新裁剪区域
    if (point.x < cutArea.left) cutArea.left = point.x
    if (point.x > cutArea.right) cutArea.right = point.x
    if (point.y < cutArea.top) cutArea.top = point.y
    if (point.y > cutArea.bottom) cutArea.bottom = point.y

    lastPoint.x = currentPoint.x
    lastPoint.y = currentPoint.y
    currentPoint.x = point.x
    currentPoint.y = point.y

    currentLine.unshift({
      x: point.x,
      y: point.y,
      r: 0,
      time: Date.now(),
      distance: calcDistance(currentPoint, lastPoint),
    })

    currentLine = drawLine(currentLine)
  }
  // 画布触摸结束事件
  const canvasTouchEnd = (e: any) => {
    if (props.disabled || !e.changedTouches[0]) return
    const touches = e.changedTouches[0]
    const point: { x: number; y: number } = {
      x: touches.x,
      y: touches.y,
    }

    lastPoint.x = currentPoint.x
    lastPoint.y = currentPoint.y
    currentPoint.x = point.x
    currentPoint.y = point.y

    currentLine.unshift({
      x: point.x,
      y: point.y,
      r: 0,
      time: Date.now(),
      distance: calcDistance(currentPoint, lastPoint),
    })

    // 一笔结束，保存笔迹的坐标点，清空，当前笔迹
    currentLine = drawLine(currentLine)
    lines.unshift(...currentLine)
    currentLine = []

    emits('touch-end')
  }
  // 监听canvas发生错误事件
  const canvasErrorEvent = (e: any) => {
    debugWarn('TnSignBoard', `canvas发生错误: ${e}`)
  }

  /* 操作导出 */
  // 保存图片
  const saveImage = (isRotate = false) => {
    return new Promise<string>((resolve, reject) => {
      // 如果没有笔迹或者画布，直接返回
      if (!lines.length || !ctx) {
        debugWarn('TnSignBoard', '没有笔迹，无法保存')
        return reject('没有笔迹，无法保存')
      }

      uni.canvasToTempFilePath(
        {
          canvasId,
          fileType: 'png',
          quality: 1,
          success: (res) => {
            const path = res.tempFilePath
            if (isRotate) {
              generateRotateImage(path)
                .then((res) => {
                  resolve(res)
                })
                .catch((err) => {
                  reject(err)
                })
            } else {
              resolve(path)
            }
          },
          fail: (err) => reject(err),
        },
        instance
      )
    })
  }
  // 生成旋转后的图片
  const generateRotateImage = (imgPath: string) => {
    // 创建临时画布
    if (!ghostCtx) {
      ghostCtx = uni.createCanvasContext(ghostCanvasId, instance)
    }
    return new Promise<string>((resolve, reject) => {
      ghostCtx?.restore()
      ghostCtx?.save()
      ghostCtx?.translate(rectInfo.value.height / 2, rectInfo.value.width / 2)
      ghostCtx?.rotate(-90 * (Math.PI / 180))
      ghostCtx?.translate(-rectInfo.value.width / 2, -rectInfo.value.height / 2)
      ghostCtx?.drawImage(
        imgPath,
        0,
        0,
        rectInfo.value.width,
        rectInfo.value.height
      )
      ghostCtx?.draw(false, () => {
        uni.canvasToTempFilePath(
          {
            canvasId: ghostCanvasId,
            fileType: 'png',
            quality: 1,
            success: (res) => resolve(res.tempFilePath),
            fail: (err) => reject(err),
          },
          instance
        )
      })
    })
  }

  // 重置画布容器信息
  const _resetCanvasRect = () => {
    // #ifndef APP-PLUS
    nextTick(() => {
      initSignBoard()
    })
    // #endif
    // #ifdef APP-PLUS
    setTimeout(() => {
      initSignBoard()
    }, 50)
    // #endif
  }
  onMounted(() => {
    _resetCanvasRect()
  })

  watch(
    () => [props.width, props.height],
    () => {
      _resetCanvasRect()
    }
  )

  return {
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
  }
}
