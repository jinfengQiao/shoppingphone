<template>
  <div class="bg" :style="height">
    <div class="head">
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
      <span>商学院</span>
    </div>
    <div class="contHead">
      <div class="toggle">
        <button type="button" class="kecheng" :class="{cur:index==isActive}" @click="listGo(index)" v-for="(n,index) in buttonText" :key="index">{{n}}</button>
      </div>
    </div>
    <div class="cont">
      <div class="cont1" v-show="tabState==1">
        <div class="banner">
        <div class="bannerBox">
          <div class="bannerBoxLeft">
            <span>课程入门VIP</span>
            <p>可任选一系列课程观看学习,不断更新中</p>
          </div>
          <div class="bannerBoxRight">
            <button type="button" @click="jumpCurrVip">去开通></button>
          </div>
        </div>
        </div>
        <div class="contCont">
          <div class="contContHead">
            <ul>
              <li v-for="(n,index) in contContHead" :key="index" :class="{contContHeadAdd:index==isSelect}" @click="changeCls(index,n.id)">{{n.name}}</li>
            </ul>
          </div>
          <div class="contContCont">
            <ul>
              <li @click="jumpCourDetails(n.id)" v-for="(n,index) in contContCont" :key="index">
                <img :src="n.video_cover" alt="">
                <div class="box1">
                  <div class="title">{{n.title}}</div>
                  <p>{{n.info}}</p>
                  <div class="zhengshuBox">
                    <button type="button">课程证书</button>
                    <span>{{n.sell}}人已学</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="nullBox" v-show="show12">
              <img src="../assets/buSchool/nullBoxImg1.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="cont2" v-show="tabState==2">
        <div class="cont2Head">
          <ul>
            <li v-for="(n,index) in cont2HeadLi" :key="index" :class="{liAddCls:index==isliAddCls}" @click="liAddCls(index,n.id)">{{n.name}}</li>
          </ul>
          <img src="../assets/buSchool/search_icon.png" alt="" @click="jumpSearch">
        </div>
        <div class="cont2Cont">
          <div class="cont2Cont1" v-for="(n,inx) in contContCont1" :key="inx" @click="jumpArtiDetails(n.id)">
            <span>{{ n.title }}</span>
            <p>{{ n.info }}</p>
            <ul>
              <li v-for="(spu,k) in n.media_url.img" :key="k">
                <img :src="spu" alt="">
              </li>
            </ul>
            <div class="timeNumBox">
              <div class="time">{{n.publishtime}}</div>
              <div class="lookNum">
                <img src="../assets/buSchool/look_icon.png" alt="">
                <div class="num">{{n.hit}}</div>
              </div>
            </div>
          </div>

          <div class="nullBox" v-show="show13">
            <img src="../assets/buSchool/nullBoxImg2.png" alt="">
          </div>
<!--          <div class="cont2Cont2">-->
<!--            <span>最孤独的时刻没有和自己在一起</span>-->
<!--            <div class="videoBox">-->
<!--              <img src="../assets/buSchool/ceshiVideo1.png" alt="">-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <footer_nav></footer_nav>
  </div>
</template>

<script>
import footer_nav from "@/components/footer_bar";

export default {
  name: "buSchool",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      show12:false,
      show13:false,
      tabState: 1,
      isActive: '',
      isSelect:'',
      isliAddCls:'',
      buttonText:[
          '课程','文章'
      ],
      contContHead:[
          // '财税','法律','融资','股权','资本','人力'
      ],
      cont2HeadLi:[
          // '精选','税率','日常','饮食',
      ],
      contContCont:[
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // }
      ],
      contContCont11:[],
      keyword:'',
      category_id:'',
      title:'',
      info:'',
      publishtime:'',
      hit:'',
      id:'',
      contContCont1:'',
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index){
      var that = this
      that.isActive = index;
      console.log(index + 1);
      var index1 = index + 1
      that.tabState = index1;
      if(that.tabState == 2){
        this.get_clsTextList1();
      }
    },
    changeCls(index,id){
      this.isSelect = index;
      console.log(id);
      this.category_id = id;
      console.log(this.category_id);
      this.get_clsList();
    },
    liAddCls(index,id){
      this.isliAddCls = index;
      this.category_id1 = id;
      console.log(this.category_id1);
      this.get_clsTextList();
    },
    jumpCurrVip(){
      this.$router.push('/currVip');
    },
    jumpSearch(){
      this.$router.push('/search');
    },
    jumpCourDetails(id){
      this.$router.push({
        path:'courDetails',
        query:{
          id:id
        }
      })
    },
    jumpArtiDetails(id){
      this.$router.push({
        path:'artiDetails',
        query:{
          id:id
        }
      })
    },


    // 获取课程分类
    get_class() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        console.log(res.data)
        this.contContHead= res.data
        // this.category_id = res.data.id
        // console.log(this.category_id)
      })
    },
    // 获取课程列表
    get_clsList(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:page,
        limit:limit,
        category_id:this.category_id,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont= res.data.list
        console.log(this.contContCont);
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    // 获取文章分类
    get_classText() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        console.log(res.data)
        this.cont2HeadLi= res.data
        // this.category_id = res.data.id
        // console.log(this.category_id)
      })
    },
    // 获取文章列表
    get_clsTextList(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_article',{
        page:page,
        limit:limit,
        category_id:this.category_id1,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont1= res.data.list
        if(res.data.list == '' || res.data.list == null){
          this.show13 = true;
        }else{
          this.show13 = false;
        }
      })
    },
    get_clsTextList1(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_article',{
        page:page,
        limit:limit,
        category_id:1,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont1= res.data.list
        // if(res.data.list == '' || res.data.list == null){
        //   this.show12 = true;
        // }else{
        //   this.show12 = false;
        // }
      })
    },
  },
  created(){
    this.get_class();
    this.get_clsList();
    this.hh();
    this.get_classText();
    this.get_clsTextList();
  },
  components: {
    footer_nav
  }
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: #ffffff;
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
.contHead{
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 25px;
  z-index: 3;
  background-color: #f3f4f6;
  .toggle{
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -65px;
    width: 130px;
    button{
      float: left;
      width: 65px;
      height: 25px;
      line-height: 23px;
      border-radius: 2px 0px 0px 2px;
      outline: none;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      box-sizing: border-box;
      border: 1px solid #0596EB;
      box-sizing: border-box;
      color: #0596EB;
    }
    button:last-child{
      float: right;
      border-radius: 0px 2px 2px 0px;
    }
    .cur{
      color: #F3F4F6;
      border: 0;
      background: #0596EB;
    }
  }
}
.cont1{
  float: left;
  width: 100%;
  //display: none;
}
.cont{
  position: relative;
  width: 100%;
  margin-top: 95px;
  .banner{
    float: left;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #f3f4f6;
    .bannerBox{
      float: left;
      width: 100%;
      //height: 75px;
      background: url("../assets/buSchool/buSchoolHead_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 15px;
      box-sizing: border-box;
      .bannerBoxLeft{
        float: left;
        width: 175px;
        span{
          float: left;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        p{
          float: left;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
      .bannerBoxRight{
        float: right;
        width: 78px;
        height: 20px;
        button{
          width: 78px;
          height: 20px;
          line-height: 20px;
          background: #FFFFFF;
          box-shadow: 0px 4px 7px 1px rgba(0, 88, 220, 0.35);
          border-radius: 10px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #2D80FF;
          outline: none;
          border: 0;
        }
      }
    }
  }
  .contCont{
    float: left;
    width: 100%;
    background-color: #ffffff;
    padding: 0 15px 62px;
    box-sizing: border-box;
    .contContHead{
      width: 100%;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 20px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
      ul:after {content: "";width: 138px}
    }
    .contContHeadAdd{
      background: rgba(13, 104, 255, 0.27)!important;
      color: #0E69FF!important;
    }
    .contContCont{
      width: 100%;
      margin-top: 20px;
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 110px;
          border-bottom: 1px solid rgba(220, 220, 220, 0.34);
          padding: 15px 0 14px;
          box-sizing: border-box;
          display: flex;
          justify-items: center;
          justify-content: flex-start;
          img{
            margin-right: 5px;
            width: 130px;
            height: 80px;
          }
          .box1{
            position: relative;
            height: 80px;
            .title{
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
            }
            p{
              height: 18px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
            .zhengshuBox{
              position: absolute;
              left: 0;
              bottom: 0;
              height: 18px;
              min-width: 150px;
              button{
                float: left;
                width: 56px;
                height: 18px;
                background: #BED6FF;
                border-radius: 8px;
                font-size: 12px;
                font-family: PingFang SC;
                color: #2B78FF;
                outline: none;
                border: 0;
                line-height: 16px;
              }
              span{
                float: left;
                margin-left: 4px;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
              }
            }
          }
        }
      }
      .nullBox{
        width: 100%;
        text-align: center;
        img{
          width: 50%;
          height: 50%;
          object-fit: cover;
        }
      }
    }
  }

}
.cont2{
  float: left;
  width: 100%;
  background-color: #ffffff;
  //display: none;
  .cont2Head{
    margin-top: 15px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    ul{
      float: left;
      height: 42px;
      display: flex;
      justify-content: space-between;
      li{
        padding: 0 2px;
        margin-right: 8px;
        color: rgba(153, 153, 153, 1);
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
      }
      .liAddCls{
        border-bottom: 2px solid rgba(93, 128, 252, 1);
        color: rgba(93, 128, 252, 1)!important;
      }
    }
    img{
      float: right;
      margin-top: 11px;
      width: 20px;
      height: 20px;
    }
  }
  .cont2Cont{
    width: 100%;
    padding: 0 0 62px 0;
    box-sizing: border-box;
    .cont2Cont1{
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #EEEEEE;
      span{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      p{
        margin-top: 12px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      ul:after{
        content:' ';
        width:90px; //这个宽度和子元素宽度一致
        height:0;
        display:block;
      }
      ul{
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
            object-fit: cover;
          }
        }
      }
      .timeNumBox{
        margin-top: 12px;
        width: 100%;
        height: 18px;
        line-height: 18px;
        .time{
          float: left;
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
    .cont2Cont2{
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #EEEEEE;
      span{
        width: 100%;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .videoBox{
        width: 100%;
        height: 160px;
        margin-top: 15px;
        img{
          float: left;
          width: 100%;
          height: 100%;
        }
      }
    }
    .nullBox{
      padding: 20px 0 0 0;box-sizing: border-box;
      width: 100%;
      text-align: center;
      img{
        width: 50%;
        height: 50%;
        object-fit: cover;
      }
    }

  }
}





</style>