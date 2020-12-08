<template>
  <div class="bg">
    <div class="head">
      <div class="headTitle">
        <img src="../assets/center/back_icon.png" alt="" @click="back">
        <span>我的等级</span>
      </div>
      <div class="headContBox">
        <div class="quanyi">
          <span @click="showQyBox">会员权益</span>
        </div>
        <div class="dengjiBox">
          <span>{{name}}</span>
          <p>返佣系数：{{ rate_level_one }} - {{rate_level_two}}%</p>
        </div>
        <div class="cont">
          <div class="contHead">
            <img src="../assets/center/huiyuan_icon.png" alt="">
            <span>会员定义</span>
          </div>
          <div class="contCont">线下发展 或者 根据充值金额不同 提升会员等级，返利金额不同。来源：后台设定规则。线下发展 或者 根据充值金额不同 提升会员等级，返利金额不同。来源：后台设定规则。</div>
        </div>
      </div>
    </div>
    <div class="showQy" :style="height" v-if="open" @click="hide1"></div>
    <div class="showQyBox" v-if="open">
      <div class="showQyBoxHead">享受支持</div>
      <div class="showQyBoxCont">
        <ul>
          <li v-html="content"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "member",
  data(){
    return{
      open:false,
      height:{
        width:'',
        height:'',
      },
      level:'',
      name:'',
      rate_level_one:'',
      rate_level_two:'',
      content:'',
    }
  },
  methods: {
    back:function(){
      this.$router.go(-1);
    },
    hh(){
      this.height.height = window.innerHeight +'px'
    },
    showQyBox(){
      this.open = true;
    },
    hide1(){
      this.open = false;
    },
    // 获取我的等级
    get_myGrade(){
      this.$post(localStorage.getItem('http') + 'user_info/detail',{
        token: sessionStorage.getItem('token'),
      })
      .then(res=> {
        console.log(res.data)
        this.level = res.data.level
        this.get_memlevelDetails(this.level)
      })
    },
    // 获取会员等级详情
    get_memlevelDetails(){
      this.$post(localStorage.getItem('http') + 'level/get_detail',{
        id:this.level
      })
      .then(res=> {
        console.log(res.data)
        this.name = res.data.name
        this.rate_level_one = res.data.rate_level_one
        this.rate_level_two = res.data.rate_level_two
        this.content = res.data.content
      })
    }



  },
  created(){
    this.hh();
    this.get_myGrade();
  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
}
.head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 280px;
  background: url("../assets/center/member_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  .headTitle{
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    img{
      position: absolute;
      left: 0;
      top:6px;
      width: 10px;
      height: 18px;
    }
  }
  .headContBox{
    float: left;
    margin-top: 20px;
    width: 100%;
    .quanyi{
      width: 100%;
      text-align: right;
      font-size: 16px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #FFFFFF;
    }
  }
  .dengjiBox{
    margin-top: 20px;
    width: 100%;
    height: 180px;
    background: url("../assets/center/memberMoren_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 50px 30px;
    box-sizing: border-box;
    span{
      float: left;
      width: 100%;
      font-size: 24px;
      font-family: WenYue XinQingNianTi;
      font-weight: normal;
      font-style: italic;
      color: #FFFFFF;
      background: linear-gradient(104deg, #A9FFE1 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p{
      float: left;
      margin-top: 18px;
      padding: 0 10px;
      box-sizing: border-box;
      width: 100%;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #FFFFFF;
      background: linear-gradient(104deg, #A9FFE1 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .cont{
    float: left;
    margin-top: 24px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .contHead{
      float: left;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      img{
        float: left;
        margin-top: 1px;
        margin-right: 10px;
        width: 20px;
        height: 18px;
      }
      span{
        float: left;
      }
    }
    .contCont{
      float: left;
      width: 100%;
      margin-top: 6px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      padding: 0 0 0 30px;
      box-sizing: border-box;
    }
  }
}
.showQy{
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.25);
}
.showQyBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #FFFFFF;
  border-radius: 15px 15px 0px 0px;
  padding: 20px 15px 10px;
  box-sizing: border-box;
  z-index: 9999;
  .showQyBoxHead{
    width: 100%;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    border-bottom: 1px solid rgba(210, 210, 210, 1);
    padding-bottom: 12px;
    box-sizing: border-box;
  }
  .showQyBoxCont{
    width: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
    ul{
      width: 100%;
      min-height: 180px;
      max-height: 240px;
      overflow: auto;
      li{
        width: 100%;
        line-height: 27px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }
    }
  }
}


</style>