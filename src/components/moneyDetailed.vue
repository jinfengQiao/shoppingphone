<template>
  <div class="bg">
    <div class="head">
      <img src="../assets/center/back_icon1.png" alt="" @click="back">
      <span>零钱明细</span>
    </div>
    <div class="cont">
      <ul>
        <li>
          <div class="left">
            <span>充值成功</span>
            <div class="time">11月17日 02:22</div>
          </div>
          <div class="right">
            <span>+2000</span>
            <p>余额3820</p>
          </div>
        </li>
        <li>
          <div class="left">
            <span>充值成功</span>
            <div class="time">11月17日 02:22</div>
          </div>
          <div class="right">
            <span>+2000</span>
            <p>余额3820</p>
          </div>
        </li>
        <li>
          <div class="left">
            <span>充值成功</span>
            <div class="time">11月17日 02:22</div>
          </div>
          <div class="right">
            <span>+2000</span>
            <p>余额3820</p>
          </div>
        </li>
        <li>
          <div class="left">
            <span>充值成功</span>
            <div class="time">11月17日 02:22</div>
          </div>
          <div class="right">
            <span>+2000</span>
            <p>余额3820</p>
          </div>
        </li>
        <li>
          <div class="left">
            <span>充值成功</span>
            <div class="time">11月17日 02:22</div>
          </div>
          <div class="right">
            <span>+2000</span>
            <p>余额3820</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "moneyDetailed",
  data(){
    return{

    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
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
  padding: 0 15px;
  box-sizing: border-box;
  ul{
    width: 100%;
    li{
      width: 100%;
      height: 76px;
      border-bottom: 1px solid #D2D2D2;
      box-sizing: border-box;
      padding: 15px 0;
      .left{
        float: left;
        width: 100px;
        span{
          display: block;
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .time{
          margin-top: 6px;
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
      .right{
        float: right;
        width: 100px;
        span{
          display: block;
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #0596EB;
          text-align: right;
        }
        p{
          margin-top: 6px;
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          text-align: right;
        }
      }
    }
  }
}
</style>