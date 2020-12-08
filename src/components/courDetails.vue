<template>
  <div class="bg" :style="height">
    <div class="head">
      <img src="../assets/center/back_icon1.png" alt="" @click="back">
      <span>课程详情</span>
    </div>
    <div class="videoBox">
<!--      <img src="../assets/buSchool/videoBox_btn.png" alt="">-->
<!--      <video :src="video"></video>-->

      <video id="myVideo" class="video-js mu-refresh-control" preload="auto"
             :poster="video_cover">
          <source :src="video" type="video/mp4">
      </video>


    </div>
    <div class="cont">
      <div class="titleBox">
        <div class="title">{{ title }}</div>
        <div class="money">
          <div class="money1">￥{{ price }}</div>
          <div class="money2" v-show="show">
            <div class="span1">特价</div>
            <div class="span2">仅限今天</div>
          </div>
        </div>
        <div class="topMoney">￥{{ old_price }}</div>
        <div class="buyBox">
          <div class="buyBox1">
            <p>成为VIP会员，可看全套教程</p>
            <button @click="jumpCurrVip">立即开通 ></button>
          </div>
        </div>
      </div>
      <div class="introBox">
        <div class="title">课程介绍</div>
        <div class="introCont" v-html="content"></div>
      </div>
      <div class="listBox">
        <div class="currList" v-for="(n,inx) in lesson" :key="inx">
          <span>{{n.title}}</span>
          <ul>
            <li v-for="(spu,k) in n.child" :key="k">
              <img src="../assets/buSchool/listBox_icon.png" alt="">
              <p>{{n.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer_wantStudy">
      <div class="dianzan" @click="layOut">
        <img v-if="lay_type" src="../assets/buSchool/dianzan_icon_sec.png" alt />
        <img v-else src="../assets/buSchool/dianzan_icon.png" alt />
        <span>点赞</span>
      </div>
      <div class="xiangxue" @click="layOut1">
        <img v-if="lay_type1" src="../assets/buSchool/xiangxue_icon_sec.png" alt="">
        <img v-else src="../assets/buSchool/xiangxue_icon.png" alt="">
        <span>想学</span>
      </div>
      <button>+ 加入学习</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "courDetails",
  data(){
    return{
      show:true,
      height:{
        width:'',
        height:'',
      },
      // currListTitleList:[
      //   {
      //     title:'01【财税入门课程】第一节'
      //   },
      //   {
      //     title:'01【财税入门课程】第二节'
      //   },
      //   {
      //     title:'01【财税入门课程】第二节'
      //   },
      //   {
      //     title:'01【财税入门课程】第二节'
      //   },
      // ],
      // currListContList:[
      //   {
      //     text:'简单介绍此节课的主要内容(5分钟)'
      //   },
      //   {
      //     text:'简单介绍此节课的主要内容(4分钟)'
      //   },
      //   {
      //     text:'简单介绍此节课的主要内容(3分钟)'
      //   },
      //   {
      //     text:'简单介绍此节课的主要内容(5分钟)'
      //   },
      // ],
      lay_type:0,
      lay_type1:0,
      id:'',
      title:'',
      content:'',
      price:'',
      old_price:'',
      special:'',
      video:'',
      video_cover:'',
      want_study:'',
      lesson:'',
      course_id:'',
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight-70 +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    layOut(){
      var that = this
      if(that.lay_type == 0){
        that.lay_type = 1
      }else{
        that.lay_type = 0
      }
    },
    layOut1(){
      // var that = this
      // if(that.lay_type1 == 0){
      //   that.lay_type1 = 1
      // }else{
      //   that.lay_type1 = 0
      // }

      // console.log(this.course_id)
      this.$post(localStorage.getItem('http') + 'school/want_study',{
        course_id:this.course_id,
        token: sessionStorage.getItem('token')
      })
      .then(res=> {
        console.log(res.data)
        var data = res.data
        console.log(data)
        if(res.data == 1){
          console.log('添加成功');
          this.lay_type1 = 1
          this.data = 1
          this.want_study = 1
        }
        if(res.data == 0){
          console.log('取消成功');
          this.lay_type1 = 0
          this.data = 0
          this.want_study = 0
          console.log(this.want_study)
        }
      })
    },
    // 获取想学状态
    // get_want_study(){
    //   this.$post(localStorage.getItem('http') + 'school/want_study',{
    //     token: sessionStorage.getItem('token'),
    //     course_id:this.course_id,
    //   })
    //   .then(res=> {
    //     console.log(res.data)
    //     var data = res.data
    //     console.log(data)
    //     if(this.data == 1){
    //       this.lay_type1 = 1
    //       // this.data = 1
    //       // this.want_study = 1
    //     }
    //     if(this.data == 0){
    //       this.lay_type1 = 0
    //       // this.data = 0
    //       // this.want_study = 0
    //     }
    //   })
    // },
    // 获取课程详情
    get_courDetails(id) {
      // console.log(id);
      this.$post(localStorage.getItem('http') + 'school/get_course_detail',{
        token: sessionStorage.getItem('token'),
        id:id
      })
      .then(res=> {
        console.log(res.data)
        this.title = res.data.title
        this.content = res.data.content
        this.price = res.data.price
        this.old_price = res.data.old_price
        this.special = res.data.special
        this.video = res.data.video
        this.video_cover = res.data.video_cover
        this.want_study = res.data.want_study
        console.log(this.want_study)
        this.lesson = res.data.lesson
        this.course_id = res.data.id
        if(this.want_study == 1){
          this.lay_type1 = 1
        }
      })
    },
    // 点击开通跳转vip卡页
    jumpCurrVip(){
      this.$router.push('./currVip');
    },
  },
  created(){
    let id =this.$route.query.id;
    // console.log(id);
    this.hh();
    this.get_courDetails(id);
    // this.get_want_study();


  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: #f3f4f6;
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
.videoBox{
  float: left;
  position: relative;
  margin-top: 70px;
  width: 100%;
  height: 201px;
  //background: url("../assets/buSchool/videoBox_bg.png") no-repeat;
  //background-size: 100% 100%;
  video{
    width: 100%;
    height: 100%;
  }
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -41px;
    margin-top: -41px;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
}
.cont{
  float: left;
  width: 100%;
  //margin-top: 70px;
  padding: 0 0 56px;
  box-sizing: border-box;
  background-color: #ffffff;
  .titleBox{
    float: left;
    position: relative;
    width: 100%;
    height: 164px;
    border-bottom: 2px solid #f3f4f6;
    padding: 15px 15px;
    box-sizing: border-box;
    .title{
      float: left;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .money{
      float: left;
      width: 100%;
      margin-top: 22px;
      .money1{
        float: left;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .money2{
        float: left;
        margin-left: 10px;
        .span1{
          display: inline-block;
          padding: 0 4px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          background: #F53334;
          border: 1px solid #F53334;
          border-radius: 2px 0px 0px 2px;
        }
        .span2{
          display: inline-block;
          padding: 0 4px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #F53334;
          border: 1px solid #F53334;
          border-radius: 0px 2px 2px 0px;
        }
      }
    }
    .topMoney{
      float: left;
      width: 100%;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      text-decoration: line-through;
      color: #999999;
      padding: 0 6px;
      box-sizing: border-box;
    }
    .buyBox{
      position: absolute;
      bottom: 15px;
      left: 0;
      width: 100%;
      height: 30px;
      padding: 0 15px;
      box-sizing: border-box;
      .buyBox1{
        width: 100%;
        height: 30px;
        background: rgba(245, 48, 51, 0.15);
        border-radius: 2px;
        padding: 5px 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        p{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        button{
          padding: 0 6px;
          height: 20px;
          background: linear-gradient(90deg, #F53033 0%, #F67645 100%);
          border-radius: 10px;
          outline: none;
          border: 0;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
  }
  .introBox{
    float: left;
    width: 100%;
    //height: 164px;
    border-bottom: 2px solid #f3f4f6;
    padding: 15px 15px;
    box-sizing: border-box;
    .title{
      float: left;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
    .introCont{
      float: left;
      width: 100%;
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      text-indent: 2em;
    }
  }
  .listBox{
    float: left;
    width: 100%;
    padding: 5px 15px 15px;
    box-sizing: border-box;
    .currList{
      margin-top: 10px;
      width: 100%;
      span{
        width: 100%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }
      ul{
        width: 100%;
        li{
          margin-top: 10px;
          width: 100%;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
          background: #F3F4F6;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img{
            width: 16px;
            height: 12px;
          }
          p{
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.footer_wantStudy{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dianzan{
    display: none;
    img{
      margin-right: 5px;
      width: 16px;
      height: 15px;
    }
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
  .xiangxue{
    img{
      margin-right: 5px;
      width: 15px;
      height: 13px;
    }
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
  button{
    width: 180px;
    height: 32px;
    background: #0596EB;
    border-radius: 17px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
}
</style>