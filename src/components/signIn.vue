<template>
  <div class="bg" :style="height">
    <div class="head">
      <div class="headTitle">
        <img src="../assets/center/back_icon.png" alt="" @click="back">
        <span>签到</span>
      </div>
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
            <li  v-for="(n,dayobject) in days" :key="dayobject">
              <!--本月-->
              <!--如果不是本月  改变类名加灰色-->

              <span v-if="n.day.getMonth()+1 != currentMonth" class="other-month">{{ n.day.getDate() }}</span>

              <!--如果是本月  还需要判断是不是这一天-->
              <span v-else>
          <!--今天  同年同月同日-->
                <span v-if=" n.isSign===true" class="active">{{ n.day.getDate() }}</span>
                <span v-else>{{ n.day.getDate() }}</span>
            </span>

            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signIn",
  data(){
    return{
      height:{
        wdith:'',
        height:'',
      },
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      //选中日期
      arrDate: [],

    }
  },
  methods: {
    back:function(){
      this.$router.go(-1);
    },
    hh(){
      this.height.height = window.innerHeight+'px'
    },
    initData: function(cur) {
      var date;
      if (cur) {
        console.log(cur)
        date = new Date(cur);
      } else {
        var now=new Date();
        var da = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
        da.setDate(42);
        date = new Date(this.formatDate(da.getFullYear(),da.getMonth() + 1,1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (var l = 1; l <= 42 - this.currentWeek; l++) {
        var db = new Date(str);
        db.setDate(d.getDate() + l);
        var dayobject1={};
        // dayobject.day=d;
        dayobject1 = {day: db,isSign: this.isVerDate(db.getDate())}
        this.days.push(dayobject1);
      }
    },
    isVerDate (v) {
      return this.arrDate.includes(v)
    },
    pickPre: function(year, month) {

      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(42);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year,month,day){
      var y = year;
      var m = month;
      if(m<10) m = "0" + m;
      var d = day;
      if(d<10) d = "0" + d;
      return y+"-"+m+"-"+d
    },
  },
  created(){
    this.hh();
    this.initData(null);
  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: rgba(78, 119, 235, 1);
  //padding: 0 0 62px 0;
  //box-sizing: border-box;
  overflow: auto;
}
.head{
  position: fixed;
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
.cont{
  position: relative;
  z-index: 1;
  margin-top: 230px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .contBox{
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

.days li .active {
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