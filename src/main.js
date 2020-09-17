// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


// Element-UI
import ElementUI from 'element-ui';  // 导入element-ui
import 'element-ui/lib/theme-chalk/index.css';  // 导入element-ui样式
Vue.use(ElementUI);  // 安装 element-ui

// 引入全局样式css
import "./assets/css/reset.css";

// 注册过滤器
import filterObj from "./filters"
for (let k in filterObj) {
  Vue.filter(k, filterObj[k])
}


Vue.prototype.$host = "http://localhost:3030"

// 给JS里面使用
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App },
  template: '<App/>'
})
