<template>
  <div>
    <div class="posiBox">
      <div class="head">
        <img src="../assets/center/back_icon1.png" alt="" @click="back">
        <span>我的返利</span>
      </div>
      <div class="banner">
        <div class="bannerBox">
          <div class="moneyBox">
            <span>{{ cybermoney }}</span>
            <p>我的虚拟币</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cont">
      <ul>
        <li v-for="(n,inx) in contList" :key="inx">
          <div class="left">
            <span>{{ n.source_name }}</span>
            <p>成功返利</p>
          </div>
          <div class="right">
            <template v-if="n.type == 1">
              <span>{{n.num}}</span>
            </template>
            <template v-if="n.type == 2">
              <span class="spanAdd">{{n.num}}</span>
            </template>
            <div class="time">{{ n.addtime }}</div>
          </div>
        </li >
      </ul>
    </div>
    <div class="btnBox">
      <button type="button" class="btn1">提现</button>
      <button type="button" class="btn2">转为余额</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "rebate",
  data(){
    return{
      contList:[],
      source_name:'',
      addtime:'',
      num:'',
      cybermoney:'',
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
  },
  created(){
    this.token = sessionStorage.getItem('token');
    console.log(this.token)
    this.cybermoney = sessionStorage.getItem('cybermoney');
    console.log(this.cybermoney)
    this.$post(localStorage.getItem('http') + 'user_cybermoney/get_log',{
      token: this.token
    })
    .then(res=> {
      console.log(res.data)

      this.contList = res.data.list
      console.log(this.contList)
    })
  },
}
</script>

<style lang="less" scoped>
.bg{
  background-color: #f3f4f6;
  padding: 0 0 62px 0;
  box-sizing: border-box;
}
.posiBox{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
}
.head{
  position: relative;
  width: 100%;
  height: 70px;
  line-height: 70px;
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
.banner{
  width: 100%;
  height: 162px;
  background-color: #f3f4f6;
  padding: 15px;
  box-sizing: border-box;
  .bannerBox{
    width: 100%;
    height: 132px;
    background: url("../assets/center/banner_bg.png") no-repeat;
    background-size: 100% 100%;
    .moneyBox{
      width: 100%;
      text-align: right;
      padding: 35px 125px 0 0;
      box-sizing: border-box;
      span{
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
      }
      p{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
.cont{
  width: 100%;
  margin-top: 232px;
  margin-bottom: 76px;
  background-color: #ffffff;
  ul{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    li:last-child{
      border: 0;
    }
    li{
      width: 100%;
      height: 83px;
      border-bottom: 1px solid #DCDCDC;
      box-sizing: border-box;
      padding: 15px 20px;
      .left{
        float: left;
        width: 100px;
        span{
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        p{
          margin-top: 10px;
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
      .right{
        float: right;
        width: 145px;
        text-align: right;
        span{
          width: 100%;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #F53033;
        }
        //     -减
        .spanAdd{
          color: #0596EB;
        }
        .time{
          margin-top: 5px;
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
}
.btnBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 76px;
  padding: 20px 35px;
  box-sizing: border-box;
  background-color: #ffffff;
  .btn1{
    float: left;
    //width: 136px;
    width: 115px;
    height: 36px;
    line-height: 36px;
    background: #0596EB;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
  .btn2{
    float: right;
    //width: 136px;
    width: 115px;
    height: 36px;
    line-height: 36px;
    background: #E5E5E5;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #0596EB;
    outline: none;
    border: 0;
  }
}
</style>