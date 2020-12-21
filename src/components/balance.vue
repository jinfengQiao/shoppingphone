<template>
  <div>
    <div class="header">
      <img src="../assets/center/money_icon.png" alt="">
      <p>我的余额</p>
      <span>￥{{ balance }}</span>
    </div>
    <div class="footer">
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
    }
  },
  methods:{
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
        token: sessionStorage.getItem('token'),
      })
      .then(res=> {
        console.log(res)
        this.balance = res.data.balance
        if(!this.balance){
          this.balance = 0;
        }
      })
    }

  },

  created(){
    this.get_money();
    // let balance =this.$route.query.balance;
    // this.balance = balance
    // console.log(this.balance)
  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.header{
  float: left;
  width: 100%;
  height: 260px;
  background: #0596EB;
  text-align: center;
  img{
    width: 65px;
    height: 65px;
    margin-top: 50px;
  }
  p{
    margin-top: 10px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  span{
    margin-bottom: 10px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
  }
}
.footer{
  width: 100%;
  button{
    outline: none;
    border: 0;
    border-radius: 5px;
  }
  .chongzhi{
    position: fixed;
    left: 50%;
    margin-left: -80px;
    bottom: 110px;
    width: 160px;
    height: 40px;
    background: #0596EB;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
  }
  .mingxi{
    position: fixed;
    left: 50%;
    margin-left: -80px;
    bottom: 50px;
    width: 160px;
    height: 40px;
    background: #EAEAEA;
    opacity: 1;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #0596EB;
  }
}


</style>