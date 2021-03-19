<template>
  <div class="bg">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>零钱明细</span>-->
<!--    </div>-->
    <div class="cont">
      <ul>
        <li v-for="(n,inx) in getList" :key="inx">
          <div class="left">
            <template v-if="n.type == 1">
              <span>充值成功</span>
            </template>
            <template v-else>
              <span>消费成功</span>
            </template>
            <div class="time">{{ n.addtime }}</div>
          </div>
          <div class="right">
            <span>{{n.num}}</span>
            <template v-if="!n.balance">
              <p>余额 0</p>
            </template>
            <template v-else>
              <p>余额 {{ n.balance }}</p>
            </template>
          </div>
        </li>
      </ul>
      <div class="nullBox" v-show="show12">
        <img src="../assets/buSchool/nullBoxImg1.png" alt="">
      </div>
    </div>
    <noSharing></noSharing>

  </div>
</template>

<script>
import noSharing from "@/components/noSharing";

export default {
  name: "moneyDetailed",
  data(){
    return{
      getList:[],
      show12:true,
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    get_list(){
      this.$post(localStorage.getItem('http') + 'invest/get_list',{
        token: localStorage.getItem('token'),
      })
      .then(res=> {
        // console.log(res)
        if(res.data.length == 0){
          this.show12 = true;
          this.getList = [];
        }else{
          this.show12 = false;
          this.getList = res.data;
        }
      })
    }
  },
  created(){
    this.get_list();
  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  //background-color: #f3f4f6;
  background-color: #ffffff;
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
  //margin-top: 70px;
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
      display: flex;
      justify-content: space-between;
      .left{
        //float: left;
        //width: 100px;
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
        //float: right;
        //width: 100px;
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
.nullBox{
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  text-align: center;
  img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
}
</style>