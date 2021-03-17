<template>
  <div class="bg">
    <div class="headBox">
      <div class="head">
<!--        <div class="headTitle">个人中心</div>-->
        <div class="tuichuBtn" v-show="isWeixin">
          <img src="../assets/center/tuichuBtn.png" alt="" @click="tuichuBtn">
        </div>
        <div class="denglu">
          <div class="headImg">
            <img :src="face_url" alt="">
          </div>
          <div class="nameBox">
            <div class="name" @click="nojumpCodeLogin && jumpCodeLogin()">{{ zhuangtai }}</div>
            <div class="modify" @click="jumpModifyPage" v-show="show1">
              <img src="../assets/center/modify_icon.png" alt="">
            </div>
          </div>
        </div>
        <div class="vip" v-show="show1">
          <div class="vipBox">
            <img src="../assets/center/vip_icon.png" alt="">
            <span @click="jumpMember">{{nicheng}}</span>
          </div>
        </div>
        <div class="tab">
          <div class="tabBox">
            <ul>
              <li @click="jumpMy_order(inx)" v-for="(n,inx) in tabBoxList" :key="inx">
                <img :src="n.imgurl" alt="">
                <span>{{ n.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="serTitle">我的服务</div>
      <ul>
        <li v-for="(n,inx) in serList" :key="inx" @click="jumpJ">
          <img :src="n.imgurl" alt="">
          <span>{{n.text}}</span>
        </li>
      </ul>
    </div>
    <footer_nav></footer_nav>
    <noSharing></noSharing>
  </div>
</template>

<script>
import footer_nav from "@/components/footer_bar";
import noSharing from "@/components/noSharing";
// token: localStorage.getItem('token'),
export default {
  name: "center",
  data() {
    return{
      height:{
        wdith:'',
        height:'',
      },
      isWeixin:false,
      token:'',
      show1:'',
      nicheng:'',
      face_url:'',
      zhuangtai:'未登录',
      balance:'',
      serList:[
        {
          imgurl:require('../assets/center/ser_icon1.png'),
          text:'返利'
        },
        {
          imgurl:require('../assets/center/ser_icon_guize.png'),
          text:'返利规则'
        },
        {
          imgurl:require('../assets/center/ser_icon2.png'),
          text:'积分'
        },
        {
          imgurl:require('../assets/center/ser_icon3.png'),
          text:'余额'
        },
        {
          imgurl:require('../assets/center/ser_icon4.png'),
          text:'我的咨询卡'
        },
        {
          imgurl:require('../assets/center/ser_icon5.png'),
          text:'我想学'
        },
        {
          imgurl:require('../assets/center/ser_icon6.png'),
          text:'我的课程'
        },
        {
          imgurl:require('../assets/center/ser_icon9.png'),
          text:'我的关注'
        },
        {
          imgurl:require('../assets/center/ser_icon7.png'),
          text:'我的下级'
        },
        {
          imgurl:require('../assets/center/ser_icon8.png'),
          text:'我的等级'
        },
      ],
      cybermoney:'',
      status:'',
      tabBoxList:[
        {
          imgurl:require('../assets/center/tab_icon1.png'),
          text:'待付款'
        },
        {
          imgurl:require('../assets/center/tab_icon2.png'),
          text:'待服务'
        },
        {
          imgurl:require('../assets/center/tab_icon3.png'),
          text:'售后服务'
        },
        {
          imgurl:require('../assets/center/tab_icon4.png'),
          text:'全部订单'
        },
      ],
      score:'',
    }
  },
  created() {
    this.hh();
    var token = localStorage.getItem('token');
    // console.log(token)

    // 判断token
    if(!token){
        this.nojumpCodeLogin=true
        this.zhuangtai='未登录'
        this.face_url=require('../assets/center/headImg1.png')
        this.show1 = false
    }
    else{
      this.nojumpCodeLogin=false
      // console.log(123)
      this.show1 = true
      this.$post(localStorage.getItem('http') + 'user_info/detail',{
        token: localStorage.getItem('token')
      })
      .then(res=> {
        // console.log(res.data)
        this.face_url = res.data.face_url
        this.zhuangtai= res.data.nickname
        this.nicheng = res.data.level_name
        this.cybermoney = res.data.cybermoney
        this.score = res.data.score
        this.balance = res.data.balance
        // console.log(this.score);
        localStorage.setItem('score',res.data.score)
        localStorage.setItem('cybermoney',res.data.cybermoney)
        if(!this.face_url){
          this.face_url=require('../assets/center/headImg.png')
        }
        if(!this.zhuangtai){
          this.zhuangtai='未命名'
        }
      })
    }
    this.is_Weixin();

  },
  methods: {
    hh(){
      this.height.height = window.innerHeight-310 +'px'
    },
    jumpMember(){
      this.$router.push('/member');
    },
    jumpModifyPage:function (){
      var that = this;
      that.$router.push('/modifyPage');
    },
    jumpJ:function (e){
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
        if(e.target.innerHTML == '返利'){
          this.$router.push("/rebate");
        }
        if(e.target.innerHTML == '返利规则'){
          this.$router.push("/rebate_rules");
        }
        if(e.target.innerHTML == '积分'){
          // this.$router.push("/integral");
          this.$router.push({
            path:'/integral',
            query:{
              score:this.score
            }
          })
        }
        if(e.target.innerHTML == '余额'){
          this.$router.push({
            path:'/balance',
            query:{
              balance: this.balance
            }
          });
          // this.$router.push("/recharge");
        }
        if(e.target.innerHTML == '我的咨询卡'){
          this.$router.push("/consultation");
        }
        if(e.target.innerHTML == '我想学'){
          this.$router.push("/wantStudy");
        }
        if(e.target.innerHTML == '我的课程'){
          this.$router.push("/lesson");
        }
        if(e.target.innerHTML == '我的关注'){
          this.$router.push("/follow");
        }
        if(e.target.innerHTML == '我的下级'){
          this.$router.push("/subordinate");
        }
        if(e.target.innerHTML == '我的等级'){
          this.$router.push("/member");
        }
      }




    },
    jumpCodeLogin:function(){
      this.$router.push("/login");
    },
    jumpMy_order(inx){
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
        console.log(inx)
        if(inx == 0){
          this.status = 0
          this.$router.push({
            path:'/order/my_order',
            query:{
              status:this.status
            }
          })
        }
        if(inx == 1){
          this.status = 1
          this.$router.push({
            path:'/order/my_order',
            query:{
              status:this.status
            }
          })
        }
        if(inx == 2){
          this.status = 2
          this.$router.push({
            path:'/refund_page',
            query:{
              status:this.status
            }
          })
        }
        if(inx == 3){
          this.status = null
          this.$router.push({
            path:'/order/my_order',
            query:{
              status:this.status
            }
          })
        }
      }

      // this.$router.push('/order/my_order');


    },
    tuichuBtn(){
      if(!localStorage.getItem('token')){
        this.$toast.error('请登录!')
      }else{
        window.localStorage.clear();
        this.$toast.success('退出成功!')
        location.reload();
      }
    },
    is_Weixin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isWeixin = false
      }else{
        this.isWeixin = true
      }
    }
  },
  components: {
    footer_nav,
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  background-color: #ffffff;
}
.headBox{
  width: 100%;
  height: 310px;
  background-color: #f3f4f6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.head{
  position: relative;
  width: 100%;
  height: 260px;
  background: url("../assets/center/head_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  .headTitle{
    width: 100%;
    text-align: center;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
  }
  .tuichuBtn{
    position: absolute;
    right: 15px;
    top: 23px;
    img{
      width: 16px;
      height: 17px;
    }
  }
  .denglu{
    .headImg{
      width: 100%;
      height: 70px;
      margin-top: 18px;
      text-align: center;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .nameBox{
      width: 100%;
      height: 28px;
      margin-top: 12px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .name{
        font-size: 18px;
        font-family: DengXian;
        font-weight: bold;
        color: #FFFFFF;
      }
      .modify{
        margin-left: 5px;
        padding: 5px 0 0 0;
        box-sizing: border-box;
        img{
          width: 15px;
          height: 17px;
        }
      }

    }
  }
  .vip{
    position: relative;
    width: 100%;
    margin-top: 12px;
    .vipBox{
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -40px;
      width: 80px;
      height: 18px;
      line-height: 18px;
      background: linear-gradient(81deg, #BBA36D 0%, #CEC1AB 100%);
      border-radius: 8px;
      padding: 0 4px;
      box-sizing: border-box;
      img{
        margin-right: 2px;
        width: 12px;
        height: 10px;
      }
      span{
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
  .tab{
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 65px;
    padding: 0 15px;
    box-sizing: border-box;
    .tabBox{
      width: 100%;
      height: 100%;
      background-color: white;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.13);
      border-radius: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-around;
        li{
          width: 60px;
          height: 65px;
          text-align: center;
          cursor: pointer;
          img{
            margin-top: 10px;
            width: 25px;
            height: 24px;
            object-fit: cover;
          }
          .img2{
            width: 30px;
          }
          span{
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 600;
            color: #666666;
          }
        }
      }
    }
  }
}
.service{
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: 310px;
  padding: 30px 30px 72px 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: auto;
  .serTitle{
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 600;
    color: #333333;
    overflow: auto;
  }
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    //padding: 0 0 30px 0;
    //box-sizing: border-box;
    li{
      position: relative;
      margin-top: 24px;
      width: 72px;
      height: 68px;
      text-align: center;
      //border: 1px solid #000;
      img{
        //width: 40px;
        height: 45px;
        object-fit: cover;
      }
      span{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        margin-top: -4px;
        display: block;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #666666;
        text-align: center;
        line-height: 120px;
      }
    }
  }
}
</style>