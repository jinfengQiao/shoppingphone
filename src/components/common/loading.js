// 公共导航
import Nav from './nav.vue'
import order_nav from "./order_nav";

const loading={
    install:function(Vue){
        // Vue.component()是用来注册全局组件的
        Vue.component('Nav',Nav)
        Vue.component('order_nav',order_nav)
    }  // Header'这就是后面可以使用的组件的名字，install是vue实例上默认的一个方法
}
export default loading