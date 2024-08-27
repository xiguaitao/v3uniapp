import type { Ref } from 'vue'
import type { SignBoardLine, SignBoardPoint } from '../types'

type SinglePointInfo = {
  c1x: number
  c1y: number
  c2x: number
  c2y: number
  ex: number
  ey: number
}

export const useDrawLine = (lineColor: Ref<string>) => {
  // canvas对象
  let canvasContext: UniApp.CanvasContext | null = null
  // 画笔圆半径
  let brushRadius = 1
  // 平滑度
  const smoothness = 60
  // 画笔压力
  const pressure = 1
  // 最小画笔半径
  const minLineRadius = 0.5
  // 最大画笔半径
  const maxLineRadius = 4
  // 笔迹倍数
  const lineSize = 1.5

  // 设置ctx
  const setCanvasContext = (ctx: UniApp.CanvasContext) => {
    canvasContext = ctx
  }

  // 计算两点之间的距离
  const calcDistance = (a: SignBoardPoint, b: SignBoardPoint) => {
    const x = b.x - a.x
    const y = b.y - a.y
    return Math.sqrt(x * x + y * y)
  }

  // 计算点信息
  const calcPointInfo = (
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ) => {
    let vx01 = x1 - x0
    let vy01 = y1 - y0
    let vx21 = x1 - x2
    let vy21 = y1 - y2
    let norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2
    vx01 = (vx01 / norm) * r0
    vy01 = (vy01 / norm) * r0
    norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2
    vx21 = (vx21 / norm) * r2
    vy21 = (vy21 / norm) * r2
    const nX0 = vy01
    const nY0 = -vx01
    const nX2 = -vy21
    const nY2 = vx21

    const mx: number = Number.parseFloat((x0 + nX0).toFixed(1))
    const my: number = Number.parseFloat((y0 + nY0).toFixed(1))

    const a: SinglePointInfo[] = [
      {
        c1x: x1 + nX0,
        c1y: y1 + nY0,
        c2x: x1 + nX2,
        c2y: y1 + nY2,
        ex: x2 + nX2,
        ey: y2 + nY2,
      },
      {
        c1x: x2 + nX2 - vx21,
        c1y: y2 + nY2 - vy21,
        c2x: x2 - nX2 - vx21,
        c2y: y2 - nY2 - vy21,
        ex: x2 - nX2,
        ey: y2 - nY2,
      },
      {
        c1x: x1 - nX2,
        c1y: y1 - nY2,
        c2x: x1 - nX0,
        c2y: y1 - nY0,
        ex: x0 - nX0,
        ey: y0 - nY0,
      },
      {
        c1x: x0 - nX0 - vx01,
        c1y: y0 - nY0 - vy01,
        c2x: x0 + nX0 - vx01,
        c2y: y0 + nY0 - vy01,
        ex: x0 + nX0,
        ey: y0 + nY0,
      },
    ]
    for (const element of a) {
      element.c1x = Number.parseFloat(element.c1x.toFixed(1))
      element.c1y = Number.parseFloat(element.c1y.toFixed(1))
      element.c2x = Number.parseFloat(element.c2x.toFixed(1))
      element.c2y = Number.parseFloat(element.c2y.toFixed(1))
      element.ex = Number.parseFloat(element.ex.toFixed(1))
      element.ey = Number.parseFloat(element.ey.toFixed(1))
    }

    return {
      mx,
      my,
      a,
    }
  }

  // 绘制贝塞尔曲线
  const drawBethel = (
    mv: number,
    my: number,
    point: SinglePointInfo[],
    isFill: boolean
  ) => {
    canvasContext?.beginPath() // 开始路径
    canvasContext?.moveTo(mv, my) // 起点
    // 设置颜色
    canvasContext?.setFillStyle(lineColor.value)
    canvasContext?.setStrokeStyle(lineColor.value)

    // 绘制贝塞尔曲线
    for (const p of point) {
      canvasContext?.bezierCurveTo(p.c1x, p.c1y, p.c2x, p.c2y, p.ex, p.ey)
    }

    canvasContext?.stroke() // 绘制路径
    //填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
    if (isFill) {
      canvasContext?.fill()
    }
    canvasContext?.draw(true) // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
  }

  // 绘制两点之间的线条，切通过贝塞尔曲线平滑处理
  const drawLine = (line: SignBoardLine[]) => {
    if (line.length <= 1) {
      line[0].r = brushRadius
      return line
    }
    let x0,
      x1,
      x2,
      y0,
      y1,
      y2,
      // r0,
      // r1,
      // r2,
      distance = 0,
      time = 0
    const curveValue = 0.5

    if (line.length <= 2) {
      x0 = line[1].x
      y0 = line[1].y
      x2 = line[1].x + (line[0].x - line[1].x) * curveValue
      y2 = line[1].y + (line[0].y - line[1].y) * curveValue
      x1 = x0 + (x2 - x0) * curveValue
      y1 = y0 + (y2 - y0) * curveValue
    } else {
      x0 = line[2].x + (line[1].x - line[2].x) * curveValue
      y0 = line[2].y + (line[1].y - line[2].y) * curveValue
      x1 = line[1].x
      y1 = line[1].y
      x2 = x1 + (line[0].x - x1) * curveValue
      y2 = y1 + (line[0].y - y1) * curveValue
    }

    // 三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
    const len = calcDistance({ x: x2, y: y2 }, { x: x0, y: y0 })
    const lastRadius = brushRadius
    for (let i = 0; i < line.length - 1; i++) {
      distance += line[i].distance
      time += line[i].time - line[i + 1].time
      if (distance > smoothness) break
    }

    brushRadius =
      Math.min((time / len) * pressure + minLineRadius, maxLineRadius) *
      lineSize
    line[0].r = brushRadius
    // 计算笔迹半径
    // if (line.length <= 2) {
    //   r0 = (lastRadius + brushRadius) / 2
    //   r1 = r0
    //   r2 = r1
    // } else {
    //   r0 = (line[2].r + line[1].r) / 2
    //   r1 = line[1].r
    //   r2 = (line[1].r + line[0].r) / 2
    // }

    const n = 5
    let point: { x: number; y: number; r: number }[] = []
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2
      const y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2
      const r = lastRadius + ((brushRadius - lastRadius) / n) * i
      point.push({ x, y, r })
      if (point.length === 3) {
        const pointInfo = calcPointInfo(
          point[0].x,
          point[0].y,
          point[0].r,
          point[1].x,
          point[1].y,
          point[1].r,
          point[2].x,
          point[2].y,
          point[2].r
        )
        drawBethel(pointInfo.mx, pointInfo.my, pointInfo.a, true)
        point = [
          {
            x,
            y,
            r,
          },
        ]
      }
    }

    return line
  }

  return {
    setCanvasContext,
    calcDistance,
    drawLine,
  }
}
