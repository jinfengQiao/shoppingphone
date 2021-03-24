// 公共导航
import order_nav from "./order_nav";
import head_bar from "../head_bar";

const loading={
    install:function(Vue){
        Vue.component('order_nav',order_nav)
        Vue.component('head_bar',head_bar)
    }
}
export default loading