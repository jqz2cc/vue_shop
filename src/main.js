import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import './assets/css/global.css'
import treeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('treeTable',treeTable)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


