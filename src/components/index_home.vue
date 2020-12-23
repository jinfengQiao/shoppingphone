<template>
    <div>
        <swiper style="margin-top: 56px;"></swiper>
        <ul class="two_list">
            <li @click="details_list(item)" v-for="item in nav_list" :key="item.id" >
                <img :src="item.phone_icon" alt="">
                <p>{{ item.name }}</p>
            </li>
            <li @click="all_list">
                <img src="../assets/index/index_two5.png" alt="">
                <p>更多服务</p>
            </li>
        </ul>
        <swiper_two></swiper_two>

<!--        <ul class="goods_buttons">-->
<!--            <li :class="[indexs == index ? 'li_color' : '' ]" v-for="(item,index) in goods_buttons_list" :key="item.id">-->
<!--                <span flat @click="goods_buttons_click(index,item)">{{ item.name }}</span>-->
<!--            </li>-->
<!--        </ul>-->

<!--    优势服务-->
        <div class="fuwuBox" v-for="(n,inx) in shujuList" :key="inx">
          <div class="fuwuHeadBox">
            <div class="fuwuHead">
              <span>{{n.title}}</span>
              <img src="../assets/index/fuwuHeadIcon.png" alt="">
            </div>
          </div>
          <div class="fuwuCont">
            <ul>
              <li v-for="(spu,k) in n.spu_info" :key="k" @click="jumpDoods_deta(spu)">

                <template v-if="k == 3 || k == 4">
                  <div class="title">{{ spu.name }}</div>
                  <div class="text">{{ spu.info }}</div>
                  <span>{{ spu.price }}</span>
                  <img :src="spu.pic_url" alt="">
                </template>

                <template v-else>
                  <img  :src="spu.pic_url" alt="">
                  <p>{{spu.name}}</p>
                  <span>{{spu.price}}</span>
                </template>

              </li>
            </ul>
          </div>
        </div>


        <ul class="goods_list">
            <li v-for="item in list " :key="item.id" @click="goods_item_click(item)" >
                <img :src="item.pic_url" alt="">
                <div class="goods_list_li">
                    <h2>{{ item.name }}</h2>
                    <div class="goods_list_li_price_num">
                        <div class="goods_list_li_price">
<!--                            <p>￥</p>-->
<!--                            <p>1965</p>-->
                          <p>{{ item.price }}</p>
                        </div>
                        <span>{{ item.sell }}人付款</span>
                    </div>
                </div>
            </li>
        </ul>
        <footer_nav></footer_nav>
    </div>
</template>

<script>
    import swiper from "./swiper";
    import swiper_two from "./swiper_two";
    import footer_nav from "./footer_bar";
    export default {
        data() {
            return{
                active1: 0,
                goods_buttons_list: [],
                indexs: 0,
                nav_list: [],
                list: [],
                shujuList:[],
                list_form: {
                  category_pid: null
                },
                show: true
            }
        },
        created() {
          // 获取导航
          this.get_nav()
          this.get_nav_recom()
          this.get_List()

          var wx = this.$wx
          wx.showOptionMenu();
        },
        methods: {
            // 列表跳转详情
            jumpDoods_deta(sku) {
              this.$router.push({
                path: '/order/goods_deta',
                query: {
                  id: sku.id
                }
              })
            },
            // 获取列表
            // get_list(y) {
            //   this.$post(localStorage.getItem('http') + 'goods/get_list',y)
            //     .then(res=> {
            //       // console.log(res)
            //       this.list= res.data.list
            //     })
            // },
            // 获取导航
            get_nav() {
              this.$post(localStorage.getItem('http') + 'goods_category/get_parent_nav',{
                limit: 4
              })
                .then(res=> {
                  this.nav_list= res.data
                })
            },
            // 为您推荐
            get_nav_recom() {
              this.$post(localStorage.getItem('http') + 'goods_category/get_parent_nav',{
                limit: 0
              })
                .then(res=> {
                  // console.log(res)

                  this.list_form.category_pid= res.data[0].id

                  // this.get_list(this.list_form)

                  this.goods_buttons_list= res.data
                })
            },
            details_list(e) {
              if(!sessionStorage.getItem('token')){
                this.$dialog.confirm({
                  title:'登录状态',
                  message:'未登录，请登录',
                })
                    .then(()=>{
                      this.$router.push('/login')
                    })
                    .catch(()=>{
                      console.log('未登录')
                    });
              }else{
                this.$router.push({
                  path: '/order_list',
                  query: {
                    id: e.id
                  }
                })
              }
            },
            all_list() {
              this.$router.push({
                path: '/order/all_service'
              })
            },
            // 点击滑动导航
            goods_buttons_click(e,y) {
                this.indexs= e;

                this.list_form.category_pid= y.id
                this.get_list(this.list_form)
            },
            // 获取列表
            get_List(){
              this.$post(localStorage.getItem('http') + 'module/get_shop_home_show',{})
                .then(res=> {
                  // console.log(res.data)
                  this.shujuList = res.data.list;
                })
            }
        },
        components: {
            swiper,
            swiper_two,
            footer_nav
        }
    }
</script>

<style lang="less" scoped>
    .two_list{
        margin-top: 20px;
        margin-bottom: 30px;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        li{
            img{
                width: 45px;
                height: 45px;
                //border-radius: 50%;
            }
        }
    }
    .goods_buttons::-webkit-scrollbar{
        width: 0;
        height: 0;
        scrollbar-color: transparent transparent;
        scrollbar-track-color: transparent;
        -ms-scrollbar-track-color: transparent;
    }
    .goods_list{
      display: none;
    }
    .fuwuHeadBox{
      position: absolute;top: 0;left: 0;
      width: 100%;
      margin-top: -18px;display:flex;justify-content: center;
    }
    .fuwuBox{
      position: relative;
      width: 100%;
      //height: 960px;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
      opacity: 1;
      padding: 16px 0 0 0 ;
      margin-bottom: 40px;
      //display: flex;
      //justify-content: space-between;
      //flex-wrap: wrap;
      .fuwuHead{
        //width: 140px;
        height: 46px;
        background: url("../assets/index/fuwuHeadImg.png") no-repeat 0 center;
        background-size: 100% 100%;
        padding:  0 25px;
        line-height: 46px;
        span{
          opacity: 0.8;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #0965FF;
        }
        img{
          width: 17px;height: 12px;
          margin-left: 8px;
        }
      }
      .fuwuCont{
        margin-top: 12px;
        width: 100%;
        border-top: 2px solid #0965FF;
        box-sizing: border-box;
        padding: 0 0 24px 0;
        ul{
          margin-top: 24px;
          width: 100%;
          display: flex;
          //justify-content: space-between;
          flex-wrap: wrap;
        }
        li{
          position: relative;
          padding: 10px 0;
          width: 33.33%;
          min-height: 115px;
          border: 1px solid #C9C9C9;
          box-sizing: border-box;
          opacity: 1;
          text-align: center;
          img{
            width: 72px;height: 46px;
          }
          p{
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
            //height: 36px;
          }
          span{
            margin-top: 5px;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #1B71FF;
          }
          .title{
            width: 100%;
            //text-align: left;
            width: 100%;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
          }
          .text{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            //text-align: left;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
        }
        li:nth-child(4),li:nth-child(5){
          width: 50%;
          border-top: 0;
          border-bottom: 0;
          border-left: 0;
        }
        li:nth-child(4) span,li:nth-child(5) span{
          text-align: left;
          float: left;
          width: 50%;
          position: absolute;
          left: 18px;
          bottom: 20px;
        }
        li:nth-child(4) img,li:nth-child(5) img{
          float: right;
          position: absolute;
          right: 18px;
          bottom: 20px;
          width: 60px;
          height: 50px;
        }
        li:first-child,li:nth-child(2),li:nth-child(3),li:nth-child(6),li:nth-child(7),li:nth-child(8){
          border-left: 0;
        }
        li:nth-child(3),li:nth-child(5){
          border-right: 0;
        }
      }
    }


</style>