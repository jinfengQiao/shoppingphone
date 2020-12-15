<template>
  <div class="bg" :style="height">
    <div class="head">
      <img src="../assets/center/back_icon1.png" alt="" @click="back">
      <span>课程详情</span>
    </div>
    <div class="videoBox">
      <video id="myVideo"
       class="video-js"
       controls
       preload="auto"
       :poster="video_cover"
       :src="video"
       >
      </video>
    </div>
    <div class="cont">
      <div class="titleBox">
        <div class="title">{{ title }}</div>
        <div class="money">
          <div class="money1">￥{{ price }}</div>
          <div class="money2" v-show="show">
            <div class="span1">特价</div>
            <div class="span2">仅限今天</div>
          </div>
        </div>
        <div class="topMoney">￥{{ old_price }}</div>
        <div class="buyBox">
          <div class="buyBox1">
            <p>成为VIP会员，可看全套教程</p>
            <button @click="jumpCurrVip">立即开通 ></button>
          </div>
        </div>
      </div>
      <div class="introBox">
        <div class="title">课程介绍</div>
        <div class="introCont" v-html="content"></div>
      </div>
      <div class="listBox">
        <div class="currList" v-for="(n,inx) in lesson" :key="inx">
          <span>{{n.title}}</span>
          <ul>
            <li v-for="(spu,k) in n.child" :key="k">
              <img src="../assets/buSchool/listBox_icon.png" alt="">
              <p>{{n.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer_wantStudy">
      <div class="dianzan" @click="layOut">
        <img v-if="lay_type" src="../assets/buSchool/dianzan_icon_sec.png" alt />
        <img v-else src="../assets/buSchool/dianzan_icon.png" alt />
        <span>点赞</span>
      </div>
      <div class="xiangxue" @click="layOut1">
        <img v-if="lay_type1" src="../assets/buSchool/xiangxue_icon_sec.png" alt="">
        <img v-else src="../assets/buSchool/xiangxue_icon.png" alt="">
        <span>想学</span>
      </div>
      <button @click="payClick">+ 加入学习</button>
    </div>

<!--    弹窗-->
    <div class="tanchuang" v-show="tcShow">
      <div class="tanchuangBox">
        <div class="tanchuangBox1">
          <div class="tanchuangBox1Head">
            <img :src="video_cover" alt="">
            <div class="tanBoxCont">
              <p>{{title}}</p>
              <span>￥{{ price }}</span>
            </div>
            <div class="guanbi">
              <img src="../assets/center/zhifuTancTuichu.png" alt="" @click="guanbi">
            </div>
          </div>
          <div class="payMethod">
            <p>选择支付方式</p>
            <div class="zhifuBox">
              <div class="weixinZhifu" @click="weixinZhifu">
                <div class="weixinZhifuLeft">
                  <img src="../assets/center/wechat.png" alt="" class="img1">
                  <span>微信支付</span>
                </div>
                <div class="weixinZhifuRight">
                  <input type="radio" name="zhifu" checked>
                  <img src="../assets/center/select_icon.png" alt="" class="img2" v-show="weixinSelect">
                </div>
              </div>
              <div class="yueZhifu" name="zhifu" @click="yueZhifu">
                <div class="yueZhifuLeft">
                  <img src="../assets/center/yue.png" alt="" class="img1">
                  <span>余额支付</span>
                </div>
                <div class="yueZhifuRight">
                  <input type="radio" name="zhifu">
                  <img src="../assets/center/select_icon.png" alt="" class="img2" v-show="yueSelect">
                </div>
              </div>
            </div>
          </div>
          <div class="jifenBox">
            <div class="jifenBox1">
              <div class="duihuan">
                <!--                <img src="../assets/center/duihuan_bg.png" alt=""> -->
                积分兑换
              </div>
              <div class="jifenBox1Ri">100积分 = 1元</div>
            </div>
            <div class="jifenBox2">
              <div class="jifenBox2Le">我的积分 <span>{{ score }}</span></div>
              <input type="number" placeholder="输入兑换积分" v-model="use_score">
            </div>
          </div>
          <div class="btnBox">
            <button @click="buyBtn">立即购买</button>
          </div>
        </div>
      </div>
    </div>
<!--    <payComp></payComp>-->
  </div>
</template>

<script>
// import payComp from "@/components/payComp";
export default {
  name: "courDetails",
  data(){
    return{
      show:true,
      // show1:false,
      height:{
        width:'',
        height:'',
      },
      lay_type:0,
      lay_type1:0,
      id:'',
      title:'',
      content:'',
      price:'',
      old_price:'',
      special:'',
      video:'',
      video_cover:'',
      want_study:'',
      lesson:'',
      lesson_id:'',
      course_id:'',
      tcShow:false,
      weixinSelect:true,
      yueSelect:false,
      order_id:'',
      order_type:'',
      code:'',
      openid_code:'',
      open_id:'',
      use_score: 0,
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight-70 +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    layOut(){
      var that = this
      if(that.lay_type == 0){
        that.lay_type = 1
      }else{
        that.lay_type = 0
      }
    },
    layOut1(){

      // console.log(this.course_id)
      this.$post(localStorage.getItem('http') + 'school/want_study',{
        course_id:this.course_id,
        token: sessionStorage.getItem('token')
      })
      .then(res=> {
        console.log(res.data)
        var data = res.data
        console.log(data)
        if(res.data == 1){
          console.log('添加成功');
          this.lay_type1 = 1
          this.data = 1
          this.want_study = 1
        }
        if(res.data == 0){
          console.log('取消成功');
          this.lay_type1 = 0
          this.data = 0
          this.want_study = 0
          console.log(this.want_study)
        }
      })
    },
    // 获取课程详情
    get_courDetails(id) {
      // console.log(id);
      this.$post(localStorage.getItem('http') + 'school/get_course_detail',{
        token: sessionStorage.getItem('token'),
        id:id
      })
      .then(res=> {
        console.log(res.data)
        this.title = res.data.title
        this.content = res.data.content
        this.price = res.data.price
        this.old_price = res.data.old_price
        this.special = res.data.special
        this.video = res.data.video
        this.video_cover = res.data.video_cover
        this.want_study = res.data.want_study
        // console.log(this.want_study)
        this.lesson = res.data.lesson
        // this.lesson_id = this.lesson[0].id
        this.course_id = res.data.id
        console.log(this.course_id)
        if(this.want_study == 1){
          this.lay_type1 = 1
        }
      })
    },
    // 点击开通跳转vip卡页
    jumpCurrVip(){
      this.$router.push('./currVip');
    },
    payClick(){
      // this.show1 = true
      // console.log(payComp.tcShow)
      // payComp.tcShow = true
      this.tcShow = true
    },
    guanbi(){
      this.tcShow = false
    },
    weixinZhifu(){
      this.weixinSelect = true
      this.yueSelect = false
      // console.log('微信支付')
    },
    yueZhifu(){
      this.weixinSelect = false
      this.yueSelect = true
      // console.log('余额支付')
    },
    buyBtn(){
      console.log(this.course_id)
      this.$post(localStorage.getItem('http') + 'school/make_course_order',{
        token: sessionStorage.getItem('token'),
        course_id: this.course_id,
        // lesson_id: this.lesson_id
        lesson_id:0
      })
      .then(res=> {
        console.log(res.data)
        if(res.code == 1){
          // console.log('下单成功');
          this.order_id = res.data.order_id
          console.log(this.order_id);
          this.order_type = res.data.order_type
          console.log(this.order_type);
          // 余额支付
          if(this.weixinSelect == true){
            console.log('微信支付')

            this.$post(localStorage.getItem('http') + 'pay/wechat_pay',{
              token: sessionStorage.getItem('token'),
              order_id: this.order_id,
              openid: localStorage.getItem('openid'),
              order_type: 5,
              use_score: this.use_score
            })
            .then(res=> {
              console.log(res)
              window.WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', res ,
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                      location.href = "/#/lesson";
                      // this.$router.push({
                      //   path: '/lesson'
                      // })
                    }else{
                      alert(res);
                    }
                  });
            })

          }else{
            console.log('余额支付')
            this.$post(localStorage.getItem('http') + 'pay/balance_pay',{
              token: sessionStorage.getItem('token'),
              order_id: this.order_id,
              order_type: 5,
              use_score: this.use_score
            })
            .then(res=> {
              console.log(res)
              if(res.code == 0){
                // console.log('余额不足')
                this.$toast.error(res.msg)
              }
              if(res.code == 1){
                this.$toast.success(res.msg);
                this.$router.push('./lesson');
              }
            })
          }
        }else{
          this.$toast.error(res.msg)
        }
      })
    }
  },
  created(){
    var score = sessionStorage.getItem('score');
    this.score = score
    console.log(this.score)

    var open_id = sessionStorage.getItem('openid')
    this.order_id = open_id
    console.log(this.open_id)

    let id =this.$route.query.id;
    // console.log(id);
    this.hh();
    this.get_courDetails(id);
    // this.get_want_study();
  },
  components: {
    // payComp
  }
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: #f3f4f6;
}
.head{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: #ffffff;
  z-index: 9999;
  img{
    position: absolute;
    left: 15px;
    top: 26px;
    width: 10px;
    height: 18px;
  }
  span{
    text-align: center;
    width: 100%;
    display: block;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
}
.videoBox{
  float: left;
  position: relative;
  margin-top: 70px;
  width: 100%;
  height: 201px;
  //background: url("../assets/buSchool/videoBox_bg.png") no-repeat;
  //background-size: 100% 100%;
  video{
    width: 100%;
    height: 100%;
  }
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -41px;
    margin-top: -41px;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
}
.cont{
  float: left;
  width: 100%;
  //margin-top: 70px;
  padding: 0 0 56px;
  box-sizing: border-box;
  background-color: #ffffff;
  .titleBox{
    float: left;
    position: relative;
    width: 100%;
    height: 164px;
    border-bottom: 2px solid #f3f4f6;
    padding: 15px 15px;
    box-sizing: border-box;
    .title{
      float: left;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .money{
      float: left;
      width: 100%;
      margin-top: 22px;
      .money1{
        float: left;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .money2{
        float: left;
        margin-left: 10px;
        .span1{
          display: inline-block;
          padding: 0 4px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          background: #F53334;
          border: 1px solid #F53334;
          border-radius: 2px 0px 0px 2px;
        }
        .span2{
          display: inline-block;
          padding: 0 4px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #F53334;
          border: 1px solid #F53334;
          border-radius: 0px 2px 2px 0px;
        }
      }
    }
    .topMoney{
      float: left;
      width: 100%;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      text-decoration: line-through;
      color: #999999;
      padding: 0 6px;
      box-sizing: border-box;
    }
    .buyBox{
      position: absolute;
      bottom: 15px;
      left: 0;
      width: 100%;
      height: 30px;
      padding: 0 15px;
      box-sizing: border-box;
      .buyBox1{
        width: 100%;
        height: 30px;
        background: rgba(245, 48, 51, 0.15);
        border-radius: 2px;
        padding: 5px 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        p{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        button{
          padding: 0 6px;
          height: 20px;
          background: linear-gradient(90deg, #F53033 0%, #F67645 100%);
          border-radius: 10px;
          outline: none;
          border: 0;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
  }
  .introBox{
    float: left;
    width: 100%;
    //height: 164px;
    border-bottom: 2px solid #f3f4f6;
    padding: 15px 15px;
    box-sizing: border-box;
    .title{
      float: left;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .introCont{
      float: left;
      width: 100%;
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      text-indent: 2em;
    }
  }
  .listBox{
    float: left;
    width: 100%;
    padding: 5px 15px 15px;
    box-sizing: border-box;
    .currList{
      margin-top: 10px;
      width: 100%;
      span{
        width: 100%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }
      ul{
        width: 100%;
        li{
          margin-top: 10px;
          width: 100%;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
          background: #F3F4F6;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img{
            width: 16px;
            height: 12px;
          }
          p{
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.footer_wantStudy{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dianzan{
    display: none;
    img{
      margin-right: 5px;
      width: 16px;
      height: 15px;
    }
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
  .xiangxue{
    img{
      margin-right: 5px;
      width: 15px;
      height: 13px;
    }
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
  button{
    width: 180px;
    height: 32px;
    background: #0596EB;
    border-radius: 17px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
}

//弹窗
.tanchuang{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 99999;
  color: #ffffff;
  .tanchuangBox{
    position: absolute;
    top: 50%;
    margin-top: -180px;
    width: 100%;
    //height: 360px;
    padding: 0 30px;
    box-sizing: border-box;
    .tanchuangBox1{
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0px 2px 10px rgba(204, 204, 204, 0.5);
      opacity: 1;
      border-radius: 5px;
      padding: 15px;
      box-sizing: border-box;
      .tanchuangBox1Head{
        position: relative;
        width: 100%;
        height: 78px;
        display: flex;
        justify-content: flex-start;
        img{
          width: 78px;
          height: 78px;
          object-fit: cover;
        }
        .tanBoxCont{
          margin-left: 12px;
          p{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            display: -webkit-box;
            -webkit-line-clamp:2;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            padding: 0 20px 0 0;
            box-sizing: border-box;
          }
          span{
            font-size: 18px;
            font-family: Roboto;
            font-weight: 400;
            line-height: 36px;
            color: #EA610E;
          }
        }
        .guanbi{
          position: absolute;
          right: -6px;
          top: -6px;
          img{
            width: 24px;
            height: 24px;
            object-fit: cover;
          }
        }
      }
      .payMethod{
        padding: 16px 0 0 0;
        box-sizing: border-box;
        width: 100%;
        p{
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .zhifuBox{
          margin-top: 14px;
          padding: 0 0 15px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #dddddd;
          .weixinZhifu{
            position: relative;
            display: flex;
            height: 35px;
            justify-content: space-between;
            //align-items: center;
            margin-bottom: 15px;
            .weixinZhifuLeft{
              img{
                float: left;
                width: 35px;height: 35px;
              }
              span{
                float: left;
                margin-left: 7px;
                line-height: 35px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
              }
            }
            .weixinZhifuRight{
              img{
                float: right;
                width: 18px;height: 18px;
                margin-top: 8px;
              }
              input{
                opacity: 0;
                position: absolute;
                right:0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
          .yueZhifu{
            position: relative;
            display: flex;
            height: 35px;
            justify-content: space-between;
            align-items: center;
            .yueZhifuLeft{
              img{
                float: left;
                width: 35px;height: 35px;
              }
              span{
                float: left;
                margin-left: 7px;
                line-height: 35px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
              }
            }
            .yueZhifuRight{
              img{
                float: right;
                width: 18px;height: 18px;
                margin-top: 8px;
              }
              input{
                opacity: 0;
                position: absolute;
                right:0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
.jifenBox{
  width: 100%;
  //height: 100px;
  padding: 12px 0;
  box-sizing: border-box;
  .jifenBox1{
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .duihuan{
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      img{
        vertical-align: middle;
        width: 16px;
        height: 16px;
      }
    }
    .jifenBox1Ri{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1672F9;
    }
  }
  .jifenBox2{
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jifenBox2Le{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      span{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
      }
    }
    input{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      width: 100px;
      border: 1px solid #999999;
      border-radius: 2px;
      outline: none;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
}
.btnBox{
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  button{
    //margin-top: 20px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    border: 0;
    outline: none;
    background: #1672F9;
    border-radius: 20px;
    font-size: 18px;
    font-family: PingFang SC;
    color: #FFFFFF;
  }
}
</style>