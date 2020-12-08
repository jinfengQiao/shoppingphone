<template>

  <van-area title="标题" :area-list="areaList" :columns-num="2" />

<!--  <div class="seller">-->
<!--    <van-cell-->
<!--        title="生日"-->
<!--        is-link-->
<!--        :value-class="className"-->
<!--        :value="timeValue"-->
<!--        @click="showPopup" />-->
<!--    <van-popup v-model="show" position="bottom">-->
<!--      <van-datetime-picker-->
<!--          v-model="currentDate"-->
<!--          type="date"-->
<!--          title="选择时间"-->
<!--          :loading="isLoadingShow"-->
<!--          :min-date="minDate"-->
<!--          :max-date="maxDate"-->
<!--          :formatter="formatter"-->
<!--          @cancel="show = false"-->
<!--          @confirm="confirmPicker"-->
<!--      />-->
<!--    </van-popup>-->
<!--  </div>-->
</template>

<script>
export default {
  name: 'Seller',
  data () {
    return {
      // timeValue: '请选择时间',
      // show: false,
      // isLoadingShow: true,
      // currentDate: new Date(),
      // minDate: new Date(1900, 1, 1),
      // maxDate: new Date(),
      // className: ''
      areaList:{},
    }
  },
  methods: {
    // // 显示弹窗
    // showPopup () {
    //   this.show = true
    //   this.isLoadingShow = true
    //   setTimeout(() => {
    //     this.isLoadingShow = false
    //   }, 500)
    // },
    // // 确认选择的时间
    // confirmPicker (val) {
    //   let year = val.getFullYear()
    //   let month = val.getMonth() + 1
    //   let day = val.getDate()
    //   let hour = val.getHours()
    //   let minute = val.getMinutes()
    //   if (month >= 1 && month <= 9) { month = `0${month}` }
    //   if (day >= 1 && day <= 9) { day = `0${day}` }
    //   if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
    //   if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
    //   this.className = 'timeClass'
    //   // this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`'
    //   this.timeValue = `${year}-${month}-${day}`
    //   this.show = false
    // },
    // // 选项格式化函数
    // formatter (type, value) {
    //   if (type === 'year') {
    //     return `${value}年`
    //   } else if (type === 'month') {
    //     return `${value}月`
    //   } else if (type === 'day') {
    //     return `${value}日`
    //   } else if (type === 'hour') {
    //     return `${value}时`
    //   } else if (type === 'minute') {
    //     return `${value}分`
    //   } else if (type === 'second') {
    //     return `${value}秒`
    //   }
    //   return value
    // }

  },
  created() {
    this.$post(localStorage.getItem('http') + 'region/get_region_list',{

    })
    .then(res=> {
      console.log(res.data)
      this.areaList = res.data
    })
  }
}
</script>

<style scoped>

</style>
