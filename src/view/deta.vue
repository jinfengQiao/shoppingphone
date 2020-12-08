<template>
    <div :style="{marginBottom: order_info_show? '84px': '84px' }">
        <div class="deta_header">
            <div class="deta_header_title">
                <i @click="bank" class="iconfont icon-fanhui"></i>
                <h2>订单支付</h2>
            </div>
            <div class="deta_header_state">
                <div class="deta_header_state_left">
                    <h2>{{ deta_title }}</h2>
                    <p>剩余23小时59分钟自动关闭</p>
                </div>
                <img src="" alt="">
            </div>
        </div>

        <!--收货地址-->
        <div class="deta_address">
<!--          <div class="deta_address" @click="add_address">-->
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
                    <p>￥{{ item.price }}</p>
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


        <!--支付方式-->
        <div :class="pay.pays" v-if="obj_show">

            <div class="pay" @click="open">
                <div class="pay_title">
                    <h2>支付方式</h2>
                    <i :class="pay.icon"></i>
                </div>
                <div class="pay_price_content">
                    <div v-if="pay.pay_show">
                        <div v-if="radio=='1'" class="pay_content">
                            <svg class="icon weixin" aria-hidden="true">
                                <use xlink:href="#icon-weixinzhifu"></use>
                            </svg>
                        </div>
                        <div v-if="radio == '2'" class="pay_content">
                            <svg class="icon zhifubao" aria-hidden="true">
                                <use xlink:href="#icon-zhifubao"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="pay_price">
                        <p>￥</p>
                      <p>{{ num_price }}</p>
                    </div>
                </div>
            </div>

            <div class="pay_choice">

                <van-radio-group v-model="radio" @change="redio_change" >
                  <div class="pay_modes">
                    <div class="pay_mode">
                      <svg class="icon weixin" aria-hidden="true">
                        <use xlink:href="#icon-weixinzhifu"></use>
                      </svg>
                      <p>微信支付</p>
                    </div>
                    <van-radio name="1" icon-size="24px"></van-radio>
                  </div>
                  <template v-if="this.is_weixin == false">
                  <div class="pay_modes">
                    <div class="pay_mode">
                      <svg class="icon zhifubao" aria-hidden="true">
                        <use xlink:href="#icon-zhifubao"></use>
                      </svg>
                      <p>支付宝支付</p>
                    </div>
                    <van-radio name="2" icon-size="24px"></van-radio>
                  </div>
                  </template>
                </van-radio-group>


            </div>

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
            <van-button v-if="obj_show" @click="cancel" class="empty">取消订单</van-button>
            <van-button v-if="dele_show" @click="dele" class="empty">删除订单</van-button>
            <van-button v-if="again_show" @click="again" class="blue">重新下单</van-button>
            <van-button v-if="obj_show" @click="pay_click" class="blue">立即支付</van-button>
            <van-button v-if="refund_show" @click="refund_click" class="blue">申请退款</van-button>
        </div>

        <div id="pays" ref="pays">

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return{
                radio: '1',
                deta_title: null,
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
                is_weixin: false
            }
        },
        created() {
            this.isWeiXin()
            this.get_id()

            let obj_spu= {}
            let id = this.$route.query.id
            console.log(id)
            // console.log(JSON.parse(sessionStorage.getItem('obj')))
            // if(JSON.parse(sessionStorage.getItem('obj')) != null) {
            if(id == undefined || !id || id == "") {
              obj_spu= JSON.parse(sessionStorage.getItem('obj'))
              this.order_info_show= false
              this.harvest_address_show= true
              this.obj_show= true
              this.address_clicks= true
              this.deta_title= '等待支付'

              this.arr_spu.push(obj_spu);
              this.num_price = (parseFloat(obj_spu.price) * obj_spu.num).toFixed(2);

              if(sessionStorage.getItem('token')) {
                if(this.$route.query.address_id) {
                  this.user_address_get_detail()
                }else{
                  this.user_address_get_list()
                }
              }
            }else{
              // 获取订单详情
              this.get_detail()
            }
        },
        methods: {
            // 获取订单详情
            get_detail() {
              console.log(this.$route.query.id);
              this.$post(localStorage.getItem('http') + 'order/get_detail',{
                token: sessionStorage.getItem('token'),
                id: this.$route.query.id
              })
                .then(res=> {
                  // console.log(res)
                  this.order_goods_id= res.data.goods[0].id
                  this.spu_id= res.data.goods[0].spu_id
                  this.order_id= res.data.id

                  res.data.goods.forEach((item)=> {
                    console.log(item);
                    var obj_spu= {
                      obj_spus: {
                        obj_spus: null,
                        name: null,
                      }
                    };
                    obj_spu.obj_spus['pic_url']= item.pic_url
                    obj_spu.obj_spus['name']= item.fullname
                    obj_spu['price']= parseFloat(item.price)
                    obj_spu['num']= item.amount

                    this.num_price = this.num_price + (parseFloat(item.price) * item.amount);
                    this.arr_spu.push(obj_spu);
                  })

               //   console.log(this.arr_spu);


                  this.time.num= res.data.num
                  this.time.addtime= res.data.addtime
                  this.time.paytime= res.data.paytime

                  // 收货地址不可点击
                  this.address_clicks= false
                  // 收获地址
                  this.default_address_obj.name= res.data.take_name
                  this.default_address_obj.real_phone= res.data.take_phone
                  this.default_address_obj.province.name= res.data.province.name
                  this.default_address_obj.city.name= res.data.city.name
                  this.default_address_obj.area.name= res.data.area.name


                  if(res.data.status == 0) {
                    this.deta_title= '等待支付'
                    this.order_info_show= false
                    this.obj_show= true
                  }else if(res.data.status == 1) {
                    this.deta_title= '支付完成'
                    this.order_info_show= true
                    this.refund_show= true
                  }else if(res.data.status == 2) {
                    this.deta_title= '服务完成'
                    this.dele_show= true
                  }else if(res.data.status == 3) {
                    this.deta_title= '交易关闭'
                    this.dele_show= true
                    this.again_show= true
                  }
                })
            },
            wap_pay(y) {
              if (this.is_weixin == true){
                y.is_weixin = 1;
                y.openid = localStorage.getItem("openid");
                this.$post(localStorage.getItem('http') + 'pay/wap_pay',y).then(res=>{
                    window.WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                          "appId":res.appId,
                          "timeStamp":res.timeStamp,
                          "nonceStr":res.nonceStr,
                          "package":res.package,
                          "signType":res.signType,
                          "paySign":res.paySign
                        },function(res){
                          if(res.err_msg == "get_brand_wcpay_request:ok" ){
                            //不处理
                            this.$router.push({
                              path: '/payPage',
                              query:{
                                stu: 1
                              }
                            })

                            //清除本地商品缓存
                            sessionStorage.removeItem('obj');
                          }
                          //取消
                          if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                            //弹框告诉用户取消
                          }
                          //失败
                          if(res.err_msg == "get_brand_wcpay_request:fail" ){
                            //跳转到失败页面
                            this.$router.push({
                              path: '/payPage',
                              query:{
                                stu: 2
                              }
                            })
                          }
                        });
                });
              }else{
                if (y.type == 1){
                  this.$post(localStorage.getItem('http') + 'pay/wap_pay',y)
                      .then(res=> {
                        console.log(y.type)
                        // console.log(res)
                        // const div = document.createElement('div')
                        /* 此处form就是后台返回接收到的数据 */
                        // div.style.display= 'none'
                        // div.innerHTML = res
                        // document.body.appendChild(div)
                        // document.forms[0].submit()

                        this.$refs['pays'].innerHTML= res
                        document.forms[0].submit()
                        console.log(document.forms[0])
                        console.log(res)
                      })
                }

                if(y.type == 2){
                  window.location.href="https://of.tjqpjt.com/api/pay/wap_pay?token="+y.token+"&order_id="+y.order_id+"&type=2";
                }
              }
            },
            // 下单接口
            make_order() {
              let obj= {}
              obj['order_id']= this.order_id
              obj['token']= sessionStorage.getItem('token')
              console.log(this.radio)
              if(this.radio == 1) {
                obj['type']= '2'
              }else{
                obj['type']= '1'
              }
              this.wap_pay(obj)
            },
            // 立即支付
            pay_click() {
                 // 下单
              let obj= {}
              obj['token']= sessionStorage.getItem('token')
              obj['user_address_id']= this.address_id

              this.arr_spu.forEach((item)=> {
                obj['amount']= [item.num]
                obj['sku_id']= [item.sku_id]
              })

              // console.log(obj)
              if(this.address_clicks) {
                this.make_order()
              }else{
                let obj= {}
                obj['order_id']= this.order_id
                obj['token']= sessionStorage.getItem('token')
               // console.log(this.radio)
                if(this.radio == 1) {
                  obj['type']= '2'
                }else{
                  obj['type']= '1'
                }
                // console.log(obj)

                this.wap_pay(obj)
              }

            },
            // 申请退款
            refund_click() {
              let obj= {}
              obj['id']= this.order_goods_id
              obj['pic_url']= this.obj_spu.obj_spus.pic_url
              obj['name']= this.obj_spu.obj_spus.name
              obj['price']= this.obj_spu.price * this.obj_spu.num

            //  console.log(obj)

              this.$router.push({
                path: '/order/apply_address',
                query: {
                  order: JSON.stringify(obj)
                }
              })
            },
            // 删除接口
            dele_order(y) {
              this.$post(localStorage.getItem('http') + 'order/del',y)
                .then(res=> {
                  if(res.code == 1) {
                    this.$router.go(-1)
                    this.$toast.success(res.msg);
                  }else{
                    this.$toast.error(res.msg);
                  }
                })
            },
            // 删除订单
            dele() {
                let obj= {}
                obj['token']= sessionStorage.getItem('token')
                obj['id']= this.order_id
                this.dele_order(obj)
            },
            // 重新下单
            again() {
              this.$router.push({
                path: '/order/goods_deta',
                query: {
                  id: this.spu_id
                }
              })
            },
            // 取消订单接口
            cancel_order(y) {
              this.$post(localStorage.getItem('http') + 'order/cancel',y)
                .then(res=> {
                  if(res.code == 1) {
                    // this.$router.go(-1)
                    this.$toast.success(res.msg);
                    this.$router.push({
                      path: '/order/my_order'
                    })
                  }else{
                    this.$toast.error(res.msg);
                  }
                })
            },
            // 取消订单
            cancel() {
                if(this.address_clicks) {
                  this.$router.go(-1)
                  let obj= null
                  sessionStorage.setItem('obj',obj)
                }else{
                  // 取消订单接口

                  let obj= {}

                  obj['token']= sessionStorage.getItem('token')
                  obj['id']= this.order_id

                  this.cancel_order(obj)
                }
            },
            // 获取收货地址列表
            user_address_get_list() {
              this.$post(localStorage.getItem('http') + 'user_address/get_list',{
                token: sessionStorage.getItem('token')
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
                token: sessionStorage.getItem('token'),
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
              //   console.log(sessionStorage.getItem('token'))
                  if(sessionStorage.getItem('token')) {
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
            // 支付方式展开
            open() {
              if (this.is_weixin == true){
                return false;
              }
              if(this.pay.falg) {
                this.pay.pays= 'pays pays_into'
                this.pay.icon= 'iconfont icon-fanhui trun'
                this.pay.pay_show= false
                this.pay.falg= !this.pay.falg
              }else{
                this.pay.pays= 'pays'
                this.pay.icon= 'iconfont icon-fanhui'
                this.pay.pay_show= true
                this.pay.falg= !this.pay.falg
              }
            },
            // 连接socket
            get_id() {
              this.$post(localStorage.getItem('http') + 'pay/get_id',{
                token: sessionStorage.getItem('token')
              }).then((res)=> {
                  console.log(res.data);
                  this.socket= res.data
                  this.$socket.emit('login',res.data)
              })
            },
            // 支付方式切换
            redio_change(val) {
                this.radio= val
            },
            // 返回
            bank() {
              this.$router.go(-1)
            },
            isWeiXin() {
              function getUrlPara(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                var r = window.location.search.substr(1).match(reg);
                if (r!=null) return (r[2]); return null;
              }

              var ua = window.navigator.userAgent.toLowerCase();
              if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.is_weixin = true; // 是微信端

                // https://open.weixin.qq.com/connect/oauth2/authorize?appid=$this->appid&redirect_uri=$redirect_uri&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
                let code = getUrlPara("code");
                if(!code){
                  let redirect_url = encodeURIComponent(window.location.href);
                  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6bb6df7430479e17&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
                }

                this.$post(localStorage.getItem('http') + 'wechat/get_openid',{
                  code:code
                })
                    .then(res => {
                      localStorage.setItem("openid",res.data);
                    })

              } else {
                this.is_weixin = false;
              }
            }
        },
        sockets: {
          connect(){
            // var token = sessionStorage.getItem('token')
            console.log("connet....");
            this.get_id();
          },
          reconnect(){
            console.log("reconnet....");
            this.get_id();
          },
          disconnect(){
            console.log("disconnect");
            console.log("re? ",this.$socket.connected);
          },
          new_msg(data) {
            console.log(this.$route.query.id);
            console.log(JSON.parse(data))
            data= JSON.parse(data);
            // alert(JSON.parse(data));

            if(data.status == 1 && data.order_id == this.$route.query.id) {
                this.$router.push({
                  path: '/payPage',
                  query: {
                    id: this.$route.query.id
                  }
                })

            }else{
              this.$router.push({
                path: '/deta'
              })
              this.$toast.error('支付失败');
            }
          }
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