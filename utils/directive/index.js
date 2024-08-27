import SildeIn from './slideIn'
 
const directives = {  //汇总自定义指令
  SildeIn//元素平滑上升指令 这里就是指令名 在文本中使用方法就是 v-指令名
}
 
export default {  //导出自定义指令
  install(app) {// 以安装的方式插到app中
    Object.keys(directives).forEach((key) => {    // 遍历directives对象的key
      app.directive(key, directives[key])  // 将每个directive注册到app中
    })
  }
}