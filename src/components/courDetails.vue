<template>
  <div class="big_b" :style="height">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>课程详情</span>-->
<!--    </div>-->
    <div class="videoBox">
      <template v-if="this.video">
        <video id="myVideo"
           class="video-js"
           controls
           preload="auto"
           :poster="video_cover"
           :src="video"
        />
      </template>
      <template v-else>
        <img :src="video_cover" alt="">
      </template>
    </div>
    <div class="cont">
      <div class="titleBox">
        <div class="title">{{ title_title }}</div>
        <div class="money">
          <template>
            <div class="money1" v-show="price1_Frame">￥{{ price1 }}</div>
          </template>
          <template>
            <div class="money1" style="color: green;" v-show="!price1_Frame">免费</div>
          </template>
          <div class="money2" v-show="show">
            <div class="span1">特价</div>
            <div class="span2">仅限今天</div>
          </div>
        </div>
        <div class="topMoney">￥{{ old_price }}</div>
        <div class="estimate_share_b">
          <div class="estimate">
            <template v-if="existence_token">
              预计返佣：{{this.two_back}} ~ {{this.one_back}}元
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
        <div class="buyBox">
          <div class="buyBox1">
            <p>成为VIP会员，可看全套教程</p>
            <button @click="jumpCurrVip">立即开通 ></button>
          </div>
        </div>
      </div>
      <van-tabs v-model="active_tab" sticky @change="change_tab">
        <van-tab title="课程介绍">
          <div class="introBox">
<!--            <div class="title">课程介绍</div>-->
            <div class="introCont" v-html="content"></div>
          </div>
        </van-tab>
        <van-tab :title="count">
          <div class="listBox">
            <div class="currList">
              <ul>
                <li  v-for="(n,inx) in lesson" :key="inx" @click="playVideo(n)">
                  <div class="img_b">
                    <img :src="n.video_cover" alt="">
                  </div>
                  <div class="ri_b">
                    <p class="title">
                      <span class="p_sma_b">
                      <img src="../assets/buSchool/video_play.png" alt="">
                      <span>
                        {{n.title}}
                      </span>
                      </span>
                    </p>
                    <p>
                      <span>
                        <template v-if="n.have == true">
                          <template v-if="n.rule != 1 || n.rule != 2 || n.rule != 3">已购买</template>
                        </template>
                        <template v-if="n.have == false">
                          <template v-if="n.rule == 1">
                            试看{{n.try_see_time_s}}秒
                          </template>
                          <template v-else-if="n.rule == 2">
                            免费
                          </template>
                          <template v-else-if="n.rule == 3">未购买</template>
                          <template v-else>已购买</template>
                        </template>
                      </span>
                      <span>{{ n.hit }}次观看</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </van-tab>
      </van-tabs>



    </div>
    <div class="footer_wantStudy">
      <div class="footLeft_b">
        <div class="submit_b_1" @click="back_index">
          <img src="../assets/footer/index_icon1.png" alt="" class="submit_b_img">
          <span class="submit_b_span">首页</span>
        </div>
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
      </div>
      <template v-if="show_price">
        <button @click="payClick">加入学习</button>
      </template>
      <template v-else>
        <button class="btn_price">加入学习</button>
      </template>
    </div>

<!--    弹窗-->
    <div class="tanchuang" v-show="tcShow">
      <div class="tanchuangBox">
        <div class="tanchuangBox1">
          <div class="tanchuangBox1Head">
            <img :src="video_cover" alt="">
            <div class="tanBoxCont">
              <p>{{title_title}}</p>
              <span>￥{{ price1 }}</span>
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
    <div class="playVideoBox" v-show="playVideoBox">
      <div class="video11">
        <video ref="video" id="video" :src="video_url" autoplay="autoplay" controls="controls"></video>
        <img src="../assets/center/zhifuTancTuichu.png" alt="" @click="guanbiViode">
      </div>
    </div>
<!--    <payComp></payComp>-->

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
          <img :src="pic_url" alt="" @click.stop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {exitFullscreen} from '@/utils/tools'
export default {
  name: "courDetails",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      playVideoBox:false,
      show:true,
      price1_Frame:true,
      lay_type:0,
      lay_type1:0,
      id:'',
      content:'',
      price:'',
      old_price:'',
      special:'',
      video:'',
      video_cover:'',
      video_url:'',
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
      have:'',
      price1:'',
      lessonId:'',
      title: '',
      integrityurl:'',
      // logo:'https://m.tjqpjt.com/logo.png',
      desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
      imgUrl: '',
      existence_token:true,
      active_tab:1,
      title_title:'',
      two_back:'',
      one_back:'',
      count:'',
      limit:'',
      show_share:false,
      pic_url:'',
      isActive:true,
      timeout: '',
      show_price:true,
      goods_id:'',
    }
  },
  methods:{
    get_height(){
      this.height.height = window.innerHeight +'px'
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
      }else{
        this.$post(localStorage.getItem('http') + 'school/want_study',{
          course_id:this.course_id,
          token: localStorage.getItem('token')
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
      }

    },
    // 获取课程详情
    get_courDetails(id) {
      // console.log(id)
      this.$post(localStorage.getItem('http') + 'school/get_course_detail',{
        token: localStorage.getItem('token'),
        id:id
      })
      .then(res=> {
        console.log(res)
        this.have = res.data.have
        this.lessonId = res.data.id
        this.id_share = res.data.id
        this.title_title = res.data.title
        this.two_back = (res.data.two_back/100).toFixed(2)
        this.one_back = (res.data.one_back/100).toFixed(2)
        this.title = res.data.title
        this.content = res.data.content
        this.price = res.data.price
        this.price1 = (this.price/100).toFixed(2)
        if(this.price1 == 0.00 || this.price1 == 0){
          this.price1_Frame = false
        }else{
          this.price1_Frame = true
          this.price1 = (this.price/100).toFixed(2)
        }
        this.old_price = (res.data.old_price/100).toFixed(2)
        this.special = res.data.special
        this.video = res.data.video
        this.video_cover = res.data.video_cover
        this.want_study = res.data.want_study
        // console.log(this.want_study)
        // this.lesson_id = this.lesson[0].id
        this.course_id = res.data.id
        this.add_score(this.course_id)
        // localStorage.setItem("goods_id",res.data.id);
        // console.log(this.course_id)
        if(this.want_study == 1){
          this.lay_type1 = 1
        }

        if(this.price == 0 || this.have == true){
          this.show_price = false
        }

        console.log(location.href)
        // this.$wxShare(this.title_title,this.desc,location.href,res.data.video_cover,res.data.id,4)
        this.$wxShare(this.title_title,this.desc,location.href,res.data.video_cover)
      })
    },
    jumpLogin(){
      this.$router.push('./login');
    },
    change_tab(e){
      if(e == 1){
        // 获取目录列表
        this.$post(localStorage.getItem('http') + 'school/get_lesson',{
          id : this.id_set,
          token: localStorage.getItem('token'),
        }).then(res=> {
          console.log(res)
          this.lesson = res.data.list
          this.title = res.data.list[0].title
          this.count = '目录 ' + '(' + res.data.count + ')'
        })
      }
    },
    // 获取目录列表
    get_lesson_list(){
      this.$post(localStorage.getItem('http') + 'school/get_lesson',{
        id : this.id_set,
        token: localStorage.getItem('token'),
      }).then(res=> {
        console.log(res)
        this.lesson = res.data.list
        this.title = res.data.list[0].title
        this.count = '目录 ' + '(' + res.data.count + ')'
      })
    },
    // 点击开通跳转vip卡页
    jumpCurrVip(){
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
        console.log(this.course_id)
        this.$router.push({
            path: './currVip',
            query:{
              id: this.course_id
            }
        });
      // }
    },
    payClick(){
      // this.show1 = true
      // console.log(payComp.tcShow)
      // payComp.tcShow = true
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
      }else{
        this.tcShow = true
      }

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
      this.$dialog.confirm({
        title:'是否确认购买',
        // message:'取消，确认',
      })
      .then(()=>{
        this.$post(localStorage.getItem('http') + 'school/make_course_order',{
          token: localStorage.getItem('token'),
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
                token: localStorage.getItem('token'),
                order_id: this.order_id,
                openid: localStorage.getItem('openid'),
                order_type: 5,
                use_score: this.use_score
              })
              .then(res=> {
                function onBridgeReady(res){
                  window.WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', res ,
                    function(res){
                      console.log(res);
                      if(res.err_msg == "get_brand_wcpay_request:ok"){
                        location.href = "/#/lesson";
                        // this.$router.push({
                        //   path: '/lesson'
                        // })
                      }
                    });
                }

                if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady(res), false);
                  }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady(res));
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(res));
                  }
                }else{
                  onBridgeReady(res);
                }

                console.log(res)

              })

            }else{
              console.log('余额支付')
              this.$post(localStorage.getItem('http') + 'pay/balance_pay',{
                token: localStorage.getItem('token'),
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
      })
      .catch(()=>{
        console.log('未支付')
      });

    },
    // 播放视频
    playVideo(n){
      console.log(n)
      this.lesson_id = n.id
      var video = document.getElementById("video");
      if(n.have == true){
        this.video_url = n.video_url
        this.playVideoBox = true;
        if(video.pause){
          video.play();
        }
        this.viewing_times();
      }else{
        console.log(this.rule)
        if(n.rule == 1){
          console.log(n)
          this.limit = n.try_see_time_s
          console.log(this.limit)
          this.video_url = n.video_url
          this.playVideoBox = true;
          if(video.pause){
            video.play();
          }else{
            video.pause();
          }
          this.get_time();
          this.viewing_times();
        }
        if(n.rule == 2){
          // console.log('免费')
          this.video_url = n.video_url
          this.playVideoBox = true;
          if(video.pause){
            video.play();
          }else{
            video.pause();
          }
          this.viewing_times();
        }
        if(n.rule == 3){
          this.$toast.error('尚未购买')
        }
      }
    },
    // 关闭视频播放
    guanbiViode(){
      this.playVideoBox = false;
      this.$refs.video.removeEventListener('pause',this.get_addevent)
      this.$refs.video.removeEventListener('play',this.get_addevent1)
      this.$refs.video.currentTime = 0
      this.$refs.video.pause();
      clearTimeout(this.timeout);
    },
    // 返回首页
    back_index(){
      this.$router.push({path:'/'});
    },
    // 邀请好友 海报
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
      }else{
        this.show_share = true
        this.$post(localStorage.getItem('http') + 'school/make_playbill', {
          token: localStorage.getItem('token'),
          id:this.id_share
        }).then(res => {
          console.log(res)
          if(res.code == 1){
            // console.log(res)
            this.pic_url = res.data.pic_url
          }
        })
      }
    },
    // 关闭邀请海报弹窗
    close_invitationPoster(){
      this.show_share = false
    },
    // 观看拦截
    get_time(){
      console.log(this.limit);
      // let date = this.limit * 1000`
      //
      this.$refs.video.addEventListener('play', this.get_addevent1)
      this.$refs.video.addEventListener('pause',this.get_addevent)
      this.$refs.video.addEventListener('seeking', (e) => {
        if(e.target.currentTime > this.limit){
          this.$refs.video.pause();
          this.$refs.video.currentTime = this.limit
          this.tcShow = true
          console.log('结束')
        }
      })
    },
    // 观看次数
    viewing_times(){
      this.$post(localStorage.getItem('http') + 'school/lesson_hit', {
        lesson_id:this.lesson_id
      }).then(res => {
        console.log(res)
        if(res.code == 1){
          // console.log(res)
          this.pic_url = res.data.pic_url
        }
      })
    },
    get_addevent1(e) {
      console.log(e.target.currentTime)
      if(e.target.currentTime > this.limit){
        this.$refs.video.pause();
        this.$refs.video.currentTime = this.limit
        this.tcShow = true
      }else{
        const newDate = this.limit - e.target.currentTime
        this.timeout = setTimeout(() => {
          console.log('结束')
          exitFullscreen('#video');
          this.$refs.video.pause();
          clearTimeout(this.timeout)
          this.tcShow = true
        },newDate * 1000)
      }
    },
    get_addevent(e){
        console.log(e.target.currentTime)
        if(e.target.currentTime > this.limit){
          this.$refs.video.pause();
          this.$refs.video.currentTime = this.limit
          this.tcShow = true
        }else{
          // if(this.playVideoBox) {
          const newDate = this.limit - e.target.currentTime
          this.timeout = setTimeout(() => {
            console.log('结束')
            this.$refs.video.pause();
            clearTimeout(this.timeout)
            this.tcShow = true
          },newDate * 1000)
          // }
        }
    },
    // 浏览增加积分
    add_score(){
      console.log(this.course_id)
      this.$post(localStorage.getItem('http') + 'user_score/add', {
        token: localStorage.getItem('token'),
        source:2,
        goods_id:this.course_id,
        goods_type:4
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


  },
  created(){
    this.get_height();
    var score = localStorage.getItem('score');
    this.score = score
    // console.log(this.score)


    let id = this.$route.query.id;
    console.log(id);

    this.id_set = id
    console.log(this.id_set);
    this.get_courDetails(id);
    this.get_lesson_list(id);

    this.changeUrl();
  },
  components: {
    // payComp
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
.big_b{
  padding: 0 0 62px;
  box-sizing: border-box;
  overflow: auto;
  background-color: white;
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
  //margin-top: 70px;
  width: 100%;
  height: 201px;
  //background: url("../assets/buSchool/videoBox_bg.png") no-repeat;
  //background-size: 100% 100%;
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  //img{
  //  position: absolute;
  //  left: 50%;
  //  top: 50%;
  //  margin-left: -41px;
  //  margin-top: -41px;
  //  width: 82px;
  //  height: 82px;
  //  object-fit: cover;
  //}
}
.cont{
  float: left;
  width: 100%;
  //margin-top: 70px;
  background-color: #ffffff;
  .titleBox{
    float: left;
    position: relative;
    width: 100%;
    //height: 164px;
    border-bottom: 2px solid #f3f4f6;
    padding: 15px 15px 55px 15px;
    box-sizing: border-box;
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
        box-shadow: 0px 3px 6px rgba(255, 145, 0, 0.64);
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
    //预计返佣
    .estimate{
      float: left;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      border-radius: 2px;
      padding: 3px 10px;
      box-sizing: border-box;
      background-color: rgb(72, 110, 239);
    }
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
    padding: 0 15px 15px 15px;
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
    padding: 0 15px 15px;
    box-sizing: border-box;
    .currList{
      //margin-top: 10px;
      width: 100%;
      ul{
        width: 100%;
        li:first-child{
          margin-top: 0;
        }
        li{
          margin-top: 10px;
          width: 100%;
          //height: 100px;
          font-size: 14px;
          font-family: PingFang SC;
          color: #666666;
          padding: 18px 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #cccccc;
          box-sizing: border-box;
          .img_b{
            width: 100px;
            display: flex;
            align-items: center;
            margin-right: 20px;
          }
          img{
            width: 100px;
            object-fit: cover;
            border-radius: 4px;
          }
          .ri_b{
            flex: 1;
            height: 100%;
            .title{
              color: #333333;
              font-weight: bold;
              .p_sma_b{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                img{
                  margin-top: 7px;
                }
              }
            }
            img{
              width: 20px;
              object-fit: cover;
              margin-right: 4px;
              vertical-align: middle;
            }
            p{
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              font-family: PingFang SC;
              color: #666666;
              line-height: 32px;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
.footer_wantStudy {
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
  .submit_b_1 {
    height: 100%;
    width: 60px;
    text-align: center;
  }
  .submit_b_img {
    margin-top: 10px;
    width: 22px;
    height: 22px;
  }
  .submit_b_span {
    display: inline-block;
    width: 100%;
  }
  .dianzan {
    display: none;
    img {
      margin-right: 5px;
      width: 16px;
      height: 15px;
    }
    span {
    }
  }
  .xiangxue {
    height: 100%;
    width: 60px;
    text-align: center;
    margin-left: 18px;
    img {
      margin-top: 12px;
      width: 22px;
      height: 20px;
    }
    span {
      display: inline-block;
      width: 100%;
    }
  }

  button {
    background: #ff0000;
    box-shadow: 0px 3px 5px rgba(223, 92, 107, 0.5);
    //border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    outline: none;
    border: 0;
    height: 100%;
    width: 154px;
    text-align: center;
  }
}

//弹窗
.tanchuang{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  //background-color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2001;
  color: #ffffff;
  .tanchuangBox{
    position: absolute;
    top: 50%;
    margin-top: -180px;
    width: 100%;
    //height: 360px;
    padding: 0 30px;
    box-sizing: border-box;
    z-index: 2001;
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
.playVideoBox{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1999;
  color: #ffffff;
  .video11{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -100px;
    margin-left: -50%;
    width: 100%;
    height: 201px;
    background-color: #ccc;
    video{
      width: 100%;
      height: 201px;
    }
    img{
      position: absolute;
      right: 5px;
      top: -30px;
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }
}
.free_box{
  color: #FF0000;
  display: inline;
  margin-left: 10px;
  font-size: 12px;
  padding: 2px 4px;
  box-sizing: border-box;
  background-color: rgba(255,0,65,0.1);
  font-width: 400;
}
.van-tabs{
  float: left;
  width: 100%;
}
.grey_background {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
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
      width: 100%;
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
.active_login{
  float: left!important;
  margin-top: 10px;
}
.btn_price{
  background-color: #999999!important;
}
video{
  position: relative;
  z-index: 2000;
  width: 100%;
  height: 100%;
}
</style>