<template>
  <div id="mycha">
    <div class="thead">
      <img src="./image/last.png" alt="" @click="lastMonth">
      <p>{{year}}年{{month}}月</p>
      <img src="./image/next.png" alt="" @click="nextMonth">
    </div>

    <div class="calendarwa">
      <div class="secd">
        <p>一</p>
        <p>二</p>
        <p>三</p>
        <p>四</p>
        <p>五</p>
        <p>六</p>
        <p>日</p>
      </div>

      <ul>
        <li v-for="item in days" :key="item" :class="{}">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign_in",
  data(){
    return {
      year:null,//年份
      month:null,//月份
      days:[],//当月的日期列表
      daynum:[31,28,31,30,31,30,31,31,30,31,30,31]//1-12月每个月的天数
    }
  },
  created(){
    let time=new Date()
    this.year=time.getFullYear()
    this.month=time.getMonth()+1

    this.isyear(this.year)//判断平年闰年
    this.nowmonth()
  },
  methods:{
    // 判断平年闰年
    isyear(val){
      if(val%4==0 && val%100!=0 || val%100==0 && val%400==0){
        this.daynum[1]=29
      }else{
        this.daynum[1]=28
      }
    },
    // 计算当月多少天
    nowmonth(){
      var daylength=this.daynum[this.month-1]
      this.days.splice(0)  //清空原数组
      for(let i=0;i<daylength;i++){
        this.days.push(i+1)//根据获取的天数向数组中添加日期
      }

      //获取当月1号是周几，然后向数组中添加空字符串占位
      var times=new Date(this.year,this.month-1,1).getDay()
      if(times==0){//如果times是0则在前面添加6个空字符（视情况，有的星期天排在最前面）
        times=6
      }else{
        times-- //返回6则添加5个空字符，以此内推，返回1则不添加
      }
      for(let f=0;f<times;f++){
        this.days.unshift(" ")
      }
    },
    // 上个月
    lastMonth(){
      if(this.month==1){
        this.month=12
        this.year--
        this.isyear(this.year)
      }else{
        this.month--
      }
      this.nowmonth()
    },
    // 下个月
    nextMonth(){
      if(this.month==12){
        this.month=1
        this.year++
        this.isyear(this.year)
      }else{
        this.month++
      }
      this.nowmonth()
    }
  }
}
</script>

<style lang="less" scoped>



</style>