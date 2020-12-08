import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/index'
import index_home from "../components/index_home";
import order_list from "../components/order_list";

import order from "../view/order";
import all_service from "../components/all_service";
import goods_deta from "../components/goods_deta";
import my_order from "../components/my_order";
import address from "../components/address";
import add_address from "../components/add_address";
import edit_address from "../components/edit_address";
import apply_address from "../components/apply_address";
import payPage from "../components/payPage";
import orderDetails from "../components/orderDetails";
import center from "../components/center";
import modifyPage from "../components/modifyPage";
import rebate from "../components/rebate";
import integral from "../components/integral";
import recharge from "../components/recharge";
import moneyDetailed from "../components/moneyDetailed";
import consultation from "../components/consultation";
import buSchool from "../components/buSchool";
import wantStudy from "../components/wantStudy";
import lesson from "../components/lesson";
import signIn from "../components/signIn";
import aaaaa from "../components/aaaaa";
import footer_bar from "../components/footer_bar";
import subordinate from "../components/subordinate";
import viewSupe from "../components/viewSupe";
import member from "../components/member";
import consul from "../components/consul";
import currVip from "../components/currVip";
import search from "../components/search";
import courDetails from "../components/courDetails";
import artiDetails from "../components/artiDetails";

import deta from "../view/deta";
import refund from "../view/refund";

import login from "../view/login";

Vue.use(VueRouter)


const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
            children: [
                {
                    path: 'index_home',
                    component: index_home,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'order_list',
                    component: order_list,
                    meta: {
                        title: '商品列表'
                    }
                }
            ],
            redirect: '/index_home'
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/order',
            component: order,
            children: [
                {
                    path: 'all_service',
                    component: all_service,
                    meta: {
                        title: '全部服务'
                    }
                },
                {
                    path: 'goods_deta',
                    component: goods_deta,
                    meta: {
                        title: '商品详情'
                    }
                },
                {
                    path: 'my_order',
                    component: my_order,
                    meta: {
                        title: '我的订单'
                    }
                },
                {
                    path: 'address',
                    component: address,
                    meta: {
                        title: '收货地址'
                    }
                },
                {
                    path: 'add_address',
                    component: add_address,
                    meta: {
                        title: '新增收货地址'
                    }
                },
                {
                    path: 'edit_address',
                    component: edit_address,
                    meta: {
                        title: '编辑收货地址'
                    }
                },
                {
                    path: 'apply_address',
                    component: apply_address,
                    meta: {
                        title: '申请退款'
                    }
                },
                {
                    path: '/payPage',
                    component: payPage,
                    meta: {
                        title: '支付页'
                    }
                },
            ],
            redirect: '/order/all_service'
        },
        {
            path: '/deta',
            component: deta,
            meta: {
                title: '订单详情',
                keepAlive:false
            }
        },
        {
            path: '/refund',
            component: refund,
            meta: {
                title: '退款详情'
            }
        },
        {
            path: '/orderDetails',
            component: orderDetails,
            meta: {
                title: '订单详情'
            }
        },
        {
            path:'/center',
            component: center,
            meta: {
                title: '个人中心'
            }
        },
        {
            path:'/modifyPage',
            component: modifyPage,
            meta: {
                title: '修改页'
            }
        },
        {
            path:'/rebate',
            component: rebate,
            meta: {
                title: '返利'
            }
        },
        {
            path:'/integral',
            component: integral,
            meta: {
                title: '积分'
            }
        },
        {
            path:'/recharge',
            component: recharge,
            meta: {
                title: '充值'
            }
        },
        {
            path:'/moneyDetailed',
            component: moneyDetailed,
            meta: {
                title: '零钱明细'
            }
        },
        {
            path:'/consultation',
            component: consultation,
            meta: {
                title: '咨询卡'
            }
        },
        {
            path:'/buSchool',
            component: buSchool,
            meta: {
                title: '商学院'
            }
        },
        {
            path:'/wantStudy',
            component: wantStudy,
            meta: {
                title: '我想学'
            }
        },
        {
            path:'/lesson',
            component: lesson,
            meta: {
                title: '我的课程'
            }
        },
        {
            path:'/signIn',
            component: signIn,
            meta: {
                title: '签到'
            }
        },
        {
            path:'/aaaaa',
            component: aaaaa,
            meta: {
                title: '日历签到测试'
            }
        },
        {
            path:'/footer_bar',
            component: footer_bar,
            meta: {
                title: '公共脚'
            }
        },
        {
            path:'/subordinate',
            component: subordinate,
            meta: {
                title: '我的下级'
            }
        },
        {
            path:'/viewSupe',
            component: viewSupe,
            meta: {
                title: '查看上级'
            }
        },
        {
            path:'/member',
            component: member,
            meta: {
                title: '会员等级'
            }
        },
        {
            path:'/consul',
            component: consul,
            meta: {
                title: '咨询卡'
            }
        },
        {
            path:'/currVip',
            component: currVip,
            meta: {
                title: '课程vip'
            }
        },
        {
            path:'/search',
            component: search,
            meta: {
                title: '搜索页'
            }
        },
        {
            path:'/courDetails',
            component: courDetails,
            meta: {
                title: '课程详情'
            }
        },
        {
            path:'/artiDetails',
            component: artiDetails,
            meta: {
                title: '文章详情'
            }
        },

    ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,form,next) => {
    // if(to.path != '/' ){
    //     if(sessionStorage.getItem('token') != null){
    document.title= to.meta.title
    next()
    //         next()
    //     }else{
    //         document.title= to.meta.title
    //         next({path: '/'})
    //     }
    // }else{
    //     document.title= to.meta.title
    //     next()
    // }
})



export default router;
