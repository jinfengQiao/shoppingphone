<template>
  <div class="bg" :style="height">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>我的课程</span>-->
<!--    </div>-->
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index,n.name)">{{n.name}}</li>
      </ul>
    </div>
    <div class="cont">
      <div class="firstLi">
        <span>课程VIP卡</span>
        <div class="btnBox" @click="jump_currVip">
          ·血拼购物不如买份课程·GO
        </div>
      </div>
      <ul>
        <li class="nthChildLi" v-for="(n,inx) in lessonList" :key="inx" @click="jumpDetails(n)">
          <p>
            <span>{{ spanName }}</span>
            {{n.title}}
          </p>
          <div class="time">
            <div class="timeBox">{{ n.addtime }}</div>
            <span>{{n.lesson_count}}课时</span>
          </div>
          <div class="baomingBox">
<!--            <div class="baomingBoxLeft" v-show="false">-->
<!--              <img src="../assets/center/headImg.png" alt="">-->
<!--              <span>烽火戏诸侯</span>-->
<!--            </div>-->
            <div class="baomingBoxRight">
              <img src="../assets/center/baomingImg1.png" alt="">
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
  name: "lesson",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      isActive:'',
      tabList:[
          // '财税','法律','融资','股权','资本','人力'
      ],
      lessonList:'',
      category_id:0,
      show12:false,
      spanName:'',

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
    listGo(index,name){
      // console.log(index)
      // console.log(name)
      this.isActive = index;
      // var index1 = index + 1;
      this.spanName = name
      // console.log(this.spanName)
      this.category_id = index
      // console.log(this.category_id)
      this.get_user_lesson();
    },
    // 获取课程分类
    get_class() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        // console.log(res)
        this.tabList= res.data
        this.spanName = res.data[0].name
      })
    },
    // 获取课程列表
    get_user_lesson(page,limit){
      // console.log(this.category_id)
      this.$post(localStorage.getItem('http') + 'user_info/get_user_lesson',{
        token: localStorage.getItem('token'),
        page:page,
        limit: limit,
        category_id:this.category_id
      })
      .then(res=> {
        // console.log(res)
        this.lessonList = res.data
        if(this.lessonList == '' || this.lessonList == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    jumpDetails(n){
      this.course_id = n.course_id
      this.$router.push({
        path:'courDetails',
        query:{
          id:this.course_id
        }
      })
    },
    // 血拼不如买卡GO调到课程卡
    jump_currVip(){
      this.$router.push('./currVip');
    }
  },
  created(){
    this.hh();
    this.get_class();
    this.get_user_lesson();

  },
  components: {
    noSharing
  }
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
.tab{
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  //margin-top: 70px;
  width: 100%;
  height: 52px;
  line-height: 52px;
  background-color: #FFFFFF;
  padding: 0 15px;
  box-sizing: border-box;
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    overflow-x: auto;
    white-space:nowrap;
    li{
      margin-right: 15px;
      cursor: pointer;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
    }
    li:last-child{
      margin-right: 0;
    }
  }
  ul::-webkit-scrollbar {
    display: none;
  }
}
.cur{
  color: #5D80FC!important;
}
.cont{
  float: left;
  position: relative;
  z-index: 1;
  margin-top: 52px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  .firstLi{
    position: relative;
    background: url("../assets/center/lessonImg1.png") no-repeat;
    background-size: 100% 100%;
    border: 0;
    padding:  30px 15px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 15px;
    width: 100%;
    height: 150px;
    //padding: 36px 30px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 1px solid #E6E6E6;
    border-radius: 20px;
    span{
      float: left;
      width: 100%;
      font-size: 32px;
      font-family: FZCuQian-M17S;
      font-weight: bold;
      color: #FFFFFF;
      padding:  0 0 0 20px;
    }
    .btnBox{
      position: absolute;
      bottom: 30px;
      left: 15px;
      float: left;
      padding: 0 10px;
      box-sizing: border-box;
      height: 26px;
      line-height: 26px;
      background: #F29548;
      border-radius: 10px;
      font-size: 18px;
      font-family: SimHei;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
  ul {
    float: left;
    width: 100%;
    //li:first-child {
    //  position: relative;
    //  margin-bottom: 15px;
    //  width: 100%;
    //  height: 150px;
    //  //padding: 36px 30px;
    //  box-sizing: border-box;
    //  background-color: #ffffff;
    //  border: 1px solid #E6E6E6;
    //  border-radius: 20px;
    //}
    li:last-child{
      margin-bottom: 5px;
    }
    .nthChildLi{
      float: left;
      padding: 15px;
      box-sizing: border-box;
      //height: 180px;
      position: relative;
      margin-bottom: 15px;
      width: 100%;
      //height: 150px;
      //padding: 36px 30px;
      box-sizing: border-box;
      background-color: #ffffff;
      border: 1px solid #E6E6E6;
      border-radius: 20px;
      p{
        float: left;
        width: 100%;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 500;
        color: #333333;
        line-height: 26px;
        span{
          padding: 1px 4px;
          border: 1px solid #4E77EB;
          border-radius: 5px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #4E77EB;
          box-sizing: border-box;
        }
      }
      .time{
        float: left;
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #777777;
        .timeBox{
          float: left;
        }
        span{
          float: left;
          margin-left: 20px;
        }
      }
      .baomingBox{
        float: left;
        width: 100%;
        margin-top: 5px;
        .baomingBoxLeft{
          float: left;
          text-align: center;
          width: 80px;
          img{
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }
          span{
            float: left;
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
          }
        }
        .baomingBoxRight{
          float: right;
          margin-right: 10px;
          img{
            width: 60px;
            height: 52px;
          }
        }
      }
    }
  }
  .nullBox{
    width: 100%;
    text-align: center;
    padding: 24px 0 ;
    box-sizing: border-box;
    img{
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
}


</style>