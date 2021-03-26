<template>
  <div class="bg" :class="{bg_top:is_headerBarShow}">
    <div class="head">
<!--      <div class="headTitle">-->
<!--        <img src="../assets/center/back_icon.png" alt="" @click="back">-->
<!--        <span>签到</span>-->
<!--      </div>-->
    </div>
    <div class="cont">
      <div class="contBox">

        <div id="calendar">
          <!-- 年份 月份 -->
          <div class="month">
            <ul>
              <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
              <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
              <!-- <li class="year-month" @click="pickYear(currentYear,currentMonth)"> -->
              <li class="year-month">
                <span class="choose-year">{{ currentYear }}年</span>
                <span class="choose-month">{{ currentMonth }}月</span>
              </li>
              <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
          </div>
          <!-- 星期 -->
          <ul class="weekdays">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li style="color:red">六</li>
            <li style="color:red">日</li>
          </ul>
          <!-- 日期 -->
          <ul class="days">
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li  v-for="(n,dayobject) in days" :key="dayobject" @click="signIn()">
              <!--本月-->
              <!--如果不是本月  改变类名加灰色-->

              <span v-if="n.this_month == 0" class="other-month">{{ n.day}}</span>

              <!--如果是本月  还需要判断是不是这一天-->
              <span v-else>
          <!--今天  同年同月同日-->
                <span v-if="n.sign == 1" class="active">{{ n.day }}</span>
                <span v-else>{{ n.day}}</span>
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <noSharing></noSharing>

  </div>
</template>

<script>
import noSharing from "@/components/noSharing";

export default {
  name: "signIn",
  data(){
    return{
      height:{
        wdith:'',
        height:'',
      },
      currentDay: 1,
      currentMonth: 12,
      currentYear: 2020,
      currentWeek: 1,
      days: [],
      //选中日期
      arrDate: [],
      lastDay:'',
      is_headerBarShow:true,
    }
  },
  methods: {
    back:function(){
      this.$router.go(-1);
    },
    hh(){
      // this.height.height = window.innerHeight+'px'
    },
    initData: function() {
      var date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
    },
    isVerDate (v) {
      // console.log(v) 
      return this.arrDate.includes(v)
    },
    pickPre: function(year, month) {
      this.currentMonth = month - 1;
      if (this.currentMonth == 0){
        this.currentMonth = 12
        this.currentYear = year - 1;
      }

      this.get_calendar();
    },
    pickNext: function(year, month) {
      this.currentMonth = month + 1;
      if (this.currentMonth == 13){
        this.currentYear = year + 1;
        this.currentMonth = 1;
      }

      this.get_calendar();
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },

    get_calendar(){
      this.$post(localStorage.getItem('http') + 'calendar/get_list',{
        token: localStorage.getItem('token'),
        month:this.currentMonth,
        year:this.currentYear
      }).then(res=> {
        // console.log(res);
        this.days = res.data;
      });
    },

    // 获取签到记录
    get_signIn(){
      this.date = this.currentYear + '-' + this.currentMonth
      this.$post(localStorage.getItem('http') + 'user_score/get_sign_log',{
        token: localStorage.getItem('token'),
        date: this.date
      })
      .then(res=> {
        this.arrDate = res.data
        // console.log(this.arrDate)
      })
    },
    // 点击签到
    signIn(){
    // signIn(day){
      // console.log(this.currentYear + "-" +  this.currentMonth+ "-" + day);
      // this.$post(localStorage.getItem('http') + 'user_score/add',{
      //   token: localStorage.getItem('token'),
      //   source: 1,
      // })
      // .then(res=> {
      //   console.log(res.data)
      //   if(res.code == 1){
      //     this.$toast.success(res.msg);
      //     // this.$router.push('/center');
      //   }else{
      //     this.$toast.error(res.msg);
      //   }
      // })
    },

  },
  created(){
    this.hh();
    this.initData();
    this.get_calendar(this.currentYear,this.currentMonth);
    this.get_signIn();

    var openid_bar = localStorage.getItem('invite_openid');
    if(!openid_bar){
      this.is_headerBarShow = false
    }else{
      this.is_headerBarShow = true
    }
  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  position: relative;
  width: 100%;
  background-color: rgba(78, 119, 235, 1);
  //padding: 0 0 62px 0;
  //box-sizing: border-box;
  min-height: calc(100vh);
  max-height: calc(100vh);
  overflow: auto;
}
.bg_top{
  min-height: calc(100vh - 50px)!important;
  max-height: calc(100vh - 50px)!important;
}
.head{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 230px;
  background: url("../assets/center/signIn_bg.png") no-repeat;
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
  .headImg{
    position: relative;
    width: 100%;
    height: 76px;
    margin-top: 40px;
    text-align: center;
    .imgBox{
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -38px;
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      padding: 3px;
      box-sizing: border-box;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .fileBox{
      position: absolute;
      top: 76px;
      left: 0;
      width: 100%;
      input{
        position: absolute;
        top: -12px;
        left: 50%;
        margin-left: -10px;
        width: 20px;
        height: 15px;
        z-index: 2;
        font-size: 0;
        opacity: 0;
        cursor: pointer;
      }
      img{
        position: absolute;
        top: -12px;
        left: 50%;
        margin-left: -10px;
        width: 20px;
        height: 15px;
        z-index: 1;
        border-radius: 0;
      }
    }
  }
}
.cont {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  //padding: 230px 15px 0;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 3;

  .contBox {
    width: 100%;
    height: 388px;
    background: url("../assets/center/calendar_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 25px 2px 0 3px;
    box-sizing: border-box;

  }
}




#calendar{
  width:80%;
  margin: 0 auto;
  //box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
}
#calendar{
  width: 100%;
  //width:80%;
  //margin: 0 auto;
  //box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
}
.month {
  width: 100%;
  background: #ffffff;
  line-height: 27px;
}

.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
}

.year-month {
  /* padding: 20px; */
}

.year-month:hover {
  background: rgba(150, 2, 12, 0.1);
}

.choose-year {
  float: left;
  /* padding-left: 20px;
  padding-right: 20px; */
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #333333;
}

.choose-month {
  float: left;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #333333;
}

.arrow {
  /* padding: 20px; */
}

.arrow:hover {
  background: rgba(100, 2, 12, 0.1);
}

.month ul li {
  color: #333333;
  /* font-size: 20px; */
  text-transform: uppercase;
  letter-spacing: 1px;
}

.weekdays {
  margin: 12px 0 0 0;
  padding: 10px 0;
  background-color: rgba(244, 247, 255, 1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #333333;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}

.days {
  padding: 0;
  background: #FFFFFF;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 0 0 10px 10px;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #000;
  cursor: pointer;
  font-size: 14px;
}

.active {
  padding: 6px 10px;
  border-radius: 50%;
  /*background: #00B8EC;*/
  background: url("../assets/center/qiandao_bgImg.png") no-repeat;
  background-size: 100% 100%;
  /*color: #fff;*/
}
.days li .other-month {
  padding: 5px;
  color: gainsboro;
}

.days li:hover {
  background: #e1e1e1;
}
</style>