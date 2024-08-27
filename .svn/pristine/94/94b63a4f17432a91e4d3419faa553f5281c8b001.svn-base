const DISTANCE = 100 //定义动画的距离
const duration = 500 //定义动画的持续时间 //也可以接收用户的一些配置
 
const animationMap = new WeakMap() // 记录元素和动画的对应关系 WeakMap房防止内存泄漏
 
const ob = new IntersectionObserver((entries) => {
  //创建一个监听者，监听元素啊是否进入可视区域
  for (const entry of entries) {
    //遍历监听者
    if (entry.isIntersecting) {
      //如果元素进入可视区域
      const animation = animationMap.get(entry.target)
      if (animation) {
        // console.log(animation)
        animation.play()
        ob.unobserve(entry.target) //动画播放完毕后取消监听
      }
      // console.log(entry.target)
    }
  }
})
/**
 * 判断元素是否在可视区域之下
 * @param {Element} el - 要判断的元素
 * @returns {boolean} - 若元素在可视区域之上则返回true，否则返回false
 */
function isBelowViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top - DISTANCE > window.innerHeight
}
export default {
  mounted(el) {
    if (!isBelowViewport(el)) {
      //判断元素是否在可视区域之下
      return //如果不在可视区域之下则直接返回   //  因为动画只需要在元素进入可视区域时才播放，所以只需要在元素进入可视区域时调用mounted方法即可 视口内容和视口之上的元素都不需要播放动画
    }
    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.3
        },
        {
          transform: `translateY(0)`,
          opacity: 1
        }
      ],
      {
        duration: duration,
        easing: 'ease-in'
      }
    )
    //创建动画用   animate(keyframes, options)，animate方法返回一个Animation实例，可以调用play()方法来播放动画，调用pause()方法来暂停动画
    animation.pause() //创建动画后先将所有动画暂停
    ob.observe(el) //监听元素是否进入可视区域，如果进入就播放动画，如果不进入就暂停动画
    animationMap.set(el, animation) //将元素和动画的对应关系记录在WeakMap中
  },
  unmounted(el) {
    console.log('unmounted')
    ob.unobserve(el)
  }
}