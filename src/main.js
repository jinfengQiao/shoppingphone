import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import { get, post } from './utils/http';
import 'lib-flexible/flexible.js'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Loadings from './components/common/loading';
import theme from 'muse-ui/lib/theme';
import * as colors from 'muse-ui/lib/theme/colors';
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.svg'
import Vant from 'vant'
import 'vant/lib/index.css'
import Toast from 'muse-ui-toast';
import VueSocketIO from 'vue-socket.io'

import wx from 'weixin-js-sdk';


// socket * 3.0.7 必须是这个版本
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://socket.tjqpjt.com:2120'
}))

import { DatetimePicker,Calendar,Area,CountDown,ShareSheet,Popup } from 'vant';
Vue.use(DatetimePicker).use(Calendar).use(Area).use(CountDown).use(ShareSheet).use(Popup);

theme.add('custom-theme', {
  whites: colors.grey50
});


// 去重
Vue.prototype.Set = function(arr) {
  return Array.from(new Set(arr))
}

// 防重复点击(指令实现)
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})


// 公共组件
Vue.use(Loadings);
Vue.use(Vant);
Vue.use(MuseUI);
Vue.use(Toast);


Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$wx = wx
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
