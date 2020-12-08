<template>
  <div class="bg">
    <div class="head">
      <div class="headTitle">
        <img src="../assets/center/back_icon.png" alt="" @click="back">
        <span>修改资料</span>
      </div>
      <div class="headImg">
        <div class="imgBox">
          <img :src="userInfo" alt="">
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
          <input type="text" placeholder="请输入您的生日" v-model="birth">
        </li>
        <li>
          <img src="../assets/center/modify_icon4.png" alt="">地区
        </li>
        <li>
          <img src="../assets/center/modify_icon5.png" alt="">简介
        </li>
        <div class="textareaBox">
          <textarea name="`" id="" placeholder="请输入简介" v-model="info"></textarea>
        </div>

      </ul>
    </div>
    <div class="btnBox">
      <button type="button">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "modifyPage",
  data(){
    return{
      face_url:'',
      userInfo: require('../assets/center/headImg.png'),
      zhuangtai:'',
      sex:0,
      birth:'',
      info:'',
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
      // console.log(456)
      console.log(e)
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.userInfo = res.result
      }
      reader.readAsDataURL(file)
      console.log(this.userInfo)
    }

  },
  created(){
    this.$post(localStorage.getItem('http') + 'user_info/detail',{
      token: sessionStorage.getItem('token')
    })
    .then(res=> {
      console.log(res.data)
      this.face_url = res.data.face_url
      this.zhuangtai = res.data.nickname
      this.birth = res.data.birth
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
  z-index: 1;
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