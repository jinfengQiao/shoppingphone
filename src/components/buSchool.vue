<template>
  <div class="bg" id="app">
<!--    <div class="head">-->
<!--&lt;!&ndash;      <img src="../assets/center/back_icon1.png" alt="" @click="back">&ndash;&gt;-->
<!--      <span>商学院</span>-->
<!--    </div>-->
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
          <div class="contContCont" id="contContCont" :style="height">
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
        <div class="cont2Cont" id="contContCont1" :style="height1">
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
      height1:{
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
      contContCont:[],
      contContCont11:[],
      keyword:'',
      category_id:'',
      category_id1:1,
      title:'',
      info:'',
      publishtime:'',
      hit:'',
      id:'',
      contContCont1:[],
      page:1,
      list_type:1,
      scroll_element:"#contContCont",
      plus_height:359,
      sell:'',
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight-313 +'px'
    },
    hh1(){
      this.height1.height = window.innerHeight +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index){
      this.isActive = index;
      // console.log(index + 1);
      var index1 = index + 1
      this.tabState = index1;
      this.category_id = index1;
      // this.contContCont1 = [];
      // this.page = 1;
      // this.get_clsTextList();
      if(index1 == 1){
        this.list_type = 1;
        this.scroll_element = "#contContCont";
        this.plus_height = 359;
      }else{
        this.list_type = 2;
        this.scroll_element = "#contContCont1";
        this.plus_height = 95;
      }


    },
    changeCls(index,id){
      this.isSelect = index;
      // console.log(id);
      this.category_id = id;
      // console.log(this.category_id);
      this.contContCont = [];
      this.page = 1;
      this.get_clsList();
    },
    liAddCls(index,id){
      this.isliAddCls = index;
      this.category_id1 = id;
      console.log(this.category_id1);
      this.contContCont1 = [];
      this.page = 1;
      this.get_clsTextList();
    },
    jumpCurrVip(){
      if(!sessionStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              console.log('未登录')
            });
      }else{
        this.$router.push('/currVip');
      }
    },
    jumpSearch(){
      if(!sessionStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              console.log('未登录')
            });
      }else{
        this.$router.push('/search');
      }
    },
    jumpCourDetails(id){
      if(!sessionStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              console.log('未登录')
            });
      }else{
        this.$router.push({
          path:'courDetails',
          query:{
            id:id
          }
        })
      }
    },
    jumpArtiDetails(id){
      if(!sessionStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              console.log('未登录')
            });
      }else{
        this.$router.push({
          path:'artiDetails',
          query:{
            id:id
          }
        })
      }
    },


    // 获取课程分类
    get_class() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        // console.log(res.data)
        this.contContHead= res.data
        // this.category_id = res.data.id
        // console.log(this.category_id)
      })
    },
    onScroll () {
      // 内容元素的总高度
      var innerHeight = document.querySelector(this.scroll_element).clientHeight
      // 浏览器可见区域高度
      var outerHeight = document.documentElement.clientHeight
      // 滚动条的位置高度
      var scrollTop = document.documentElement.scrollTop
      console.log(scrollTop + outerHeight );
      console.log(innerHeight + this.plus_height);
      if(scrollTop + outerHeight == innerHeight + this.plus_height){
        this.page++;
        if(this.list_type == 1){
          this.get_clsList();
        }else{
          this.get_clsTextList();
        }

      }
    },
    // 获取课程列表
    get_clsList() {
      // console.log(this.page)
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:this.page,
        limit:15,
        category_id:this.category_id,
        keyword:this.keyword
      })
      .then(res=> {
        // console.log(res.data.list)
        if (res.data.list.length == 0 && this.page == 1){
          this.show12 = true;
        }else{
          this.show12 = false;
          if (res.data.list.length != 0){
              var arr = [];
              arr = this.contContCont;
              res.data.list.forEach(function(v){
                arr.push(v);
              })
              this.contContCont = arr;
          }else{
              this.$toast.error('没有更多了!');
              res.data.list = ''
              // window.removeEventListener("scroll",this.onScroll);
          }
        }
      })
    },
    // 获取文章分类
    get_classText() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        // console.log(res.data)
        this.cont2HeadLi= res.data
        // this.category_id = res.data.id
        // console.log(this.category_id)
      })
    },
    // 获取文章列表
    get_clsTextList() {
      // console.log(this.page)
      this.$post(localStorage.getItem('http') + 'school/get_article',{
        page:this.page,
        limit:15,
        category_id:this.category_id1,
        keyword:this.keyword
      })
      .then(res=> {
        // console.log(res.data.list)
        if (res.data.list.length == 0 && this.page == 1){
          this.show13 = true;
        }else{
          this.show13 = false;
          if (res.data.list.length != 0){
            var arr = [];
            arr = this.contContCont1;
            res.data.list.forEach(function(v){
              arr.push(v);
            })
            this.contContCont1 = arr;
          }else{
            this.$toast.error('没有更多了!');
            res.data.list = ''
            // window.removeEventListener("scroll1",this.onScroll1);
          }
        }
      })
    },
  },
  created(){

    // window.addEventListener('scroll1', this.onScroll1);
    this.get_class();
    this.get_clsList();
    this.hh();
    this.hh1();
    this.get_classText();
    this.get_clsTextList();
    window.addEventListener('scroll', this.onScroll );
    var wx = this.$wx
    wx.showOptionMenu();

  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.onScroll);
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
  z-index: 1999;
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
  //top: 70px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background-color: #f3f4f6;
  //padding: 0 15px;
  //box-sizing: border-box;
  .toggle{
    float: left;
    width: 100%;
    button{
      float: left;
      width: 50%;
      height: 36px;
      line-height: 32px;
      border-radius: 2px 0px 0px 2px;
      outline: none;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      box-sizing: border-box;
      border: 1px solid #0596EB;
      box-sizing: border-box;
      color: #0596EB;
      background-color: #ffffff;
    }
    button:last-child{
      float: right;
      border-radius: 0px 2px 2px 0px;
    }
    .cur{
      color: #F3F4F6!important;
      border: 0!important;
      background: #0596EB!important;
    }
  }
}
.cont1{
  float: left;
  width: 100%;
  //display: none;
}
.cont{
  float: left;
  position: relative;
  width: 100%;
  .banner{
    position: fixed;
    top: 36px;
    left: 0;
    float: left;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #f3f4f6;
    z-index: 11;
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
    position: relative;
    float: left;
    width: 100%;
    background-color: #ffffff;
    padding: 251px 15px 62px;
    box-sizing: border-box;
    overflow: auto;
    .contContHead{
      padding: 0 15px;
      box-sizing: border-box;
      position: fixed;
      top: 156px;
      left: 0;
      z-index: 11;
      width: 100%;
      background-color: #ffffff;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 24px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 12px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
      ul:after {content: "";width: 163px;}
    }
    .contContHeadAdd{
      background: rgba(13, 104, 255, 0.27)!important;
      color: #0E69FF!important;
    }
    .contContCont::-webkit-scrollbar {
      //display: none;
    }
    .contContCont{
      width: 100%;
      //overflow: auto;

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
        //li:last-child{
        //  margin-bottom: 62px;
        //}
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
    position: fixed;
    top: 36px;
    left: 0;
    z-index: 2;

    width: 100%;
    height: 57px;
    line-height: 42px;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    ul{
      float: left;
      height: 42px;
      display: flex;
      justify-content: space-between;
      li{
        padding: 0 2px;
        margin-right: 8px;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
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
    float: left;
    position: relative;
    width: 100%;
    padding: 96px 0 62px 0;
    box-sizing: border-box;
    background-color: #ffffff;
    overflow: auto;
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
      padding: 100px 0 0 0;box-sizing: border-box;
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