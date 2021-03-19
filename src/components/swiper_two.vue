<template>
    <div class="swiper_two_title">
        <div class="swiper_two">
            <h2>精选优品</h2>
            <p @click="selected">
                <i class="iconfont icon-zu9568"></i>
            </p>
        </div>
        <div class="swiper-containers">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in choice_list" :key="item.id" >
                    <div class="goods" @click="goods_router(item)">
                        <img :src="item.pic_url" alt="">
                        <h2>{{ item.title }}</h2>
                        <div class="goods_price">
                            <!--<p>￥</p>-->
                            <p>{{ item.price }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 如果需要导航按钮 -->
            <!--        <div class="swiper-button-prev"></div>-->
            <!--        <div class="swiper-button-next"></div>-->

        </div>
    </div>
</template>

<script>
    import Swiper from '@/assets/swiper/js/swiper.min.js'
    export default {
        data() {
            return{
                mySwiper: null,
              // 精选优品列表
              choice_list: [],
            }
        },
        created() {
            // 精选优品
            this.get_choice_list()
        },
        methods: {
            // 精选优品跳转列表
            selected() {
              if(!localStorage.getItem('token')){
                this.$dialog.confirm({
                  title:'登录状态',
                  message:'未登录，请登录',
                })
                    .then(()=>{
                      this.$router.push('/login')
                    })
                    .catch(()=>{
                      // console.log('未登录')
                    });
              }else{
                this.$router.push({
                  path: '/order_list',
                  query: {
                    quality: 1
                  }
                })
              }
            },
            goods_router(e) {
              // console.log(e)
              this.$router.push({
                path: '/order/goods_deta',
                query: {
                  id: e.id
                }
              })
            },
            // 精选优品
            get_choice_list() {
              this.$post(localStorage.getItem('http') + 'goods/get_list',{
                quality: 1
              })
                  .then(res=> {
                    // console.log(res)

                    // res.data.list.forEach(item=> {
                    //   // console.log(item)
                    //   item.pic_url= localStorage.getItem('url') + item.pic_url
                    // })

                    this.choice_list= res.data.list

                    // swiper初始化
                    this.get_swiper()

                  })
            },
            // swiper初始化
            get_swiper() {
                this.$nextTick(()=>{
                    this.mySwiper = new Swiper ('.swiper-containers', {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .swiper_two_title{
        margin-bottom: 30px;
    }
    .swiper-containers{
        overflow: hidden;
        padding-left: 10px;
        .swiper-slide{
            padding: 6px 0;
        }
    }
    .swiper_two{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        margin-bottom: 20.5px;
        h2{
            font-size: 18px;
        }
        p{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(9,101,255,.2);
            i{
                font-size: 12px;
                color: #0965FF;
            }
        }
    }
    .goods{
        width: 122px;
        box-shadow:0px 0px 10px rgba(0,0,0,0.12);
        border-radius:4px;
        padding: 8px 10px;
        img{
            width: 102px;
            height: 104px;
            object-fit: cover;
        }
        h2{
            font-size: 12px;
            margin: 8px 0 3px;
        }
        .goods_price{
            display: flex;
            align-items: center;
            p{
                color: #EA610E;
            }
        }
        .goods_price p:nth-child(1){
            font-size: 12px;
        }
        .goods_price p:nth-child(2){
            font-size: 18px;
        }
    }
</style>