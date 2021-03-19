import Vue from 'vue'
import Router from 'vue-router'
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
import footer_bar from "../components/footer_bar";
import subordinate from "../components/subordinate";
import viewSupe from "../components/viewSupe";
import member from "../components/member";
import consul from "../components/consul";
import currVip from "../components/currVip";
import search from "../components/search";
import courDetails from "../components/courDetails";
import artiDetails from "../components/artiDetails";
import payComp from "../components/payComp";
import balance from "../components/balance";
import refund_page from "../components/refund_page";
import rebate_rules from "../components/rebate_rules";
import follow from "../components/follow";
import aboutInstructor from "../components/aboutInstructor";


import deta from "../view/deta";
import refund from "../view/refund";

import login from "../view/login";

Vue.use(Router)


const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const routes= [
        {
            path: '/',
            component: Index,
            children: [
                {
                    path: 'index_home',
                    name:'index_home',
                    component: index_home,
                    meta: {
                        title: '首页',
                        // allowBack: false
                    }
                },
                {
                    path: 'order_list',
                    component: order_list,
                    name:'order_list',
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
            name:'login',
            meta: {
                title: '登录'
            }
        },
        {
            path: '/order',
            component: order,
            name:'order',
            children: [
                {
                    path: 'all_service',
                    component: all_service,
                    name:'all_service',
                    meta: {
                        title: '全部服务'
                    }
                },
                {
                    path: 'goods_deta',
                    component: goods_deta,
                    name:'goods_deta',
                    meta: {
                        title: '商品详情'
                    }
                },
                {
                    path: 'my_order',
                    component: my_order,
                    name:'my_order',
                    meta: {
                        title: '我的订单'
                    }
                },
                {
                    path: 'address',
                    component: address,
                    name:'address',
                    meta: {
                        title: '收货地址'
                    }
                },
                {
                    path: 'add_address',
                    component: add_address,
                    name:'add_address',
                    meta: {
                        title: '新增收货地址'
                    }
                },
                {
                    path: 'edit_address',
                    component: edit_address,
                    name:'edit_address',
                    meta: {
                        title: '编辑收货地址'
                    }
                },
                {
                    path: 'apply_address',
                    component: apply_address,
                    name:'apply_address',
                    meta: {
                        title: '申请退款'
                    }
                },
                {
                    path: '/payPage',
                    component: payPage,
                    name:'payPage',
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
            name:'deta',
            meta: {
                title: '订单详情',
                keepAlive:false
            }
        },
        {
            path: '/refund',
            component: refund,
            name:'refund',
            meta: {
                title: '退款详情'
            }
        },
        {
            path: '/orderDetails',
            component: orderDetails,
            name:'orderDetails',
            meta: {
                title: '订单详情'
            }
        },
        {
            path:'/center',
            component: center,
            name:'center',
            meta: {
                title: '个人中心'
            }
        },
        {
            path:'/modifyPage',
            component: modifyPage,
            name:'modifyPage',
            meta: {
                title: '修改页'
            }
        },
        {
            path:'/rebate',
            component: rebate,
            name:'rebate',
            meta: {
                title: '返利'
            }
        },
        {
            path:'/rebate_rules',
            component: rebate_rules,
            name:'rebate_rules',
            meta: {
                title: '返利规则'
            }
        },
        {
            path:'/integral',
            component: integral,
            name:'integral',
            meta: {
                title: '积分'
            }
        },
        {
            path:'/recharge',
            component: recharge,
            name:'recharge',
            meta: {
                title: '充值'
            }
        },
        {
            path:'/moneyDetailed',
            component: moneyDetailed,
            name:'moneyDetailed',
            meta: {
                title: '零钱明细'
            }
        },
        {
            path:'/consultation',
            component: consultation,
            name:'consultation',
            meta: {
                title: '咨询卡'
            }
        },
        {
            path:'/buSchool',
            component: buSchool,
            name:'buSchool',
            meta: {
                title: '商学院'
            }
        },
        {
            path:'/wantStudy',
            component: wantStudy,
            name:'wantStudy',
            meta: {
                title: '我想学'
            }
        },
        {
            path:'/lesson',
            component: lesson,
            name:'lesson',
            meta: {
                title: '我的课程'
            }
        },
        {
            path:'/follow',
            component: follow,
            name:'follow',
            meta: {
                title: '我的关注'
            }
        },
        {
            path:'/signIn',
            component: signIn,
            name:'signIn',
            meta: {
                title: '签到'
            }
        },
        {
            path:'/footer_bar',
            component: footer_bar,
            name:'footer_bar',
            meta: {
                title: '公共脚'
            }
        },
        {
            path:'/subordinate',
            component: subordinate,
            name:'subordinate',
            meta: {
                title: '我的下级'
            }
        },
        {
            path:'/viewSupe',
            component: viewSupe,
            name:'viewSupe',
            meta: {
                title: '查看上级'
            }
        },
        {
            path:'/member',
            component: member,
            name: 'member',
            meta: {
                title: '会员等级'
            }
        },
        {
            path:'/consul',
            component: consul,
            name: 'consul',
            meta: {
                title: '咨询卡'
            }
        },
        {
            path:'/currVip',
            component: currVip,
            name: 'currVip',
            meta: {
                title: '课程vip'
            }
        },
        {
            path:'/search',
            component: search,
            name: 'search',
            meta: {
                title: '搜索页'
            }
        },
        {
            path:'/courDetails',
            component: courDetails,
            name: 'courDetails',
            meta: {
                title: '课程详情'
            }
        },
        {
            path:'/artiDetails',
            component: artiDetails,
            name: 'artiDetails',
            meta: {
                title: '文章详情'
            }
        },
        {
            path:'/payComp',
            component: payComp,
            name: 'payComp',
            meta: {
                title: '支付组件'
            }
        },
        {
            path:'/balance',
            component: balance,
            name: 'balance',
            meta: {
                title: '余额'
            }
        },
        {
            path:'/refund_page',
            component: refund_page,
            name: 'refund_page',
            meta: {
                title: '售后服务'
            }
        },
        {
            path:'/aboutInstructor',
            component: aboutInstructor,
            name:'aboutInstructor',
            meta: {
                title: '讲师介绍'
            }
        },
    ]




const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    // mode:'history',
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     console.log('开始页面切换');
//     console.log(from.fullPath)
//     if(from.fullPath == '/index_home'){
//         // window.location.href = '/';
//         console.log(to.name)
//     }
//     next();
// });

router.beforeEach((to,form,next) => {
    if (window._hmt) {
        if (to.path) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }
    if(to.meta.title){
        document.title = to.meta.title
    }
    next();


})



export default router;
