<template>
  <div class="bg" :style="height">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>内容标题</span>-->
<!--    </div>-->
    <div class="cont">
      <div class="title">{{title}}</div>
      <span>{{info}}</span>
      <p v-html="content"></p>
      <ul>
        <li v-for="(n,inx) in imgList" :key="inx">
          <img :src="n" alt="">
        </li>
      </ul>
      <div class="timeNumBox">
        <div class="time">{{publishtime}}</div>
        <div class="lookNum">
          <img src="../assets/buSchool/look_icon.png" alt="">
          <div class="num">{{hit}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "artiDetails",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      info:'',
      content:'',
      publishtime:'',
      hit:'',
      imgList:[],
      title: '',
      integrityurl:'',
      // logo:'https://m.tjqpjt.com/logo.png',
      desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
      imgUrl: 'https://m.tjqpjt.com/logo.png'
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    // 获取文章详情
    get_artiDetails(id) {
      // console.log(id);
      this.$post(localStorage.getItem('http') + 'school/get_article_detail',{
        id:id
      })
      .then(res=> {
        console.log(res.data)
        this.title = res.data.title
        this.info = res.data.info
        this.content = res.data.content
        this.publishtime = res.data.publishtime
        this.hit = res.data.hit
        this.imgList = res.data.media_url.img

        if(!this.imgList){
          this.$wxShare(res.data.title,this.desc,location.href,res.data.media_url.img)
        }else{
          this.$wxShare(res.data.title,this.desc,location.href,'https://m.tjqpjt.com/logo.png')
        }

      })
    },
  },
  created(){
    let id =this.$route.query.id;
    console.log(id);
    this.hh();
    this.get_artiDetails(id);

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
.cont{
  float: left;
  width: 100%;
  //margin-top: 70px;
  padding: 15px;
  box-sizing: border-box;
  //background-color: #ffffff;
  .title{
    float: left;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  span{
    float: left;
    width: 100%;
    margin-top: 12px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
  }
  p{
    float: left;
    margin-top: 12px;
    width: 100%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 24px;
  }
  ul:after{
    content:' ';
    width:90px; //这个宽度和子元素宽度一致
    height:0;
    display:block;
  }
  ul{
    float: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    li{
      margin-top: 15px;
      width: 90px;
      height: 90px;
      img{
        float: left;
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
  }
  .timeNumBox{
    float: left;
    margin-top: 15px;
    width: 100%;
    height: 18px;
    line-height: 18px;
    .time{
      float: left;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }
    .lookNum{
      float: left;
      margin-left: 20px;
      img{
        float: left;
        margin-top: 4px;
        width: 13px;
        height: 9px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C3C3C3;
      }
      .num{
        float: left;
        margin-left: 5px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C3C3C3;
      }
    }
  }
}
</style>