<template>
  <div id="app">
    <div class="posiBox">
<!--      <div class="head">-->
<!--        <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--        <span>我的返利</span>-->
<!--      </div>-->
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
            <template v-if="n.source_name == '' || n.source_name == null">
              <span>未命名</span>
            </template>
            <template v-else>
              <span>{{ n.source_name }}</span>
            </template>
            <p>{{n.out_type}}</p>
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
      <button type="button" class="btn1" @click="tixianBtn">提现</button>
      <button type="button" class="btn2" @click="tranBbalance">转为余额</button>
    </div>
<!--    <van-popup v-model="tranShow">内容</van-popup>-->
    <van-popup
        v-model="tranShow"
        round
        position="bottom"
        :style="{ height: '30%' }"
    >
      <div class="moneyBox11">
        <div class="inputBox">
          <span>￥</span>
          <input type="number" placeholder="请输入金额" v-model="num_money" @input="inputChange" oninput="">
        </div>
      </div>
      <div class="moneyBox12">
        <button type="button" @click="querenBtn" :disabled="isAble">确认</button>
      </div>
    </van-popup>

    <van-popup
        v-model="tranShow1"
        round
        position="bottom"
        :style="{ height: '30%' }"
    >
      <div class="moneyBox11">
        <div class="inputBox">
          <span>￥</span>
          <input type="number" placeholder="请输入金额" v-model="num_money1" @input="inputChange1" oninput="">
        </div>
      </div>
      <div class="moneyBox12">
        <button type="button" @click="querenBtn1" :disabled="isAble1">确认</button>
      </div>
    </van-popup>
    <noSharing></noSharing>

  </div>
</template>

<script>
import noSharing from "@/components/noSharing";

export default {
  name: "rebate",
  data(){
    return{
      tranShow:false,
      tranShow1:false,
      contList:[],
      source_name:'',
      out_type:'',
      addtime:'',
      num:'',
      cybermoney:'',
      page: 1,
      limit: 15,
      show:false,
      num_money:'',
      num_money1:'',
      isAble:false,
      isAble1:false,
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    onScroll () {
      // 内容元素的总高度
      let innerHeight = document.querySelector('#app').clientHeight
      // 浏览器可见区域高度
      let outerHeight = document.documentElement.clientHeight
      // 滚动条的位置高度
      let scrollTop = document.documentElement.scrollTop
      // console.log(scrollTop + outerHeight );
      // console.log(innerHeight + 238);
      if(scrollTop + outerHeight == innerHeight + 238){
        this.page++;
        this.getData();
      }
    },
    getData(){
      // console.log(this.page);
      this.$post(localStorage.getItem('http') + 'user_cybermoney/get_log',{
        token: this.token,
        page:this.page,
        limit:this.limit
      })
      .then(res=> {
        // console.log(res.data)
        if(res.data.list.length != 0){
          var arr = [];
          arr = this.contList;
          res.data.list.forEach(function(v){
            arr.push(v);
          })
          this.contList = arr;
        }else{
          //没有了
          // this.$toast.error('没有更多了!');
          window.removeEventListener("scroll",this.onScroll);
        }
      })
    },
    tixianBtn(){
      this.tranShow1 = true;
      this.isAble1 = false;
      // this.$toast.error('功能暂未开放');


    },
    tranBbalance(){
      this.tranShow = true;
      this.isAble = false;
    },
    querenBtn(){
      if(!this.num_money){
        this.isAble = false;
        this.$toast.error('请输入金额');
      }else{
        this.isAble = true;
        this.$post(localStorage.getItem('http') + 'user_cybermoney/to_balance',{
          token: localStorage.getItem('token'),
          num: this.num_money
        })
        .then(res=> {
          // console.log(res.data)

          if( res.code == 1){
            this.$toast.success(res.msg);
            this.get_cybermoney();
            this.contList = [];
            this.getData();
            this.tranShow = false;
            this.num_money = '';
          }else{
            this.$toast.error(res.msg);
          }
        })
      }
    },
    querenBtn1(){
      if(!this.num_money1){
        this.isAble1 = false;
        this.$toast.error('请输入金额');
      }else if(this.num_money1<1 || this.num_money1>200){
        this.$toast.error('提现金额为1-200元');
      }else{
        this.isAble1 = true;
        this.$post(localStorage.getItem('http') + 'user_cybermoney/to_wechat',{
          token: localStorage.getItem('token'),
          num: this.num_money1,
          openid: localStorage.getItem('openid'),
        })
        .then(res=> {
          // console.log(res.data)
          if(res.code == 1){
            this.tranShow1 = false
            this.$toast.success(res.msg);
            this.num_money = '';
            this.contList = [];
            this.getData();
            this.get_cybermoney();
          }else{
            this.$toast.error(res.msg);
          }
        })
      }
    },
    get_cybermoney(){
      this.$post(localStorage.getItem('http') + 'user_cybermoney/get_cybermeony',{
        token: localStorage.getItem('token'),
      })
      .then(res=> {
        // console.log(res.data)
        this.cybermoney = res.data
      })
    },
    inputChange(e){
      var val = e.target.value;
      var value = e.target.value;

      if (value < 0){
        this.num_money = 0;
      }
      if (isNaN(value)){
        this.num_money = 0;
      }
      if(value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
        this.num_money = Math.round((value*100))/100;
      }
      if (isNaN(val)){
        this.num_money = 0;
      }

      // return this.num_money;
    },
    inputChange1(e){
      var val = e.target.value;
      var value = e.target.value;

      if (value < 0){
        this.num_money1 = 0;
      }
      if (isNaN(value)){
        this.num_money1 = 0;
      }
      if(value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
        this.num_money1 = Math.round((value*100))/100;
      }
      if (isNaN(val)){
        this.num_money1 = 0;
      }

      // return this.num_money;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.onScroll);
  },
  created(){
    this.token = localStorage.getItem('token');
    // console.log(this.token)
    // this.cybermoney = localStorage.getItem('cybermoney');
    // console.log(this.cybermoney)
    this.get_cybermoney();
    this.getData();
    //先在这里监听scroll事件
    window.addEventListener('scroll', this.onScroll)

    var open_id = localStorage.getItem('openid')
    this.order_id = open_id
  },
  components: {
    noSharing
  }
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
  margin-top: 162px;
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
.moneyBox11{
  width: 100%;
  padding: 36px 48px 0;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  .inputBox{
    width: 160px;
    height: 54px;
    position: relative;
    span{
      position: absolute;
      left: 4px;
      top: 0;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1672F9;
    }
    input{
      width: 160px;
      height: 48px;
      outline: none;
      border: 0;
      border-bottom: 1px solid #EAEAEA;
      padding: 5px 15px 0 50px;
      box-sizing: border-box;
      color: #666666;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
    }
  }
}
.moneyBox12{
  width: 100%;
  padding: 24px 48px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  button{
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    background-color: #1672F9;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34px;
    color: #FFFFFF;
    border-radius: 40px;
    border: 0;
    outline: none;
  }
}


</style>