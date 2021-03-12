<template>
  <div class="bg">
    <div class="head">
      <div class="headTitle">
<!--        <img src="../assets/center/back_icon.png" alt="" @click="back">-->
<!--        <span>Ta的资料</span>-->
      </div>
      <div class="headContBox">
        <div class="headCont">
          <div class="imgBox">
            <img :src="face_url" alt="">
          </div>
          <div class="headCont1">
            <span>{{ nickname }}</span>
            <p>个人简介：{{ info }}</p>
          </div>
          <div class="headCont2">
            <p>
              <button type="button" class="btn1">级别：{{ lever11 }}</button>
            </p>
            <p>
              <button type="button" class="btn2" v-show="shangji" @click="jumpShangji()">上级：{{ parentName }}</button>
            </p>
          </div>
          <div class="headCont3">注册时间：{{ addtime }}</div>
        </div>
      </div>
    </div>
    <div class="dataBox">
      <div class="line11"></div>
      <span>Data</span>
      <div class="line12"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewSupe",
  data(){
    return{
      shangji: true,
      level:'',
      face_url:'',
      info:'',
      addtime:'',
      nickname:'',
      parentId:'',
      parentName:'',
      lever11:'',
    }
  },
  methods: {
    back:function(){
      this.$router.go(-1);
    },
    // 获取用户详情
    get_list(level,user_id){
      // console.log(level)
      // console.log(user_id)
      this.$post(localStorage.getItem('http') + 'user_relation/get_detail',{
        token: localStorage.getItem('token'),
        level: level,
        user_id: user_id
      })
      .then(res=> {
        // console.log(res.data)
        this.face_url = res.data.face_url
        if(!this.face_url){
          this.face_url = require('../assets/center/headImg.png')
        }
        this.info = res.data.info
        if(!this.info){
          this.info = "未定义"
        }
        this.addtime = res.data.addtime
        this.nickname = res.data.nickname
        if(!this.nickname){
          this.nickname = "未命名"
        }
        this.parentId = res.data.parent.id
        // console.log(this.parentId)
        this.parentName = res.data.parent.nickname
        if(!this.parentId){
          this.parentName = "不存在"
          // this.shangji = false
        }else{
          if(!this.parentName){
            this.parentName = "未命名"
          }
        }
        if(level == 1){
          this.lever11 = '一级'
        }
        if(level == 2){
          this.lever11 = '二级'
        }
      })
    },
    // 获取上级信息
    jumpShangji(){
      this.$post(localStorage.getItem('http') + 'user_relation/get_detail',{
        token: localStorage.getItem('token'),
        level: 2,
        user_id: this.parentId
      })
      .then(res=> {
        // console.log(res.data)
        this.face_url = res.data.face_url
        if(this.face_url == null || this.face_url == ''){
          this.face_url = require('../assets/center/headImg.png')
        }
        this.info = res.data.info
        if(this.info == null || this.info == ''){
          this.info = "未定义"
        }
        this.addtime = res.data.addtime
        this.nickname = res.data.nickname
        if(this.nickname == null || this.nickname == ''){
          this.nickname = "未命名"
        }
        this.parentId = res.data.parent.id
        // console.log(this.parentId)
        this.parentName = res.data.parent.nickname
        if(!this.parentId){
          this.parentName = "不存在"
        }else{
          if(this.parentName == null || this.parentName == ''){
            this.parentName = "未命名"
          }
        }
        this.lever11 = '一级'
        this.shangji = false
      })
    }
  },
  created(){
    let level =this.$route.query.level;
    // console.log(level);
    if(level == 1){
      this.shangji = false
    }
    let user_id =this.$route.query.id;
    // console.log(user_id);
    this.get_list(level,user_id);
  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
}
.head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 360px;
  background: url("../assets/center/viewSupe_bg.png") no-repeat;
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
  .headContBox{
    float: left;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .headCont{
      float: left;
      position: relative;
      padding: 0 15px 90px;
      box-sizing: border-box;
      position: relative;
      margin-top: 100px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 6px 28px 1px rgba(40, 125, 255, 0.35);
      border-radius: 10px;
      .imgBox{
        position: absolute;
        top: -62px;
        left: 0;
        width: 100%;
        height: 120px;
        text-align: center;
        img{
          background-color: rgba(0,0,0,0.25);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .headCont1{
        float: left;
        width: 100%;
        margin-top: 80px;
        span{
          float: left;
          width: 100%;
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        p{
          float: left;
          margin-top: 12px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      .headCont2{
        float: left;
        width: 100%;
        p{
          margin-top: 12px;
          width: 100%;
          text-align: center;
          .btn1{
            width: 125px;
            height: 26px;
            background: #0596EB;
            border-radius: 5px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            border: 0;
            outline: none;
          }
          .btn2{
            width: 125px;
            height: 26px;
            background: #DCDCDC;
            border-radius: 5px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #4E77EB;
            border: 0;
            outline: none;
          }
        }
      }
      .headCont3{
        position: absolute;
        bottom: 25px;
        right: 15px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        //text-decoration: underline;
        color: #999999;
      }
    }
  }
}
.dataBox{
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 100%;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  line-height: 24px;
  padding: 0 20px;
  .line11{
    width: 120px;
    height: 1px;
    border: 1px solid;
    border-image: linear-gradient(90deg, #FFFFFF, #cccccc) 10 10;
    background: linear-gradient(90deg, #FFFFFF 0%, #cccccc 100%);
  }
  .line12{
    width: 120px;
    height: 1px;
    border: 1px solid;
    border-image: linear-gradient(270deg, #FFFFFF, #cccccc) 10 10;
    background: linear-gradient(270deg, #FFFFFF 0%, #cccccc 100%);
  }
}



</style>