<template>
    <div>
<!--        <div class="goods_deta" style="margin-top: 70px;">-->
        <div class="goods_deta" >
            <img :src="spu.pic_url" alt="">
            <div class="goods_deta_title">
                <h2>{{ spu.name }}</h2>
                <div class="goods_deta_price">
                    <div class="goods_deta_price_p if_cls">
                        <template v-if="show_type" style="font-size: 18px;color: #EA610E;">
                          定金：
                        </template>
                        <template v-else></template>
                        <p>￥</p>
<!--                        <p>3000.00</p>-->
                        <p v-if="price == null">{{ price1 }}</p>
                        <p v-if="price != null">{{ price }}</p>
                    </div>
                    <span>{{ spu.sell }}人付款</span>
                </div>
              <div class="estimate_share_b">
                <div class="estimate">
                  <template v-if="existence_token">
                    <span>
                      预计返佣：{{this.two_back}} ~ {{this.one_back}}元
                    </span>
                  </template>
                  <template v-else>
                    <span @click="jumpLogin">点击成为【时尚青春会员】，教你薅权鹏羊毛，升级会员享更多福利！</span>
                  </template>
                </div>
                <div class="invite_friends" @click="get_invitationPoster" v-bind:class="{active_login: isActive}">
                  <img src="../assets/buSchool/invite_friends_icon.png" alt="">
                  <span>邀请好友</span>
                </div>
              </div>
            </div>
        </div>

        <div class="recom_list">
            <h2>推荐商品</h2>
            <ul class="recom_list_content">
                <li v-for="item in goods_list" :key="item.id" @click="recom_click(item)">
                    <img :src="item.pic_url" alt="">
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>


        <div class="goods_deta_content">
            <van-tabs v-model="active" sticky color="#ff0000">
              <van-tab title="商品详情">
                <div class="goods_deta_content_item" v-html="phone_content"></div>
              </van-tab>
              <van-tab title="购买流程">
                <div class="goods_deta_process">
                  <div v-html="phone_buy_content"></div>
                </div>
              </van-tab>
            </van-tabs>
        </div>


        <div class="submit">
          <div class="footLeft_b">
            <div class="submit_b" @click="back_index">
              <img src="../assets/footer/index_icon1.png" alt="" class="submit_b_img">
              <span class="submit_b_span">首页</span>
            </div>
            <div class="submit_left" @click="cellKefu">
              <img src="../assets/my_order/service_icon.png" alt="">
              <span>联系客服</span>
            </div>
          </div>
          <mu-button @click="submit">立即下单</mu-button>
        </div>


        <!--对话框-->
        <mu-dialog width="600" dialog-class="dio" max-width="91.5%" :overlay-close="false" :open.sync="openSimple">
            <div class="diolog_content">
                <div class="diolog_content_title">
                    <div class="diolog_content_item">
                        <img :src="obj_spu.pic_url" alt="">
                        <div class="diolog_content_name">
                            <h2>{{ obj_spu.name }}</h2>
                            <div class="diolog_content_price" id="diolog_content_price">
                                <template v-if="show_type">
                                  定金：
                                </template>
                                <template v-else></template>
                                <p v-show="priceShow">￥</p>
                                <p v-show="priceShow" v-if="price == null">{{price1}}</p>
                                <p v-show="priceShow" v-if="price != null">{{ price }}</p>
                                <p v-if="priceShow == false" style="color:#999">已下架</p>
                            </div>
                        </div>
                    </div>
                    <div class="close">
                        <i @click="closeSimpleDialog" class="iconfont icon-guanbi" ></i>
                    </div>
                </div>
                <ul class="diolog_content_list">
                    <li v-for="(item,k) in attribute" :key="item.attribute_id" @click.stop>
                        <h2>{{item.attribute_name}}</h2>
                        <van-radio-group v-model="radio[k]" direction="horizontal" @change="van_radio(radio[k],item)">
                          <van-radio v-for="items in item.value" :key="items.attribute_value_id" :disabled="items.show" :name="items" shape="square">{{ items.attribute_value_name }}</van-radio>
                        </van-radio-group>
                    </li>
                </ul>
                <div class="diolog_content_num">
                    <h2>购买数量</h2>
<!--                    <van-stepper v-model="value" theme="round" button-size="22" disable-input />-->
                    <van-stepper v-model="value" />
                </div>

                <div class="goods_button">
                    <van-button @click="submit_click" v-bind:disabled="isDisabled" :class="{bg:bgcolor == 1}">确认</van-button>
                </div>
            </div>
        </mu-dialog>

      <van-popup v-model="show" round position="bottom">
        <p><a href="tel:4001025199">
          <img src="../assets/goods_deta/tel_icon.png" alt="">
          4001025199
        </a></p>
        <p><a href="tel:4001029677">
          <img src="../assets/goods_deta/tel_icon.png" alt="">
          4001029677
        </a></p>
      </van-popup>
      <div class="grey_background" v-show="show_share" @click="close_invitationPoster">
        <div class="invitationPoster_b">
          <div class="p_bo">
            <p class="invita_p1">
              1<span>点击右上角分享给好友</span>
              <img src="../assets/buSchool/share_icon.png" alt="">
            </p>
            <p class="invita_p1">
              2<span>长按下方图片保存或扫码了解</span>
            </p>
          </div>
          <div class="img_bo">
            <img :src="pic_url_share" alt="" @click.stop>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                goods_list: [],
                openSimple: false,
                value: 1,
                radio: [],
                spu: {},
                obj_spu: {},
                price: null,
                price1:'',
                attribute: [],
                value_list: [],
                attribute_list: [],
                power_set: [],
                sku_list: [],
                title: '',
                integrityurl:'',
                // logo:'https://m.tjqpjt.com/logo.png',
                desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
                pic_url: '',
                isDisabled:false,
                priceShow:true,
                bgcolor:2,
                show:false,
                existence_token:true,
                show_share:false,
                pic_url_share:'',
                show_type:false,
                course_id:'',
                isActive:true,
                show_cls_b:true,
                active:'商品详情',
                phone_buy_content:'',
                phone_content:'',
                one_back:'',
                two_back:'',
            }
        },
        created() {
            this.get_data(this.$route.query.id);
            this.get_goods();
            var e = this.$route.query.id
            console.log(e)


            // this.isActive_cls = 0

            this.changeUrl();
        },
        watch: {
          $route: {
            handler() {
              this.get_data(this.$route.query.id);
            },
            deep: true
          }
        },
        methods: {
        // 推荐商品
        recom_click(e) {
          this.$router.replace({
            path: "/order/goods_deta",
            query: {
              id: e.id
            }
          })
        },
        // 提交确认
        submit_click() {

          if (this.price) {

            console.log(this.obj_spu)
            console.log(this.price)
            console.log(this.value)

            let obj_spu_deta = {}

            obj_spu_deta['obj_spus'] = this.obj_spu
            obj_spu_deta['price'] = this.price
            obj_spu_deta['num'] = this.value
            obj_spu_deta['sku_id'] = this.sku_id

            localStorage.setItem('obj', JSON.stringify(obj_spu_deta))

            this.$router.push({
              path: '/orderDetails'
            })
          } else {
            this.$toast.error('请选择需要购买的商品');
          }


        },
        // 单选框
        van_radio(e, i) {
          console.log(e, i)
          this.$forceUpdate();
          i.check = true


          let radio_arr = []
          this.radio.forEach(item => {
            radio_arr.push(item.attribute_value_id)
          })

          let radio = radio_arr,
              arr = [];
          for (let i = 0; i < radio.length; i++) {
            if (radio[i] != undefined) {
              arr.push(radio[i]);
            }
          }

          // console.log(this.attribute.length);
          // console.log(arr);


          if (this.attribute.length == arr.length) {
            for (let i = 0; i < this.sku_list.length; i++) {
              var item = this.sku_list[i];
              if (item.attribute_value_ids.toString() == arr.toString()) {
                this.obj_spu.pic_url = item.pic_url
                this.price = item.price
                this.sku_id = item.id
                this.isDisabled = false
                this.priceShow = true
                this.bgcolor = 2;
                break;
              } else {
                //未找到匹配商品 下单按钮置灰禁用 金额显示已下架
                this.isDisabled = true
                this.priceShow = false
                this.bgcolor = 1
              }
            }
          }

        },
        // 获取详情
        get_data(e) {
          this.$post(localStorage.getItem('http') + 'goods/get_detail', {
            id: e,
            token: localStorage.getItem('token'),
          })
          .then(res => {
            console.log(res)
            this.phone_content = res.data.spu.phone_content
            this.phone_buy_content = res.data.spu.phone_buy_content
            this.two_back = (res.data.two_back / 100).toFixed(2)
            this.one_back = (res.data.one_back / 100).toFixed(2)
            if (res.data.spu.min_price == res.data.spu.max_price) {
              this.price1 = res.data.spu.min_price
            } else {
              this.price1 = res.data.spu.min_price + " - " + res.data.spu.max_price;
            }
            this.id_share = res.data.spu.id

            // this.$wxShare(res.data.spu.name,this.desc,location.href,res.data.spu.pic_url)
            res.data.attribute.forEach((i, k) => {


              res.data.attribute[k]['check'] = false

              this.value_list.push(i.value)
              var n = null
              if (i.value.length == 1) {
                i.value.forEach(() => {
                  // this.radio[k]= y.attribute_value_id
                  n = i.attribute_id
                })
              }

              if (i.attribute_id != n) {
                this.attribute_list.push(i)
              }

              // 禁用
              i.value.forEach((e) => {
                e['show'] = false
              })

            })

            this.attribute = res.data.attribute
            // sku
            this.sku_list = res.data.sku
            // 全部sku
            this.power_set = res.data.power_set

            // 商品详情
            this.spu = res.data.spu
            this.title = res.data.spu.name
            // console.log(this.title)
            this.obj_spu = res.data.spu

            if(res.data.spu.type == 2){
              this.show_type = true
            }else{
              this.show_type = false
            }
            this.course_id = res.data.spu.id
            this.add_score(this.course_id)
            // this.$wxShare(this.title, this.desc, location.href, res.data.spu.pic_url,res.data.spu.id,1)
            this.$wxShare(this.title, this.desc, location.href, res.data.spu.pic_url)

          })
        },
        // 点击跳转登录
        jumpLogin(){
          this.$router.push({path: '../login'});
        },
        // 立即下单 打开对话框
        submit() {
          if (!localStorage.getItem('token')) {
            this.$dialog.confirm({
              title: '登录状态',
              message: '未登录，请登录',
            })
                .then(() => {
                  this.$router.push('/login')
                })
                .catch(() => {
                  console.log('未登录')
                });
          } else {
            this.openSimple = true
          }
        },
        // 点击联系客服
        cellKefu() {
          this.show = true;
          // if(!localStorage.getItem('token')){
          //   this.$dialog.confirm({
          //     title:'登录状态',
          //     message:'未登录，请登录',
          //   })
          //       .then(()=>{
          //         this.$router.push('/login')
          //       })
          //       .catch(()=>{
          //         console.log('未登录')
          //       });
          // }else{
          //   this.$toast.success('联系客服');
          // }
        },
        // 关闭对话框
        closeSimpleDialog() {
          this.openSimple = false
        },
        // 获取推荐商品
        get_goods() {
          this.$post(localStorage.getItem('http') + 'goods/get_list', {
            recommend: 1,
            page: 1,
            limit: 3
          })
              .then(res => {
                console.log(res.data.list)
                this.goods_list = res.data.list


              })
        },
        // 返回首页
        back_index() {
          // this.$router.go(-2);
          this.$router.replace('/')
        },
        // 邀请好友
        get_invitationPoster(){
          if(!localStorage.getItem('token')){
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
          }else {
            this.show_share = true
            this.$post(localStorage.getItem('http') + 'goods/make_playbill', {
              token: localStorage.getItem('token'),
              id: this.id_share
            }).then(res => {
              console.log(res)
              if (res.code == 1) {
                // console.log(res)
                this.pic_url_share = res.data.pic_url
              }
            })
          }
        },
        // 关闭邀请海报弹窗
        close_invitationPoster(){
          this.show_share = false
        },
        // 增加积分
        add_score(){
          console.log(this.course_id)
          this.$post(localStorage.getItem('http') + 'user_score/add', {
            token: localStorage.getItem('token'),
            source:2,
            goods_id:this.course_id,
            goods_type:1
          }).then(res => {
            console.log(res)
            if(res.code == 1){
              console.log('增加了')
            }
          })
        },
        // 转发增加积分
        changeUrl(){
          let currentUrl = location.href
          let openidIndex_1 = currentUrl.indexOf('id=')
          let openidLastIndex_1 = currentUrl.indexOf('&', openidIndex_1)
          let openidIndex = currentUrl.indexOf('openid')
          let openidLastIndex = currentUrl.indexOf('=', openidIndex)
          // let short_course_id = ''
          // let short_openid = ''
          if(openidIndex > -1){
            let leftStr = currentUrl.substring(openidIndex_1 + 3, openidLastIndex_1)
            let rightStr = currentUrl.substring(openidLastIndex + 1);
            // short_course_id = leftStr
            // short_openid = rightStr
            console.log('这是截取的course_id:'+ leftStr)
            console.log('这是截取的openid:'+ rightStr)
            this.$post(localStorage.getItem('http') + 'user_score/add', {
              token: localStorage.getItem('token'),
              source:3,
              goods_id:leftStr,
              goods_type:4,
              openid: rightStr
            }).then(res => {
              console.log(res)
              if (res.code == 1) {
                console.log('转发积分增加了')
              }
            })
          }
        }
        // 切换详情块
        // choose_cls(index){
        //   console.log(index)
        //   this.isActive_cls = index;
        //   if(index == 0){
        //     this.show_cls_b = true
        //   }else{
        //     this.show_cls_b = false
        //   }
        // },
      },
      mounted() {
        this.token = localStorage.getItem('token')
        console.log(this.token)
        if(this.token){
          this.existence_token = true
          this.isActive = false
        }else{
          this.existence_token = false
          this.isActive = true
        }

      }
    }
</script>

<style lang="less" scoped>
    // 金额
    .goods_deta{
        img{
            width: 100%;
            //height: 37.5vh;
            max-width: 500px;
            object-fit: cover;
        }
        .goods_deta_title{
            float: left;
            width: 100%;
            padding: 12px 16px;
            background: white;
            margin-bottom: 12px;
            .estimate_share_b{
              margin-top: 5px;
              float: left;
              //display: flex;
              //justify-content: space-between;
              //align-items: center;
              width: 100%;
            .invite_friends {
              float: right;
              position: relative;
              background: linear-gradient(323deg, #FFA600 0%, #F1B100 100%);
              box-shadow: 0px 3px 6px rgb(255 145 0 / 64%);
              opacity: 1;
              border-radius: 22px;
              padding: 3px 10px;
              box-sizing: border-box;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              img{
                width: 12px;
                height: 12px;
                margin-right: 5px;
              }
              span{
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
              }
            }
          }
            .estimate{
              float: left;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
              border-radius: 2px;
              padding: 3px 10px;
              box-sizing: border-box;
              background-color: #486eef;
            }
            h2{
                font-size: 15px;
                margin-bottom: 6px;
            }
            .goods_deta_price{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .goods_deta_price_p{
                    display: flex;
                    align-items: center;
                    p{
                        color: #EA610E;
                    }
                }
                .if_cls{
                  font-size: 17px;
                  color: #EA610E;
                }
                .goods_deta_price_p p:nth-child(1){
                    font-size: 12px;
                }
                .goods_deta_price_p p:nth-child(2){
                    font-size: 18px;
                }
                span{
                    color: #999999;
                    //padding-top: 9px;
                }
            }
        }
    }
    // 推荐商品
    .recom_list{
        padding: 12px 16px;
        background: white;
        margin-bottom: 12px;
        h2{
            font-size: 16px;
            margin-bottom: 12px;
        }
        .recom_list_content{
            display: flex;
            li{
                width: 33.3%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 21px;
                img{
                    width: 100%;
                    /*height: 75.5px;*/
                    display: block;
                    margin-bottom: 8px;
                    object-fit: cover;
                }
                p{
                    font-size: 12px;
                }
            }
        }
        .recom_list_content li:nth-child(3){
            margin-right: 0;
        }
    }


    // 商品详情
    .goods_deta_content{
        background: white;
        margin-bottom: 65px;
        .goods_deta_content_item{
            padding: 16px;
            /deep/ img{
              width: 100%;
              object-fit: cover;
            }
        }
        .goods_deta_process{
          width: 100%;
          padding: 16px;
          /deep/ img{
            width: 100%;
            object-fit: cover;
          }
        }
    }
    // 下单
    .submit{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 62px;
        //padding: 0 0 0 15px;
        box-sizing: border-box;
        background-color: #ffffff;
        border-top: 1px solid #E7E7E7;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-family: PingFang SC;
        z-index: 9999;
        .footLeft_b{
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          //margin-top: -1px;
          font-size: 13px;
          font-family: PingFang SC;
          text-align: center;
          font-weight: bold;
          color: #888888 !important;
        }
        .submit_b {
          height: 100%;
          width: 60px;
          text-align: center;
          .submit_b_img {
            margin-top: 10px;
            width: 22px;
            height: 22px;
          }
          .submit_b_span {
            display: inline-block;
            width: 100%;
          }
        }
        .submit_left{
            height: 100%;
            width: 60px;
            text-align: center;
            margin-left: 18px;
            img{
              margin-top: 10px;
              width: 22px;
              height: 22px;
            }
            span{
              display: inline-block;
              width: 100%;
            }
        }
        .mu-button{
            background: #ff0000;
            box-shadow: 0px 3px 5px rgba(223, 92, 107, 0.5);
            //border-radius: 5px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            outline: none;
            border: 0;
            padding: 0 45px;
            height: 100%;
            /deep/ .mu-button-wrapper{
                color: white;
            }
        }
    }

    // 弹出框
    .diolog_content{
        .diolog_content_title{
            display: flex;
            justify-content: space-between;
            .close{
                .iconfont{
                    background: #F2F2F2;
                    padding: 5px 5px 5px 6px;
                    border-radius: 50%;
                    line-height: 13px;
                    font-size: 12px;
                    color: #999999;
                }
            }
            .diolog_content_item{
                padding-top: 6px;
                margin-bottom: 16px;
                display: flex;
                img{
                    width: 78px;
                    height: 78px;
                }
                .diolog_content_name{
                    margin-left: 12px;
                    h2{
                        max-width: 182px;
                        font-size: 14px;
                        margin-bottom: 6px;
                    }
                    .diolog_content_price{
                        display: flex;
                        align-items: center;
                        //font-size: 17px;
                      font-size: 14px;
                        color: #EA610E;
                        p{
                            color: #EA610E;
                        }
                    }
                    .diolog_content_price p:nth-child(1){
                        font-size: 12px;
                    }
                    .diolog_content_price p:nth-child(2){
                        //font-size: 18px;
                      font-size: 14px;
                    }
                }
            }
        }
        .diolog_content_list{
            border-bottom: 1px solid #CCCCCC;
            margin-bottom: 16px;
            li{
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                h2{
                    width: 87px;
                    font-size: 14px;
                }
                .van-radio-group{
                    font-size: 12px;
                    width:calc(100% - 78px);
                    .van-radio{
                        padding: 4px 8px;
                        /*border: 1px solid #E6E6E6;*/
                        /deep/ .van-radio__icon{
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .diolog_content_num{
            display: flex;
            justify-content: space-between;
            margin-bottom: 36px;
            h2{
                font-size: 14px;
            }
            .van-stepper{

            }
        }
        .goods_button{
            display: flex;
            justify-content: center;
            .van-button{
                width: 80%;
                height: 40px;
                background: #1672F9;
                border-radius: 20px;
                box-shadow: none;
                /deep/ .van-button__text{
                    color: white;
                    font-size: 17px;
                }
            }
        }

    }
    .bg{
      background-color: #666666!important;
    }
    .van-popup{
      padding: 50px 70px 80px;
      p{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
      p:first-child{
        border-bottom: 1px solid rgba(112, 112, 112, 0.18);
      }
      a{
        color: #666666!important;
      }
      img{
        margin-right: 5px;
        width: 16px;
        height: 18px;
        vertical-align: middle;
      }
    }
    .grey_background {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 10000;
      background-color: rgba(0, 0, 0, 0.4);
      .invitationPoster_b {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15%;
        box-sizing: border-box;
        flex-direction: column;
        .p_bo{
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          padding: 20px 15% 5px;
          box-sizing: border-box;
          //height: 110px;
        }
        p{
          //margin-top: 5px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
        //p:last-child{
        //  margin-bottom: 5px;
        //}
        .invita_p1{
          position: relative;
          //position: absolute;
          //top: 0;
          //left: 0;
          width: 100%;
          //padding: 20px 15% 0;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img{
            margin-top: 0;
            position: absolute;
            //right: 20px;
            //top: 0;
            right: -40px;
            top: -16px;
            width: 80px;
            object-fit: cover;
          }
          span{
            margin-left: 10px;
            padding: 3px 10px;
            box-sizing: border-box;
            //opacity: 0.81;
            border-radius: 15px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            background-color: rgba(112, 112, 112, 0.81);
          }
        }
        .invita_p2{
          //top: 45px;
        }
        .img_bo{
          position: absolute;
          top: 140px;
          left: 0;
          width: 100%;
          padding: 0 15%;
        }
        img{
          object-fit: cover;
          width: 100%;
          //height: 100%;
        }
      }
    }
    .active_cls{
      color: #486eef;
    }

    .active_login {
      float: left!important;
      margin-top: 10px;
    }
</style>