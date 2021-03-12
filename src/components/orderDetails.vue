<template>
  <div :style="{marginBottom: order_info_show? '84px': '84px' }">
<!--    <div class="deta_header">-->
<!--      <div class="deta_header_title">-->
<!--        <i @click="bank" class="iconfont icon-fanhui"></i>-->
<!--        <h2>订单详情</h2>-->
<!--      </div>-->

<!--    </div>-->

    <!--收货地址-->
<!--    <div class="deta_address">-->
      <div class="deta_address" @click="add_address">
      <div class="deta_address_left">
        <img src="../assets/deta/deta1.png" alt="">
        <h2 v-if="harvest_address_show">请添加您的收货地址</h2>
        <div class="deta_address_info" v-if="!harvest_address_show">
          <div class="deta_address_info_name">
            <p>{{ default_address_obj.name }}</p>
            <p>{{ default_address_obj.real_phone }}</p>
          </div>
          <p class="deta_address_p">{{ default_address_obj.province.name }}{{ default_address_obj.city.name }}{{ default_address_obj.area.name }}{{ default_address_obj.address }}</p>
        </div>
      </div>
      <i v-if="harvest_address_show" class="iconfont icon-fanhui"></i>
    </div>

    <!--商品信息-->

    <div class="goods_list_item">
      <div v-for="item in arr_spu" :key="item.id">
        <div class="goods_list_title">
          <img :src="item.obj_spus.pic_url" alt="">
          <div class="goods_list_title_address">
            <h2>{{ item.obj_spus.name }}</h2>
            <div class="goods_list_price">
              <p>
                <template v-if="show_type">
                  定金：
                </template>
                <template v-else></template>
                ￥{{ item.price }}
              </p>
              <p>×{{ item.num }}</p>
            </div>
          </div>
        </div>
        <div class="goods_list_count">
          <p>商品数量</p>
          <p>x{{ item.num }}</p>
        </div>
        <div class="goods_list_count">
          <p>商品单价</p>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
      <div class="goods_list_order_count">
        <p>订单总价</p>
        <div class="goods_list_order_price">
          <p>￥</p>
          <p>{{ num_price }}</p>
        </div>
      </div>
      <i class="triangle"></i>
    </div>

    <div v-if="order_info_show" :style="{marginTop: order_info_show? '12px' : ''}">
      <!--订单信息-->

      <div class="order_info" >
        <h2>订单信息</h2>
        <div class="order_info_content">
          <p>订单编号：</p>
          <p>{{ time.num }}</p>
        </div>
        <!--            <div class="order_info_content">-->
        <!--              <p>微信交易号：</p>-->
        <!--              <p>2020112822001173430589774554</p>-->
        <!--            </div>-->
        <div class="order_info_content">
          <p>创建时间：</p>
          <p>{{ time.addtime }}</p>
        </div>
        <div class="order_info_content">
          <p>付款时间：</p>
          <p>{{ time.paytime }}</p>
        </div>
        <!--            <div class="order_info_content" style="margin-bottom: 0;">-->
        <!--              <p>成交时间：</p>-->
        <!--              <p>2020-08-25  21:30:45</p>-->
        <!--            </div>-->
      </div>

      <!--申请退款-->
      <!--          <div class="refund" v-if="refund_show">-->
      <!--            申请退款-->
      <!--          </div>-->
    </div>


    <!--操作-->
    <div class="deta_button">
      <van-button v-if="obj_show" @click="cancel" class="empty">返回上级</van-button>
      <van-button v-if="obj_show" @click="pay_click" class="blue">立即下单</van-button>
    </div>

    <div id="pays" ref="pays">

    </div>
    <noSharing></noSharing>
  </div>
</template>

<script>
import noSharing from "@/components/noSharing";

export default {
  data() {
    return{
      radio: '1',
      pay: {
        pays: 'pays',
        icon: 'iconfont icon-fanhui',
        falg: true,
        pay_show: true
      },
      arr_spu: [],
      // 订单信息显示
      order_info_show: true,
      // 收获地址
      address_clicks: true,
      harvest_address_show: false,
      obj_show: false,
      // 默认收货地址
      default_address_obj: {
        province: {
          name: null
        },
        city: {
          name: null
        },
        area: {
          name: null
        },
      },
      address_id: null,
      dele_show: false,
      again_show: false,
      refund_show: false,
      time: {
        num: null,
        addtime: null,
        paytime: null
      },
      // 支付id
      order_id: null,
      // 重新下单id
      spu_id: null,
      // goods_id
      order_goods_id: null,
      // 总价
      num_price: 0,
      // 微信浏览器标识
      is_weixin: false,
      show_type:true,
    }
  },
  mounted() {
    let obj_spu= {}
      obj_spu= JSON.parse(localStorage.getItem('obj'))
      this.order_info_show= false
      this.harvest_address_show= true
      this.obj_show= true
      this.address_clicks= true

      this.arr_spu.push(obj_spu);
      this.showType = obj_spu.obj_spus.type
      // console.log(this.showType);
      if(this.showType == 2){
        this.show_type = true
      }else{
        this.show_type = false
      }
      this.num_price = (parseFloat(obj_spu.price) * obj_spu.num).toFixed(2);

      if(localStorage.getItem('token')) {
        if(this.$route.query.address_id) {
          this.user_address_get_detail()
        }else{
          this.user_address_get_list()
        }
      }

  },
  methods: {
    pay_click() {
      // 下单
      let obj= {}
      obj['token']= localStorage.getItem('token')
      obj['user_address_id']= this.address_id

      //判断 user_address_id，token 是否有值

      this.arr_spu.forEach((item)=> {
        obj['amount']= [item.num]
        obj['sku_id']= [item.sku_id]
      })

      //判断 amount sku_id 是否有值

      if(this.token != ''){
        // this.make_order(obj)
      }
      else{
        this.$toast.error('请登录');
      }
      if(this.user_address_id != ''){
        // this.make_order(obj)
      }
      else{
        this.$toast.error('地址不能为空');
      }
      if(this.token != '' && this.user_address_id != ''){
        this.make_order(obj)
      }
      else{
        return;
      }

    },
    // 返回上级
    cancel() {
      this.$router.go(-1)
    },
    // 下单接口
    make_order(y) {
      this.$post(localStorage.getItem('http') + 'order/make_order',y)
          .then(res=> {
              console.log(res)
            if(res.code == 1) {
              //携带order_id跳转到订单详情页面 进行支付 order_id为res.data
              this.$router.push({
                path: '/deta',
                query:{
                  id: res.data.order_id

                }
              })
            }else{
              //下单失败 接口报错（其他原因）
              this.$toast.error(res.msg);
            }
          })
    },

    // 获取收货地址列表
    user_address_get_list() {
      this.$post(localStorage.getItem('http') + 'user_address/get_list',{
        token: localStorage.getItem('token')
      })
          .then(res=> {
            // console.log(res.data.list)

            if(res.data.list.length == 0) {
              this.harvest_address_show= true
            }else{
              this.default_address_obj= res.data.list[0]
              this.address_id= res.data.list[0].id
              this.harvest_address_show= false
            }

          })
    },
    // 获取收货地址详情
    user_address_get_detail() {
      this.$post(localStorage.getItem('http') + 'user_address/get_detail',{
        token: localStorage.getItem('token'),
        id: this.$route.query.address_id
      })
          .then(res=> {
            // console.log(res)
            if(res.data == null) {
              this.user_address_get_list()
            }else{
              this.harvest_address_show= false
              this.default_address_obj= res.data
              this.address_id= res.data.id
            }

          })
    },
    // 添加收货地址
    add_address() {
      if(this.address_clicks) {
        if(this.harvest_address_show) {
          //   console.log(localStorage.getItem('token'))
          if(localStorage.getItem('token')) {
            this.$router.push({
              path: '/order/add_address'
            })
          }else{
            this.$toast.warning('请登录');
            this.$router.push({
              path: '/login'
            })
          }
        }else{
          this.$router.push({
            path: '/order/address'
          })
        }

      }
    },

    // 返回
    bank() {
      this.$router.go(-1)
    },

  },
  components:{
    noSharing
  }
}
</script>

<style lang="less" scoped>
// 收货地址
.deta_address{
  padding: 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  .deta_address_left{
    display: flex;
    align-items: center;
    img{
      width: 28px;
      height: 28px;
    }
    h2{
      font-size: 13px;
      font-weight: 400;
      margin-left: 8px;
    }
    .deta_address_info{
      margin-left: 8px;
      .deta_address_info_name{
        display: flex;
        p{
          font-size: 13px;
        }
      }
      .deta_address_info_name p:nth-child(1){

      }
      .deta_address_info_name p:nth-child(2){
        color: #999999;
        margin-left: 12px;
      }
      .deta_address_p{
        width: 304px;
        font-size: 13px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .iconfont{
    font-size: 12px;
    transform: rotate(180deg);
    color: #CCCCCC;
  }
}
// 商品信息
.goods_list_item{
  background: white;
  padding: 16px;
  position: relative;
  .goods_list_title{
    display: flex;
    margin-bottom: 19.5px;
    img{
      width: 78px;
      height: 78px;
      object-fit: cover;
    }
    .goods_list_title_address{
      width: calc(100% - 78px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 8px;
      h2{
        font-size: 14px;
      }
      .goods_list_price{
        display: flex;
        justify-content: space-between;
        p{
          font-size: 13px;
        }
      }
      .goods_list_price p:nth-child(1){
        color: #EA610E;
      }
      .goods_list_price p:nth-child(2){
        color: #999999;
      }
    }
  }
  .goods_list_count{
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
    p{
      color: #999999;
    }
  }
  .goods_list_count p:nth-child(1){

  }
  .goods_list_count p:nth-child(2){

  }
  .goods_list_order_count{
    display: flex;
    justify-content: space-between;
    p{

    }
    .goods_list_order_price{
      display: flex;
      p{

      }
    }
    .goods_list_order_price p:nth-child(1){

    }
    .goods_list_order_price p:nth-child(2){

    }
  }
  .triangle{
    position: absolute;
    right: 29px;
    bottom: -5px;
    background: #FAFAFA;
    display: block;
    width: 10px;
    height: 10px;
    /*border: 1px solid black;*/
    transform: rotate(140deg);
  }
}

// 支付方式
.pays{
  padding: 0 16px 16px;
  background: #FCFCFC;
  height: 40px;
  overflow: hidden;
  transition: all .2s ease-in-out;
  margin-bottom: 12px;
  .pay{
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    .pay_title{
      display: flex;
      align-items: center;
      h2{
        font-size: 14px;
        font-weight: 400;
      }
      i{
        transform: rotate(-90deg);
        margin-left: 8.5px;
        font-size: 12px;
        padding-left: 4px;
      }
      // 转
      .turn{
        transform: rotate(90deg);
        color: #005EFF;
        padding-left: 0;
      }
    }
    .pay_price_content{
      display: flex;
      align-items: center;
      .pay_content{
        .weixin{
          font-size: 16px;
        }
        .yue{
          font-size: 16px;
        }
        .zhifubao{
          font-size: 16px;
        }
      }
      .pay_price{
        display: flex;
        align-items: center;
        margin-left: 5px;
        p{
          color: #FF1454;
        }
      }
    }
    .pay_price p:nth-child(1){
      font-size: 12px;
    }
    .pay_price p:nth-child(2){
      font-size: 16px;
    }
  }
  .pay_choice{
    .van-radio-group{
      .pay_modes{
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .pay_mode{
          display: flex;
          align-items: center;
          .weixin{
            font-size: 16px;
          }
          .yue{
            font-size: 16px;
          }
          .zhifubao{
            font-size: 16px;
          }
          p{
            font-size: 13px;
            margin-left: 8px;
          }
        }
        .van-radio /deep/ .van-radio__icon{
          font-size: 16px!important;
        }
      }
    }
    .van-radio-group .pay_modes:nth-last-child(1){
      margin-bottom: 0;
    }
  }
}
.pays_into{
  height: 108px!important;
}

// 订单信息
.order_info{
  background: white;
  padding: 12px 16px;
  margin-bottom: 12px;
  h2{
    font-size: 16px;
    margin-bottom: 12px;
  }
  .order_info_content{
    margin-bottom: 6px;
    display: flex;
    p{
      font-size: 13px;
      color: #666666;
    }
  }
  .order_info_content p:nth-child(1){
    width: 80.5px;
  }
  .order_info_content p:nth-child(2){
    margin-left: 21.5px;
  }
}


// 申请退款
.refund{
  padding: 12px 0;
  background: white;
  text-align: center;
  font-size: 14px;
  margin-bottom: 84px;
}


// 操作
.deta_button{
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
  background: white;
  .van-button{
    width: 146px;
    height: 40px;
    border-radius: 20px;
  }
  .van-button + .van-button{
    margin-left: 14.5px;
  }
  .empty{
    border: 1px solid #0965FF;
    .van-button__text{
      color: #0965FF;
    }
  }
  .blue{
    background: linear-gradient(136deg,rgba(106,174,255,1) 0%,rgba(0,94,255,1) 100%);
    box-shadow: 0px 2px 3px rgba(9,101,255,0.3);
    .van-button__text{
      color: white;
    }
  }
}
#pays{
  display: none;
}

</style>