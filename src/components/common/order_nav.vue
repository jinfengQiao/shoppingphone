<template>
    <div class="order_nav">
        <i @click="back" class="iconfont icon-fanhui"></i>
        <h2>{{ msg }}</h2>
    </div>
</template>

<script>
    export default {
        name:'order_nav',
        data() {
            return{
                msg: null,
                router_path: [
                    {
                        paths: '/order/goods_deta',
                        title: '商品详情'
                    },
                    {
                        paths: '/order/all_service',
                        title: '全部服务'
                    },
                    {
                        paths: '/order/my_order',
                       title: '我的订单'
                    },
                    {
                        paths: '/order/address',
                        title: '收货地址'
                    },
                    {
                        paths: '/order/add_address',
                        title: '新增收货地址'
                    },
                    {
                        paths: '/order/edit_address',
                        title: '编辑收货地址'
                    },
                    {
                        paths: '/order/apply_address',
                        title: '申请退款'
                    },
                    {
                      paths: '/payPage',
                      title: '支付详情'
                    }
                ],
                falg: null
            }
        },
        created() {

            this.router_path.forEach((item)=> {
                // console.log(item)
                if(this.$route.path == item.paths) {
                    this.msg= item.title
                }
            })
        },
        mounted() {

        },
        watch: {
            $route:{
                handler(newVal){
                    this.router_path.forEach((item)=> {
                        if(newVal.path == item.paths) {
                            this.msg= item.title
                        }
                    })
                },
                // 深度观察监听
                deep: true
            }
        },
        methods: {
            // 返回
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less" scoped>
    .order_nav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background: white;
        /*border-bottom: 1px solid #DDDDDD;*/
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        .iconfont{
            position: absolute;
            left: 16px;
            top: 21px;
            font-size: 18px;
            color: #333333;
        }
        h2{
            font-size: 18px;
            color: #333333;
            line-height: 25px;
            /*letter-spacing: 1px;*/
        }
    }
</style>