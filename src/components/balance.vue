<template>
  <div class="bg" :style="height">
    <div class="head_b">
      <div class="img_b">
        <img src="../assets/center/balance_logo.png" alt="">
      </div>
      <span>我的余额</span>
      <p>￥{{ balance }}</p>
    </div>
    <div class="text_b">
      尊敬的会员，感谢您对权鹏集团的信任，您的充值金额已到账，余额可用于购买商城中任意商品。
    </div>
    <div class="foot_b">
            <button type="button" class="chongzhi" @click="jumpChongzhi">充值</button>
            <button type="button" class="mingxi" @click="jumpMoneyDetailed">零钱明细</button>
    </div>
    <noSharing></noSharing>
  </div>
</template>

<script>

import noSharing from "@/components/noSharing";

export default {
  name: "balance",
  data(){
    return{
      balance:'',
      height:{
        width:'',
        height:'',
      }
    }
  },
  methods:{
    get_height(){
      this.height.height = window.innerHeight + 'px';
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpChongzhi(){
      this.$router.push('/recharge');
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    get_money(){
      this.$post(localStorage.getItem('http') + 'user_info/get_money',{
        token: localStorage.getItem('token'),
      })
      .then(res=> {
        // console.log(res)
        this.balance = (res.data.balance)/100
        if(!this.balance){
          this.balance = 0;
        }
      })
    },
    fun(){
      console.log("监听到了");
      this.$router.push({path: '/center'});
    },

  },
  created(){
    this.get_height();
    this.get_money();
  },
  components: {
    noSharing
  },
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.fun, false);//false阻止默认事件
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  position: relative;
  background-color: #ffffff;
  padding: 12px 0 0;
  box-sizing: border-box;
}
.head_b{
  width: 100%;
  height: 240px;
  background: url("../assets/center/balance_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-direction: column;
  .img_b{
    padding: 0 0 0 4px;
    box-sizing: border-box;
    width: 40px;
  }
  img{
    width: 100%;
    //height: 31px;
    object-fit: cover;
  }
  span{
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    padding: 0 0 0 4px;
    box-sizing: border-box;
  }
  p{
    //margin-top: 10px;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;
  }
}
.text_b{
  width: 100%;
  padding: 0 36px;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #0481FF;
  line-height: 24px;
}
.foot_b{
  position: absolute;
  bottom: 100px;
  left: 0;
  width: 100%;
  padding: 0 15px;
  button{
    outline: none;
    border: 0;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    letter-spacing: 2px;
    width: 100%;
    height: 40px;
    border-radius: 31px;
  }
  .chongzhi{
    background: #0481FF;
    color: #FFFFFF;
  }
  .mingxi{
    margin-top: 20px;
    border: 1px solid #666666;
    box-sizing: border-box;
    color: #333333;
    background: #FFFFFF;
  }
}



</style>