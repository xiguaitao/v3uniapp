import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
import Directives from '@/utils/directive/index.js'
import { extractQueryParameter } from './utils'; // 引入函数
export function createApp() {
  const app = createSSRApp(App)
  app.use(Directives) 
  app.config.globalProperties.$extractQueryParameter = extractQueryParameter;
  return {
    app
  }
}
// #endif