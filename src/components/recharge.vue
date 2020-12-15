<template>
  <div class="bg">
    <div class="head">
      <img src="../assets/center/back_icon1.png" alt="" @click="back">
      <span>用户充值</span>
    </div>
    <div class="cont">
      <div class="moneyBox">
        <p>充值金额</p>
        <div class="inputBox">
          <span>￥</span>
          <input type="text" placeholder="请输入充值金额">
        </div>
      </div>
      <div class="fangshiBox">
        <p>选择充值方式</p>
        <div class="fangshi">
          <div class="left">
            <img src="../assets/center/wechat.png" alt="">
            <span>微信支付</span>
          </div>
          <div class="right">
            <img src="../assets/center/select_icon.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="textBox">
      <ul>
        <li>
          <div class="dian">
            <img src="../assets/center/dian_icon.png" alt="">
          </div>
          <p>权友币是权鹏集团推出的虚拟货币，您可以使用权友币购买商城内任何产品。</p>
        </li>
        <li>
          <div class="dian">
            <img src="../assets/center/dian_icon.png" alt="">
          </div>
          <p>权友币与人民币换算1：1，你可以通过微信的付款方式来进行充值。</p>
        </li>
        <li>
          <div class="dian">
            <img src="../assets/center/dian_icon.png" alt="">
          </div>
          <p>充值权友币属于预充值行为，为了平台的正常运营,充值后的权友币不支持提现功能，敬请谅解。</p>
        </li>
        <li>
          <div class="dian">
            <img src="../assets/center/dian_icon.png" alt="">
          </div>
          <p>单笔充值达到一定金额的用户，可获得相对应会员等级享受更高返佣政策。</p>
        </li>
      </ul>
    </div>
    <div class="btnBox">
      <div class="mingxiBtn">
        <button type="button">零钱明细</button>
      </div>
      <div class="lijichongzhi">立即充值</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recharge",
  data(){
    return{

    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    // jumpMoneyDetailed:function (){
    //   this.$router.push('./moneyDetailed');
    // }
  },
  created(){

  },
}
</script>

<style lang="less" scoped>
.bg{
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
.cont{
  margin-top: 70px;
  width: 100%;
  padding: 15px 15px 30px 15px;
  box-sizing: border-box;
  .moneyBox{
    width: 100%;
    height: 92px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px 15px;
    box-sizing: border-box;
    p{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .inputBox{
      width: 100%;
      margin-top: 10px;
      height: 24px;
      line-height: 24px;
      span{
        float: left;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      input{
        float: left;
        margin-left: 6px;
        width: 200px;
        height: 24px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        outline: none;
        border: 0;
      }
    }
  }
  .fangshiBox{
    margin-top: 15px;
    width: 100%;
    height: 103px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px 15px;
    box-sizing: border-box;
    p{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .fangshi{
      margin-top: 7px;
      width: 100%;
      .left{
        float: left;
        height: 35px;
        line-height: 35px;
        img{
          float: left;
          width: 35px;
          height: 35px;
        }
        span{
          float: left;
          margin-left: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
      }
      .right{
        float: right;
        height: 35px;
        line-height: 35px;
        img{
          margin-top: 8px;
          width: 19px;
          height: 19px;
        }
      }
    }
  }
}
.textBox{
  float: left;
  width: 100%;
  padding:  0 15px;
  box-sizing: border-box;
  ul{
    float: left;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    li{
      float: left;
      margin-bottom: 15px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .dian{
        margin-top: 3px;
        margin-right: 8px;
        img{
          width: 8px!important;
          height: 8px!important;
        }
      }
      p{
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 24px;
        color: #999999;
      }
    }
  }
}
.btnBox{
  float: left;
  //margin-bottom: 24px;
  //margin-top: 24px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .mingxiBtn{
    width: 100%;
    text-align: center;
    button{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      outline: none;
      border: 0;
      display: none;
    }
  }
  .lijichongzhi{
    margin-top: 12px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #0596EB;
    border-radius: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>