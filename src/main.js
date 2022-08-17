import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"
import router from './router';

import {showMessage} from './utils';

import "./mock";


// import "./api";

// 自定义指令
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";

import "./eventBus";

//引入仓库
import store from "./store"; 

// 加到原型上 方便在任意组件中都可以使用
Vue.prototype.$showMessage = showMessage;  

Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

store.dispatch("setting/fetchSetting");


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
