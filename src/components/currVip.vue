<template>
  <div class="bg" :style="height">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>课程VIP卡</span>-->
<!--    </div>-->
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index)">{{n}}</li>
      </ul>
    </div>
    <div class="cont">
      <div class="cont1" v-show="tabState==1">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg1.png" alt="">
        </div>
        <div class="cont11">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li11:idx==index}" @click="son(idx,item.money)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
            </li>
          </ul>
        </div>
        <div class="cont12">
          <ul>
            <li v-for="(n,index) in contContHead" :key="index" :class="{contContHeadAdd:index==isSelect}" @click="changeCls(index,n.id)">{{n.name}}</li>
          </ul>
        </div>
        <div class="cont13">
          <ul>
            <li v-for="(n,index) in contContCont" :key="index" :class="{contContContAdd:index==isSelect11}" @click="toggleAddCls(index,n.id)">
              <img :src="n.video_cover" alt="">
              <div class="box1">
                <div class="title">{{n.title}}</div>
                <p>{{n.info}}</p>
                <div class="zhengshuBox">
                  <button type="button">课程证书</button>
                  <span>{{n.sell}}人已学</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="nullBox" v-show="show12">
            <img src="../assets/buSchool/nullBoxImg1.png" alt="">
          </div>
        </div>
        <div class="buyBtn1" v-show="btnShow">
          <button @click="kaitongBtn">立即开通</button>
        </div>
      </div>
      <div class="cont2" v-show="tabState==2">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg2.png" alt="">
        </div>
        <div class="cont21">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li12:idx==index}" @click="son(idx,item.money)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
            </li>
          </ul>
        </div>
        <div class="cont22">
          <ul>
            <li v-for="(n,index) in contContHead" :key="index" :class="{contContHeadAdd1:index==isSelect2}" @click="changeCls2(index)">{{n.name}}</li>
          </ul>
        </div>
        <div class="buyBtn2">
          <button @click="kaitongBtn">立即开通</button>
        </div>
      </div>
      <div class="cont3" v-show="tabState==3">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg2.png" alt="">
        </div>
        <div class="cont31">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li13:idx==index}" @click="son(idx,item.money)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
            </li>
          </ul>
        </div>
        <div class="cont32">
          <p>至尊VIP专属权益</p>
          <ul>
            <li>
              <img src="../assets/buSchool/currZz_icon1.png" alt="">
              <span>好课畅学</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon2.png" alt="">
              <span>优先接待</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon3.png" alt="">
              <span>贴心服务</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon4.png" alt="">
              <span>会员标识</span>
            </li>
          </ul>
        </div>
        <div class="buyBtn3">
          <button @click="kaitongBtn">立即开通</button>
        </div>
      </div>
    </div>


  <!--    弹窗-->
  <div class="tanchuang" v-show="tcShow">
      <div class="tanchuangBox">
        <div class="tanchuangBox1">
          <div class="tanchuangBox1Head">
<!--            <img :src="video_cover" alt="">-->
            <div class="titleBox">
              {{ VipTitle }}{{VipCode}}
            </div>
            <div class="tanBoxCont">
              <template v-if="VipTitle == '入门VIP'">
                <p>{{title}}</p>
              </template>
              <template v-if="VipTitle == '贵宾VIP'">
                <p>{{changeCls2Text}}</p>
              </template>
              <template v-else>
<!--                <p>{{changeCls2Text}}</p>-->
              </template>
              <span>￥{{ money }}</span>
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
  </div>
</template>

<script>
export default {
  name: "currVip",
  data(){
    return{
      show12:false,
      btnShow:true,
      height:{
        width:'',
        height:'',
      },
      tabState: 1,
      isActive:'',
      isSelect:'',
      isSelect1:'',
      isSelect11:'',
      isSelect2:'',
      tabList:[
          '入门VIP','贵宾VIP','至尊VIP'
      ],
      contContHead:[],
      contContCont:[],
      monthList:[],
      card_id: 1,
      time_long:1,
      course_id:'',
      category_id:1,
      category_id1:1,

      tcShow:false,
      weixinSelect:true,
      yueSelect:false,
      title:'',
      price:'',
      score:'',
      use_score:0,
      video_cover:'',
      VipTitle:'入门VIP',
      VipCode:'月卡',
      index:0,
      changeCls2Text:'财税',
      money:'',
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight+'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index){
      console.log(index);
      if(index == 0){
        this.VipTitle = '入门VIP'
      }
      if(index == 1){
        this.VipTitle = '贵宾VIP'
      }
      if(index == 2){
        this.VipTitle = '至尊VIP'
      }
      var that = this
      that.isActive = index;
      // console.log(index + 1);
      var index1 = index + 1
      that.tabState = index1;

      that.get_courCard1(index1);

      that.card_id = index1

    },
    changeCls(index,id){
      this.isSelect = index;
      console.log(id);
      this.category_id1 = id;
      console.log(this.category_id1);
      this.get_clsList();
    },
    changeCls1(index){
      this.isSelect1 = index;
    },
    changeCls2(index){
      this.isSelect2 = index;
      console.log(index);
      if(index == 0){
        this.changeCls2Text = '财税'
      }if(index == 1){
        this.changeCls2Text = '法律'
      }if(index == 2){
        this.changeCls2Text = '融资'
      }if(index == 3){
        this.changeCls2Text = '股权'
      }if(index == 4){
        this.changeCls2Text = '资本'
      }if(index == 5){
        this.changeCls2Text = '人力'
      }
    },
    son(idx,money){
      // this.inx = 0
      // this.idx = 0
      // console.log(idx)
      console.log(money);
      this.money = money
      this.index=idx;
      var index1 = idx + 1
      console.log(index1);
      this.time_long = index1
      if(index1 == 1){
        this.VipCode = '月卡'
      }
      if(index1 == 2){
        this.VipCode = '季卡'
      }
      if(index1 == 3){
        this.VipCode = '年卡'
      }

    },
    toggleAddCls(index,id){
      this.isSelect11 = index;
      this.course_id = id
      console.log(this.course_id);
      this.get_courDetails();
    },
    // 获取课程详情
    get_courDetails() {
      console.log(this.course_id);
      this.$post(localStorage.getItem('http') + 'school/get_course_detail',{
        token: sessionStorage.getItem('token'),
        id:this.course_id
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
        // this.course_id = res.data.id
        // console.log(this.course_id)
        if(this.want_study == 1){
          this.lay_type1 = 1
        }
      })
    },


    // 获取课程卡
    get_courCard() {
      this.$post(localStorage.getItem('http') + 'school/get_card',{
        type:1
      })
      .then(res=> {
        console.log(res.data)
        this.monthList= res.data.price
        this.money = res.data.price[0].money
      })
    },
    get_courCard1(index1) {
      this.$post(localStorage.getItem('http') + 'school/get_card',{
        type:index1
      })
      .then(res=> {
        console.log(res.data)
        this.monthList= res.data.price
        this.money = res.data.price[0].money
      })
    },
    // 获取课程分类
    get_class() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        console.log(res.data)
        this.contContHead= res.data
        this.title1 = res.data[0].name
        // this.category_id = res.data.id
        console.log(this.title1)
      })
    },
    // 获取课程列表
    get_clsList(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:page,
        limit:limit,
        category_id:this.category_id1,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont= res.data.list
        // console.log(this.course_id);
        console.log(this.contContCont);
        this.get_courDetails();

        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
          this.btnShow = false;
        }else{
          this.show12 = false;
          this.btnShow = true;
          this.course_id= res.data.list[0].id
        }
      })
    },
    kaitongBtn(){
      this.tcShow = true
      this.get_courDetails();
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
      console.log(this.card_id)
      console.log(this.time_long)
      console.log(this.course_id)
      console.log(this.category_id)

      this.$dialog.confirm({
        title:'是否确认购买',
      })
      .then(()=>{
        console.log('支付中..')
        this.$post(localStorage.getItem('http') + 'school/make_card_order',{
          token: sessionStorage.getItem('token'),
          card_id: this.card_id,
          time_long: this.time_long,
          course_id: this.course_id,
          category_id: this.category_id
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
                    order_type: 3,
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
                                // alert(res);
                              }
                            });
                      })
                }else{
                  console.log('余额支付')
                  this.$post(localStorage.getItem('http') + 'pay/balance_pay',{
                    token: sessionStorage.getItem('token'),
                    order_id: this.order_id,
                    order_type: 3,
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
      })
      .catch(()=>{
        console.log('未支付')
      });
    }




  },
  created(){
    this.hh();
    this.get_courCard();
    this.get_class();
    this.get_clsList();



    var score = sessionStorage.getItem('score');
    this.score = score
    console.log(this.score)

    var open_id = sessionStorage.getItem('openid')
    this.order_id = open_id
    console.log(this.open_id)
  },
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
.tab{
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  //margin-top: 70px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #FFFFFF;
  padding: 0 35px;
  box-sizing: border-box;
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    overflow-x: auto;
    white-space:nowrap;
    li{
      cursor: pointer;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
    }
  }
}
.cur{
  color: #333333!important;
}
.cont{
  position: relative;
  z-index: 1;
  margin-top: 35px;
  width: 100%;
  padding: 15px 0;
  box-sizing: border-box;
  background-color: #f3f4f6;
  .cont1{
    width: 100%;
    padding: 0 0 45px 0;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      padding: 0 15px;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont11{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      padding: 0 15px;
      box-sizing: border-box;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          position: relative;
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #0596EB;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #0596EB;
          }
          .duihaoBox{
            position: absolute;
            top: -13px;
            right: -13px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #D9561D;
            text-align: center;
            line-height: 25px;
            img{
              vertical-align: middle;
              width: 15px;
              height: 14px;
            }
          }
        }
      }
    }
    .cont12{
      width: 100%;
      margin-top: 5px;
      padding: 0 15px;
      box-sizing: border-box;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 20px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
      ul:after {content: "";width: 138px;}
    }
    .cont13{
      width: 100%;
      margin-top: 15px;
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 110px;
          border-bottom: 1px solid rgba(220, 220, 220, 0.34);
          padding: 15px;
          box-sizing: border-box;
          box-sizing: border-box;
          display: flex;
          //justify-content: space-between;
          justify-items: center;
          justify-content: flex-start;
          img{
            margin-right: 5px;
            width: 130px;
            height: 80px;
          }
          .box1{
            position: relative;
            height: 80px;
            .title{
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
            }
            p{
              height: 18px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
            .zhengshuBox{
              position: absolute;
              left: 0;
              bottom: 0;
              height: 18px;
              min-width: 150px;
              button{
                width: 56px;
                height: 18px;
                background: #BED6FF;
                border-radius: 8px;
                font-size: 12px;
                font-family: PingFang SC;
                color: #2B78FF;
                outline: none;
                border: 0;
                line-height: 16px;
              }
              span{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 4px;
              }
            }
          }
        }
      }
      .nullBox{
        width: 100%;
        text-align: center;
        img{
          width: 50%;
          height: 50%;
          object-fit: cover;
        }
      }
    }
  }
  .cont2{
    width: 100%;
    padding: 0 15px 45px 15px;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont21{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #F19A45;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #F19A45;
          }
        }
      }
    }
    .cont22{
      width: 100%;
      margin-top: 5px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 20px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 2px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
      ul:after {content: "";width: 138px;}
    }
  }
  .cont3{
    width: 100%;
    padding: 0 15px 45px 15px;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont31{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #D9561D;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #D9561D;
          }
        }
      }
    }
    .cont32{
      width: 100%;
      margin-top: 15px;
      p{
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }
      ul{
        width: 100%;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        li{
          width: 52px;
          text-align: center;
          img{
            width: 48px;
            height: 48px;
          }
          span{
            width: 100%;
          }
        }
      }
    }
  }
  .contContHeadAdd{
    background: rgba(13, 104, 255, 0.27)!important;
    color: #0E69FF!important;
  }
  .contContHeadAdd1{
    background: rgba(241, 154, 69, 0.27)!important;
    color: #D7761E!important;
  }
  .contContContAdd{
    box-shadow:2px 2px 5px #cccccc;
  }
  .li11{
    border: 2px solid #0596EB!important;
  }
  .li12{
    border: 2px solid #F19A45!important;
  }
  .li13{
    border: 2px solid #D9561D!important;
  }
}
.buyBtn1,.buyBtn2,.buyBtn3{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  button{
    width: 100%;
    height: 42px;
    margin-top: 7px;
    background: #0596EB;
    border-radius: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
}
.buyBtn2{
  button{
    background: #F3B451;
  }
}
.buyBtn3{
  button{
    background: #D9561D;
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
  z-index: 1999;
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
        //display: flex;
        //justify-content: flex-start;
        img{
          width: 78px;
          height: 78px;
          object-fit: cover;
        }
        .titleBox{
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          color: #1672F9;
        }
        .tanBoxCont{
          width: 100%;
          //margin-left: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
  padding: 12px 0 24px 0;
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
      height: 24px;
      line-height: 24px;
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