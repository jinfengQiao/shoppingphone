<template>
    <div style="border-top: 1px solid #DDDDDD;background-color: #ffffff">
        <ul class="my_order_title" style="display: none;">
            <li :class="[ indexs == index? 'span_blue' : '' ]" v-for="(item,index) in my_order_title" :key="item.id" @click="my_order_list_click(index)" >
                <span>{{ item.name }}</span>
            </li>
        </ul>
        <!--切换的头tab-->
        <ul class="headTab">
          <li v-for="(n,index) in headTabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index)">{{n}}</li>
        </ul>
        <div class="nullBox" v-show="show12">
          <img src="../assets/buSchool/nullBoxImg1.png" alt="">
        </div>
        <!--订单信息-->
        <ul class="my_list">
            <li v-for="item in list" :key="item.id">
                <div class="my_list_title">
                    <span>订单编号：{{ item.num }}</span>
                    <p v-if="item.status == 0">待付款</p>
                    <p v-if="item.status == 1">支付完成</p>
                    <p v-if="item.status == 2">服务完成</p>
                    <p v-if="item.status == 3">交易关闭</p>
                </div>
                <div v-for="items in item.goods" :key="items.id" @click="pay(item,items)">
                  <div class="my_list_content">
                    <img :src="items.pic_url" alt="">
                    <div class="my_list_content_name">
                      <h2>{{ items.fullname }}</h2>
                      <div class="my_list_content_name_num">
                        <p class="my_list_content_name_num_price">
                          <template v-if="items.type == 2">
                            定金：
                          </template>
                          <template v-else></template>
                          ￥{{ (items.price/100).toFixed(2) }}
                        </p>
                        <p class="my_list_content_num">×{{ items.amount }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="my_list_button">
                    <div class="my_list_button_left">
<!--                      <span>共{{ items.amount }}件商品</span>-->
                      <span>商品</span>
                      <div class="my_list_button_left_num">
                        <p>共计：</p>
                        <div class="my_list_button_left_price">
                          <p>￥</p>
                          <p>{{ items.amount * (items.price/100).toFixed(2) }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="my_list_button_right">
                      <van-button v-preventReClick v-if="item.status == 0" @click.stop="cancel(item)">取消订单</van-button>
                      <van-button v-preventReClick v-if="item.status == 0" @click.stop="pay(item,items)">立即支付</van-button>
                      <!--                        <van-button v-preventReClick v-if="item.status == 1 || item.status == 2">查看详情</van-button>-->
                      <van-button v-preventReClick v-if="item.status == 3 || item.status == 2" @click.stop="dele(item)" >删除订单</van-button>
                      <van-button v-preventReClick v-if="item.status == 3" @click.stop="again(items)">重新下单</van-button>
                      <van-button v-preventReClick v-if="item.status == 1 && items.refund== null" @click.stop="refund(item)" >申请售后</van-button>
                      <van-button v-preventReClick v-if="(items.refund != null && items.refund.status == 1) || (items.refund != null && items.refund.status == 0)" @click.stop="refund_router(items)" class="blue">退款中</van-button>
                      <van-button v-preventReClick v-if="items.refund != null && items.refund.status == 2" @click.stop="refund_router(items)" class="blue">退款成功</van-button>
                      <van-button v-preventReClick v-if="items.refund != null && items.refund.status == 3" @click.stop="refund_router(items)" class="blue">退款失败</van-button>
                    </div>
                  </div>
                </div>
            </li>
        </ul>
      <div class="back_index">
        <button type="button" @click="back_index">返回个人中心</button>
      </div>

      <noSharing></noSharing>

    </div>
</template>

<script>
    import noSharing from "@/components/noSharing";

    export default {
        data() {
            return{
              my_order_title: [
                    {
                        id: 1,
                        name: '全部订单'
                    },
                    {
                        id: 2,
                        name: '待付款'
                    },
                    // {
                    //     id: 3,
                    //     name: '待收货'
                    // },
                    {
                        id: 3,
                        name: '退款'
                    }
                ],
              indexs: 0,
              list: [],
              // form: {
              //     token: localStorage.getItem('token'),
              //     refund: 0,
              //     num:'',
              //     status:'',
              // },
              headTabList: [
                  '待付款','待服务','全部订单'
              ],
              isActive:'',
              status:'',
              show12:false,
            }
        },
        methods: {
            // 退款
            refund_router(e) {
              this.$router.push({
                path: '/refund',
                query: {
                  id: e.id
                }
              })
            },
            // 申请退款
            refund(e) {
              let obj= {}

              obj['id']= e.goods[0].id
              obj['pic_url']= e.goods[0].pic_url
              obj['name']= e.goods[0].fullname
              obj['price']= e.goods[0].price

              this.$router.push({
                path: '/order/apply_address',
                query: {
                  order: JSON.stringify(obj)
                }
              })
            },
            // 立即支付
            pay(e,i) {
              if(this.indexs != 2) {
                this.$router.push({
                  path: '/deta',
                  query: {
                    id: e.id
                  }
                })
              }else {
                this.$router.push({
                  path: '/refund',
                  query: {
                    id: i.id
                  }
                })
              }
            },
            // 重新下单
            again(e) {
              this.$router.push({
                path: '/order/goods_deta',
                query: {
                  id: e.spu_id
                }
              })
            },
            // 取消订单
            cancel(e) {
              this.$post(localStorage.getItem('http') + 'order/cancel',{
                token: localStorage.getItem('token'),
                id: e.id
              })
                .then(res=> {
                  console.log(res)
                  if(res.code == 1) {
                    if(this.indexs == 0) {
                      this.get_list(this.form)
                    }else if(this.indexs == 1){

                      let obj= {}
                      obj['token']= localStorage.getItem('token')
                      obj['status']= 0

                      this.get_list(obj)

                    }
                    this.$toast.success(res.msg);
                  }else{
                    this.$toast.error(res.msg);
                  }
                })
            },
            // 删除订单
            dele(e) {
              this.$post(localStorage.getItem('http') + 'order/del',{
                token: localStorage.getItem('token'),
                id: e.id
              })
              .then(res=> {
                console.log(res)
                if(res.code == 1) {
                  this.get_list(this.form)
                  this.$toast.success(res.msg);
                }else{
                  this.$toast.error(res.msg);
                }
              })
            },
            // 获取列表
            // get_list(y) {
            get_list() {
              console.log(this.status)
              this.$post(localStorage.getItem('http') + 'order/get_list', {
                token: localStorage.getItem('token'),
                num:'',
                refund:0,
                status:this.status
              }).then(res=> {
                console.log(res.data.list)
                this.list= res.data.list
                if(res.data.list == '' || res.data.list == null){
                  this.show12 = true;
                }else{
                  this.show12 = false;
                }
              })
            },
            my_order_list_click(e) {
                this.indexs= e
                if(e == 0) {
                  let obj= {}

                  obj['token']= localStorage.getItem('token')
                  obj['refund']= 0

                  this.get_list(obj)


                }else if(e == 1) {

                  let obj= {}

                  obj['token']= localStorage.getItem('token')
                  obj['status']= 0

                  this.get_list(obj)

                }else if(e == 2) {
                  let obj= {}

                  obj['token']= localStorage.getItem('token')
                  obj['refund']= 1

                  this.get_list(obj)
                }
            },
            listGo(index){
              this.isActive = index;
              console.log(this.isActive)
              // var index1 = index + 1;
              // this.category_id = index1
              // console.log(this.isActive)
              this.status = this.isActive
              if(this.isActive == 2){
                this.status = null
              }
              this.get_list()

            },
            // 返回个人中心
            back_index(){
              this.$router.push({path: '/center'});
            },
            fun(){
              console.log("监听到了");
              this.$router.push({path: '/center'});
            }
        },
        created() {
          // this.get_list(this.form)
          this.status =this.$route.query.status;
          console.log(this.status);
          // this.get_list()
          if(this.status == 0){
            this.isActive = 0
          }
          if(this.status == 1){
            this.isActive = 1
          }
          if(this.status == null || this.status == ''){
            this.isActive = 2
          }
          this.get_list();
        },
        components: {
          noSharing
        },
        mounted(){
          if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.fun, false);//false阻止默认事件
          }
        },
        destroyed(){
          window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
        }
    }
</script>

<style lang="less" scoped>
    .my_order_title{
        padding: 15px 16px 0;
        display: flex;
        justify-content: space-between;
        background: white;
        li{
            span{
                font-size: 14px;
                color: #666666;
                display: block;
                border-bottom: 1px solid transparent;
                padding-bottom: 10px;
            }
        }
        .span_blue{
            span{
                border-bottom: 2px solid #0965FF;
                color: #0965FF;
            }
        }
    }

    .headTab{
      z-index: 2;
      position: fixed;
      //top: 70px;
      left: 0;
      top: 0;
      width: 100%;
      height: 52px;
      line-height: 52px;
      background-color: #ffffff;
      padding: 0 15px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      li{
        cursor: pointer;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
      }
    }
    .nullBox{
      position: fixed;
      top: 50%;
      margin-top: -80px;
      width: 100%;
      left: 50%;
      margin-left: -25%;
      img{
        width: 50%;
        height: 50%;
        object-fit: cover;
      }
    }
    .cur{
      color: #5D80FC!important;
    }
    .my_list{
        padding: 64px 15px 70px 15px;
        li{
            border-radius: 4px;
            background: white;
            padding: 12px;
            margin-bottom: 12px;
            .my_list_title{
                display: flex;
                justify-content: space-between;
                padding-bottom: 8px;
                border-bottom: 1px solid #DDDDDD;
                span{
                    font-size: 13px;
                    color: #666666;
                }
                p{
                    font-size: 13px;
                    color: #0965FF;
                }
            }
            .my_list_content{
                display: flex;
                justify-content: flex-start;
                padding-top: 14px;
                margin-bottom: 19.5px;
                img{
                  object-fit: cover;
                    width: 78px;
                    height: 78px;
                }
                .my_list_content_name{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 8px;
                    h2{
                        font-size: 14px;
                    }
                    .my_list_content_name_num{
                        display: flex;
                        justify-content: space-between;
                        .my_list_content_name_num_price{
                            font-size: 13px;
                            color: #EA610E;
                        }
                        .my_list_content_num{
                            font-size: 13px;
                            color: #999999;
                        }
                    }
                }
            }
            .my_list_button{
                display: flex;
                justify-content: space-between;
                .my_list_button_left{
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 12px;
                    }
                    .my_list_button_left_num{
                        display: flex;
                        align-items: center;
                        p{
                            font-size: 12px;
                        }
                        .my_list_button_left_price{
                            display: flex;
                            align-items: center;
                            margin-left: 5px;
                            p{
                                color: #FF1454;
                            }
                        }
                        .my_list_button_left_price p:nth-child(1){
                            font-size: 12px;
                        }
                        .my_list_button_left_price p:nth-child(1){
                            font-size: 15px;
                        }
                    }
                }
                .my_list_button_right{
                    .van-button{
                        width: 74px;
                        height: 25px;
                        line-height: 25px;
                        border-radius: 13px;
                        padding: 0!important;
                        /deep/ .van-button__text{
                            font-size: 12px;
                        }
                    }
                }
                .my_list_button_right .van-button:nth-child(1){
                    border: 1px solid #0965FF;
                    /deep/ .van-button__text{
                        color: #0965FF;
                    }
                }
                .my_list_button_right .van-button:nth-child(2){
                    margin-left: 6px;
                    background:linear-gradient(134deg,rgba(106,174,255,1) 0%,rgba(0,94,255,1) 100%);
                    /deep/ .van-button__text{
                        color: white;
                    }
                }
            }
        }
    }
    .my_list li:nth-last-of-type(1){
        margin-bottom: 0;
    }

    .back_index{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 15px;
      height: 58px;
      box-sizing: border-box;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      border-top: 1px solid #E7E7E7;
      button{
        width: 100%;
        height: 40px;
        background: linear-gradient(134deg, #6aaeff 0%, #005eff 100%);
        color: #ffffff;
        border-radius: 30px;
        outline: none;
        border: 0;
        letter-spacing: 1px;
      }
    }
</style>