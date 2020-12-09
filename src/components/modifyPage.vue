<template>
  <div class="bg">
    <div class="head">
      <div class="headTitle">
        <img src="../assets/center/back_icon.png" alt="" @click="back">
        <span>修改资料</span>
      </div>
      <div class="headImg">
        <div class="imgBox">
          <img :src="face_url" alt="">
        </div>
        <div class="fileBox">
          <input type="file" @change="handleFile" class="fileBtn">
          <img src="../assets/center/fileImg.png" alt="" @click.stop="uploadHeadImg">
        </div>
      </div>
    </div>
    <div class="cont">
      <ul>
        <li>
          <img src="../assets/center/modify_icon1.png" alt="">姓名
          <input type="text" placeholder="请输入您的名字" v-model="zhuangtai">
        </li>
        <li>
          <img src="../assets/center/modify_icon2.png" alt="">性别
          <div class="xuanze">
            <input type="radio" value="0" name="sex" v-model="sex">
            <label>保密</label>
            <input type="radio" value="1" name="sex" v-model="sex">
            <label>男</label>
            <input type="radio" value="2" name="sex" v-model="sex">
            <label>女</label>
          </div>
        </li>
        <li>
          <img src="../assets/center/modify_icon3.png" alt="">生日
<!--          <input type="text" placeholder="请输入您的生日" v-model="birth">-->
          <div class="seller">
            <van-cell
                is-link
                :value-class="className"
                :value="timeValue"
                @click="showPopup" />
            <van-popup v-model="show" position="bottom">
              <van-datetime-picker
                  v-model="birth"
                  type="date"
                  title="选择时间"
                  :loading="isLoadingShow"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :formatter="formatter"
                  @cancel="show = false"
                  @confirm="confirmPicker"
              />
            </van-popup>
          </div>
        </li>
        <li>
          <img src="../assets/center/modify_icon4.png" alt="">地区
          <div class="seller1">
            <van-cell
                is-link
                :value-class="className"
                :value="areaValue"
                @click="showPopup1" />
            <van-popup v-model="show1" position="bottom">
              <van-area title="选择地区"
                        :area-list="areaList"
                        :loading="isLoadingShow"
                        :columns-num="2"
                        @cancel="show1 = false"
                        @confirm="confirmPicker1"
                        :value="city_id"
              />
            </van-popup>
          </div>
        </li>
        <li>
          <img src="../assets/center/modify_icon5.png" alt="">简介
        </li>
        <div class="textareaBox">
          <textarea name="" id="" placeholder="请输入简介" v-model="info"></textarea>
        </div>

      </ul>
    </div>
    <div class="btnBox">
      <button type="button" @click="preservation">保存</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: "modifyPage",
  data(){
    return{
      axios:axios,
      face_url:require('../assets/center/headImg.png'),
      zhuangtai:'',
      sex:0,
      info:'',

      timeValue: '请选择时间',
      show: false,
      isLoadingShow: true,
      birth: new Date(2010,1,1),
      minDate: new Date(1950, 1, 1),
      maxDate: new Date(),
      className: '',

      areaValue:'请选择地区',
      show1:false,
      areaList:{},
      province_list:'',
      city_list:'',

      province_id:'',
      city_id:'',
      file:"",

    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    uploadHeadImg(){
      // console.log(123)
      this.$el.querySelector('.fileBtn').click()
    },
    handleFile(e){
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.file = file;
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.userInfo = res.result
      }

      reader.readAsDataURL(file)
      let formData = new FormData() // 创建form对象
      formData.append('file', file);
      formData.append('token', sessionStorage.getItem("token"));

      this.axios({
        method:"POST",
        url:localStorage.getItem('http') + 'upload/img',
        header:{'Content-Type':'multipart/form-data'},
        data:formData,
      }).then((res)=>{
        this.face_url = res.data.data.save_name
      })
    },
    // 显示弹窗
    showPopup () {
      this.show = true
      this.isLoadingShow = true
      setTimeout(() => {
        this.isLoadingShow = false
      }, 500)
    },
    // 确认选择的时间
    confirmPicker (val) {
      let year = val.getFullYear()
      let month = val.getMonth()
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className = 'timeClass'
      // this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`'
      this.timeValue = `${year}/${month}/${day}`
      this.show = false
    },
    // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日 `
      }
      return value
    },
    // 显示弹窗
    showPopup1 () {
      this.show1 = true
      this.isLoadingShow = true
      setTimeout(() => {
        this.isLoadingShow = false
      }, 500)
    },
    confirmPicker1(e){
      console.log(e);
      // console.log(e[0].name);
      let province_list = e[0].name;
      let city_list = e[1].name;
      this.areaValue = `${province_list} - ${city_list}`
      this.show1 = false

      this.province_id = e[0].code;
      this.city_id = e[1].code;
    },
    // 点击保存
    preservation(){
      var da = new Date();
      var birth = da.getFullYear(this.birth) +  "/" + da.getMonth(this.birth) +  "/" + da.getDay(this.birth);

      console.log(this.zhuangtai)
      this.$post(localStorage.getItem('http') + 'user_info/edit',{
        token: sessionStorage.getItem('token'),
        nickname: this.zhuangtai,
        face_url: this.face_url,
        province_id: this.province_id,
        city_id: this.city_id,
        sex: this.sex,
        info: this.info,
        birth: birth
      })
      .then(res=> {
        if(res.code == 1){
          console.log(res.data)
          // console.log(res.data.save_name)
          this.$toast.success('修改成功');
          this.$router.push('./center');
        } else{
          this.$toast.error('修改失败');
        }

      })
    },
  },
  created(){
    this.$post(localStorage.getItem('http') + 'user_info/detail',{
      token: sessionStorage.getItem('token')
    })
    .then(res=> {

      console.log(res.data)
      this.face_url = res.data.face_url
      this.zhuangtai = res.data.nickname
      if(res.data.birth){
        let arr = res.data.birth.split("/");
        this.birth = new Date(arr[0],arr[1],arr[2]);
        this.timeValue = res.data.birth;
      }

      this.province_name = res.data.province_name
      this.city_name = res.data.city_name

      console.log(this.province_name)
      console.log(this.city_name)
      this.areaValue = `${this.province_name}-${this.city_name}`
      this.province_id = res.data.province_id
      this.city_id = res.data.city_id
      console.log(this.province_id)
      console.log(this.city_id)



      this.info = res.data.info
      if (res.data.sex){
        this.sex = res.data.sex
      }
      if(this.userInfo == null){
        this.userInfo=require('../assets/center/headImg.png')
      }
      // if(this.zhuangtai == null){
      //   this.zhuangtai='未命名'
      // }

    }),
    this.$post(localStorage.getItem('http') + 'region/get_region_list',{})
    .then(res=> {
      console.log(res.data)
      this.areaList = res.data
      this.province_list = res.data.province_list
      this.city_list = res.data.city_list
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
.head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 230px;
  background: url("../assets/center/modifyPageHead_bg.png") no-repeat;
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
        object-fit: cover;
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
  //z-index: 1;
  margin-top: 230px;
  width: 100%;
  background-color: #ffffff;
  ul{
    width: 100%;
    .textareaBox{
      width: 100%;
      height: 200px;
      padding:  0 16px;
      box-sizing: border-box;
      textarea{
        width: 100%;
        height: 100%;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        resize: none;
        outline: none;
        padding: 12px 24px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        //text-indent: 2em;
      }
    }
    li{
      width: 100%;
      height: 52px;
      border-top: 1px solid #EEEEEE;
      box-sizing: border-box;
      line-height: 52px;
      padding: 0 16px;
      .seller{
        float: right;
        margin-top: 14px;
        //width: 100px;
      }
      .seller1{
        float: right;
        margin-top: 14px;
        //width: 150px;
      }
      .van-cell{
        padding: 0!important;
      }
      .van-cell__value--alone{
        text-align: right!important;
      }
      .van-cell::after{
        border: 0!important;
      }
      img{
        float: left;
        margin-top: 16px;
        margin-right: 10px;
        width: 14px;
        height: 16px;
      }
      input{
        float: right;
        width: 120px;
        height: 51px;
        border: 0;
        outline: none;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        text-align: right;
      }
      .xuanze{
        float: right;
        width: 130px;
        height: 51px;
        line-height: 51px;
        input{
          float: left;
          margin-left: 10px;
          margin-right: 5px;
          margin-top: 19px;
          width: 12px;
          height: 12px;
        }
        label{
          float: left;
          color: #999999;
        }
      }
    }
  }


}
.btnBox{
  margin-top: 40px;
  position: relative;
  width: 100%;
  button{
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -68px;
    width: 136px;
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
}
</style>