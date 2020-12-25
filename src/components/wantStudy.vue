<template>
  <div class="bg">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>我想学</span>-->
<!--    </div>-->
    <div class="cont">
      <ul>
        <li v-for="(n,inx) in wantStudyList" :key="inx" @click="jumpDetails(n.id)">
          <img :src="n.video_cover" alt="">
          <div class="textBox">
            <p>{{ n.title }}</p>
            <div class="time">
              视频时长：<span>{{ n.duration }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="nullBox" v-show="show12">
        <img src="../assets/buSchool/nullBoxImg1.png" alt="">
      </div>
    </div>
    <noSharing></noSharing>
  </div>
</template>

<script>
import noSharing from "@/components/noSharing";

export default {
  name: "wantStudy",
  data(){
    return{
      show12:false,
      wantStudyList:[
        // {
        //   imgUrl:require('../assets/center/wantStudyceshiImg1.png'),
        //   text:'视频名称-简单介绍',
        //   time:'09:42'
        // },
      ],
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    // 获取我想学课程
    get_want_study(page,limit) {
      this.$post(localStorage.getItem('http') + 'user_info/get_want_study',{
        token: sessionStorage.getItem('token'),
        page:page,
        limit:limit
      })
      .then(res=> {
        // console.log(res.data)
        // this.monthList= res.data.price
        this.wantStudyList = res.data.list
        if(res.data.list.length == 0){
          this.show12 = true;
          this.wantStudyList = [];
        }else{
          this.show12 = false;
          this.wantStudyList = res.data.list;
        }
      })
    },
    jumpDetails(id){
      this.$router.push({
        path:'courDetails',
        query:{
          id:id
        }
      })
    }
  },
  created(){
    this.get_want_study();
  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  //background-color: #f3f4f6;
}
.head{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: #ffffff;
  z-index: 9999;
  img{
    position: absolute;
    left: 15px;
    top: 26px;
    width: 10px;
    height: 18px;
  }
  span{
    text-align: center;
    width: 100%;
    display: block;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
}
.cont{
  //margin-top: 70px;
  width: 100%;
  padding: 15px 15px 0;
  box-sizing: border-box;
  //background-color: #ffffff;
  ul{
    width: 100%;
    li{
      margin-bottom: 15px;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      img{
        width: 150px;
        height: 100px;
        object-fit: cover;
      }
      .textBox{
        position: relative;
        padding: 10px 0 10px 10px;
        box-sizing: border-box;
        width: 190px;
        height: 100px;
        p{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .time{
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
  .nullBox{
    margin-top: 60px;
    margin-bottom: 60px;
    width: 100%;
    text-align: center;
    img{
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
}
</style>