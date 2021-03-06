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
import selection_page from "../components/selection_page";
import aboutInstructor_ranking from "../components/aboutInstructor_ranking";

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
                        title: '??????',
                        // allowBack: false
                    }
                },
                {
                    path: 'order_list',
                    component: order_list,
                    name:'order_list',
                    meta: {
                        title: '????????????'
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
                title: '??????'
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
                        title: '????????????'
                    }
                },
                {
                    path: 'goods_deta',
                    component: goods_deta,
                    name:'goods_deta',
                    meta: {
                        title: '????????????'
                    }
                },
                {
                    path: 'my_order',
                    component: my_order,
                    name:'my_order',
                    meta: {
                        title: '????????????'
                    }
                },
                {
                    path: 'address',
                    component: address,
                    name:'address',
                    meta: {
                        title: '????????????'
                    }
                },
                {
                    path: 'add_address',
                    component: add_address,
                    name:'add_address',
                    meta: {
                        title: '??????????????????'
                    }
                },
                {
                    path: 'edit_address',
                    component: edit_address,
                    name:'edit_address',
                    meta: {
                        title: '??????????????????'
                    }
                },
                {
                    path: 'apply_address',
                    component: apply_address,
                    name:'apply_address',
                    meta: {
                        title: '????????????'
                    }
                },
                {
                    path: '/payPage',
                    component: payPage,
                    name:'payPage',
                    meta: {
                        title: '?????????'
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
                title: '????????????',
                keepAlive:false
            }
        },
        {
            path: '/refund',
            component: refund,
            name:'refund',
            meta: {
                title: '????????????'
            }
        },
        {
            path: '/orderDetails',
            component: orderDetails,
            name:'orderDetails',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/center',
            component: center,
            name:'center',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/modifyPage',
            component: modifyPage,
            name:'modifyPage',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/rebate',
            component: rebate,
            name:'rebate',
            meta: {
                title: '??????'
            }
        },
        {
            path:'/rebate_rules',
            component: rebate_rules,
            name:'rebate_rules',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/integral',
            component: integral,
            name:'integral',
            meta: {
                title: '??????'
            }
        },
        {
            path:'/recharge',
            component: recharge,
            name:'recharge',
            meta: {
                title: '??????'
            }
        },
        {
            path:'/moneyDetailed',
            component: moneyDetailed,
            name:'moneyDetailed',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/consultation',
            component: consultation,
            name:'consultation',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/buSchool',
            component: buSchool,
            name:'buSchool',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/wantStudy',
            component: wantStudy,
            name:'wantStudy',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/lesson',
            component: lesson,
            name:'lesson',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/follow',
            component: follow,
            name:'follow',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/signIn',
            component: signIn,
            name:'signIn',
            meta: {
                title: '??????'
            }
        },
        {
            path:'/footer_bar',
            component: footer_bar,
            name:'footer_bar',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/subordinate',
            component: subordinate,
            name:'subordinate',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/viewSupe',
            component: viewSupe,
            name:'viewSupe',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/member',
            component: member,
            name: 'member',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/consul',
            component: consul,
            name: 'consul',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/currVip',
            component: currVip,
            name: 'currVip',
            meta: {
                title: '??????vip'
            }
        },
        {
            path:'/search',
            component: search,
            name: 'search',
            meta: {
                title: '?????????'
            }
        },
        {
            path:'/courDetails',
            component: courDetails,
            name: 'courDetails',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/artiDetails',
            component: artiDetails,
            name: 'artiDetails',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/payComp',
            component: payComp,
            name: 'payComp',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/balance',
            component: balance,
            name: 'balance',
            meta: {
                title: '??????'
            }
        },
        {
            path:'/refund_page',
            component: refund_page,
            name: 'refund_page',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/aboutInstructor',
            component: aboutInstructor,
            name:'aboutInstructor',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/selection_page',
            component: selection_page,
            name:'selection_page',
            meta: {
                title: '????????????'
            }
        },
        {
            path:'/aboutInstructor_ranking',
            component: aboutInstructor_ranking,
            name:'aboutInstructor_ranking',
            meta: {
                title: '????????????'
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
//     console.log('??????????????????');
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
