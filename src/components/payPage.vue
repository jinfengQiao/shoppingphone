<template>
  <div>
    <div class="payPageBox1">
      <div class="imgBox">
        <img :src="imgPath" alt="">
      </div>
      <span>{{sucTitle}}</span>
      <p>{{sucText}}</p>
    </div>
    <div class="payPageBox2">
      <div class="payPageBox21">
        <img src="../assets/payPage/juxing_blue.png" alt="">
        <div class="payPageBox211">
          <div class="moneyBox" :class="activeClass == index ? 'active':''">
            ￥<span :class="activeClass == index ? 'active':''">{{goods.price}}</span>
          </div>
          <div class="lineBox">
            <div class="line"></div>
          </div>
          <div class="borderBox">
            <div class="borderBox1">
              <p>订单编号：</p>
              <span>{{list.out_trade_no}}</span>
            </div>
            <div class="borderBox1">
              <p>支付方式：</p>
              <span>{{pay_type}}</span>
            </div>
            <div class="borderBox1">
              <p>收      货     人：</p>
              <span>{{list.take_name}}</span>
            </div>
            <div class="borderBox1">
              <p>收货地址：</p>
              <span>{{list.take_address}}</span>
            </div>
          </div>
        </div>

      </div>
      <div class="payPageBox22">
        <div class="btn1" @click="backDe()">返回订单详情</div>
        <div class="btn2">返回订单列表</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payPage",
  data() {
    return {
      list:[],
      goods: [],
      pay_type: "",
      imgPath:require('../assets/payPage/pay_suc.png'),
      sucTitle:'支付成功',
      sucText: '您已付款成功，祝您购物愉快~',
      activeClass: -1,
      index:0
    }
  },
  created(){
    this.getCode()
    let id = this.$route.query.id
    console.log(id)
    this.getParams(this.index);

  },
  methods: {
    backDe(){
      this.$router.go(-1);
    },
    getCode(){
      this.$post(localStorage.getItem('http') + 'order/get_detail',{
        token: localStorage.getItem('token'),
        id:this.$route.query.id

      })
        .then(res=> {
          this.list= res.data
          this.goods = res.data.goods[0]
          if(this.list.pay_type == 1){
            this.pay_type = '微信支付'
          }
          if(this.list.pay_type == 2){
            this.pay_type = '支付宝支付'
          }
        })
    },
    getParams(index){
      this.stu = this.$route.query.stu;
      console.log(this.stu)
      if(this.stu == 2){
        this.imgPath = require('../assets/payPage/pay_fail.png'),
        this.sucTitle = '支付失败',
        this.sucText = '支付失败，请您重新付款',
        this.activeClass = index
      }
    }
  },
}
</script>

<style scoped>
.payPageBox1{
  float: left;
  margin-top: 51px;
  width: 100%;
  height: 220px;
  background: linear-gradient(66deg, #63A9FF 0%, #0461FF 100%);
  box-shadow: 0px 3px 6px rgba(9, 101, 255, 0.3);
  opacity: 1;
}
.imgBox{
  position: relative;
  float: left;
  margin-top: 36px;
  width: 100%;
  height: 42px;
  text-align: center;
}
.imgBox img{
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -24px;
  width: 48px;
  height: 42px;
  vertical-align: middle;
}
.payPageBox1 span{
  float: left;
  margin-top: 15px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 40px;
  color: #FFFFFF;
}
.payPageBox1 p{
  float: left;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 30px;
  color: #FFFFFF;
  letter-spacing: 2px;
}
.payPageBox2{
  float: left;
  width: 100%;
  height: 380px;
  padding: 0 30px;
  box-sizing: border-box;
}
.payPageBox21{
  position: relative;
  float: left;
  width: 100%;
  height: 240px;
}
.payPageBox21 img{
  position: absolute;
  top: -36px;
  left: -5%;
  width: 110%;
  height: 12px;
}
.payPageBox211{
  position: absolute;
  left: 0;
  top: -30px;
  width: 100%;
  height: 270px;
  border: 1px #666666 dashed;
  box-sizing: border-box;
  background-color: #ffffff;
}
.moneyBox{
  float: left;
  margin-top: 15px;
  width: 100%;
  font-size: 24px;
  font-family: Roboto;
  font-weight: bold;
  line-height: 60px;
  color: #22B156;
  opacity: 1;
  text-align: center;
}
.moneyBox span{
  font-size: 24px;
  font-family: Roboto;
  font-weight: bold;
  line-height: 60px;
  color: #22B156;
  opacity: 1;
}
.lineBox{
  float: left;
  margin-top: 4px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.line{
  float: left;
  width: 100%;
  height: 1px;
  background-color: #E1E1E1;
}
.borderBox{
  float: left;
  margin-top: 12px;
  width: 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #333333;
  padding: 0 15px;
  box-sizing: border-box;
}
.borderBox1{
  float: left;
  width: 100%;
  line-height: 42px;
}
.borderBox1 p{
  float: left;
  width: 100px;
  letter-spacing: 2px;
}
.borderBox1 span{
  float: left;
  max-width: 222px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.payPageBox22{
  position: relative;
  float: left;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btn1{
  position: absolute;
  left: 50%;
  top: 30px;
  margin-left: -105px;
  float: left;
  width: 210px;
  background: #F8F8F8;
  border: 2px solid #DDDDDD;
  box-sizing: border-box;
  opacity: 1;
  border-radius: 40px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: #999999;
  text-align: center;
  cursor: pointer;
}
.btn2{
  position: absolute;
  left: 50%;
  top: 90px;
  margin-left: -105px;
  float: left;
  width: 210px;
  box-sizing: border-box;
  background: linear-gradient(66deg, #63A9FF 0%, #0461FF 100%);
  box-shadow: 0px 3px 6px rgba(9, 101, 255, 0.3);
  opacity: 1;
  border-radius: 40px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 40px;
  color: #FFFFFF;
  text-align: center;
  cursor: pointer;
}
.active {
  color: #FF5C2B!important;
}

</style>