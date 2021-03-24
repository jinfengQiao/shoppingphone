<template>
<div>

  <div class="cont_b" :style="height">
<!--    讲师块-->
    <div class="lecturer_b" v-if="show_lecturer">
      <ul>
        <li @click="jump_aboutInstructor(n.id)" v-for="(n,inx) in teacherList" :key="inx">
          <div class="head_img">
            <img :src="n.face_url" alt="">
          </div>
          <div class="study_b">
            <div class="num_stu">{{ n.sell }}人学习</div>
            <div class="common_number">共{{ n.lesson_count }}节</div>
          </div>
          <div class="lecturer_c_b">
            <div class="name_b">
              <div class="name">{{n.name}}</div>
              <div class="fans">粉丝：{{n.attr_count}}</div>
            </div>
            <div class="popularity_b">
              <img src="../assets/buSchool/popularity_img.png" alt="">
              <span>人气值：{{ n.hit }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
<!--    排行块-->
    <div class="banking_b" v-else>
<!--      前三-->
      <div class="topTthree_b">
        <div class="img_b">
          <div class="first_b">
            <div class="img_bo">
              <img :src="ranking_first.face_url" alt="">
            </div>
            <div class="name_b">
              <span class="name">{{ ranking_first.name }}</span>
              <span class="money">{{ ranking_first.count }}</span>
            </div>
          </div>
          <div class="second_b">
            <div class="img_bo">
              <img :src="ranking_second.face_url" alt="">
            </div>
            <div class="name_b">
              <span class="name">{{ ranking_second.name }}</span>
              <span class="money">{{ ranking_second.count }}</span>
            </div>
          </div>
          <div class="third_b">
            <div class="img_bo">
              <img :src="ranking_third.face_url" alt="">
            </div>
            <div class="name_b">
              <span class="name">{{ ranking_third.name }}</span>
              <span class="money">{{ ranking_third.count }}</span>
            </div>
          </div>
          <img src="../assets/buSchool/selection_bg.png" alt="">
        </div>
      </div>
<!--      四 ~ 。。。-->
      <ul>
        <li v-for="(n,index) in ranking_list" :key="index" v-show="index > 2">
          <div class="theThird_b">
            <div class="num">{{index + 1}}</div>
            <div class="name">
              <img :src="n.face_url" alt="">
              {{ n.name }}
            </div>
          </div>
          <div class="num_b">{{ n.count }}</div>
        </li>
      </ul>
    </div>
  </div>

  <div class="footer_b">
    <button type="button" v-for="(item,inx) in footer_b" :key="inx" @click="toggle_head(inx)" :class="{addcls:inx==isSelect}">{{item}}</button>
  </div>

</div>
</template>

<script>
export default {
  name: "selection_page",
  data(){
    return{
      footer_b:['讲师团队','排行榜'],
      isSelect:'',
      height:{
        width: '',
        height: '',
      },
      show_lecturer:true,
      teacherList:[],
      ranking_first:{
        count:'',
        face_url:'',
        name:'',
      },
      ranking_second:{
        count:'',
        face_url:'',
        name:'',
      },
      ranking_third:{
        count:'',
        face_url:'',
        name:'',
      },
      ranking_list:[],
      imgUrl:'http://quanpeng.oss-cn-zhangjiakou.aliyuncs.com/of/img/1616482372/bff4ed8eb54fb0e1488970b705b7f572.png',
      title:'金牌讲师评选',
      desc:'权鹏商学院金牌讲师评选活动，快来投票支持你喜欢的讲师吧',

    }
  },
  methods:{
    toggle_head(inx){
      this.isSelect = inx
      if(inx == 0){
        this.show_lecturer = true
      }else{
        this.show_lecturer = false
      }
    },
    get_height(){
      this.height.height = window.innerHeight + 'px';
    },
    jump_aboutInstructor(id){
      this.$router.push({
        path:'./aboutInstructor_ranking',
        query:{
          id:id,
        }
      });
    },
    // 获取讲师列表
    get_teacherList(){
      this.$post(localStorage.getItem('http') + 'teacher/get_list',{
        token: localStorage.getItem('token'),
        page:this.page,
        limit:this.limit
      }).then(res=>{
        // console.log(res)
        if (res.data.list.length == 0 && this.page == 1){
          this.show_teacher = true;
        }else{
          this.show_teacher = false;
          if (res.data.list.length != 0){
            var arr = [];
            arr = this.teacherList;
            res.data.list.forEach(function(v){
              arr.push(v);
            })
            this.teacherList = arr;
          }else{
            // this.$toast.error('没有更多了!');
            res.data.list = ''
            window.removeEventListener("scroll",this.onScroll);
          }
        }
      })
    },
    // 获取讲师排行榜
    get_ranking(){
      this.$post(localStorage.getItem('http') + 'school/get_vote_rank',{
      }).then(res=>{
        // console.log(res)
        this.ranking_first = res.data.list[0]
        this.ranking_second = res.data.list[1]
        this.ranking_third = res.data.list[2]
        this.ranking_list = res.data.list
      })
    },




  },
  created(){
    this.get_height();
    this.get_teacherList();
    this.get_ranking();
    this.$wxShare(this.title,this.desc,location.href,this.imgUrl)
  }
}
</script>

<style scoped lang="less">
.cont_b{
  width: 100%;
  overflow: auto;
  padding: 0 0 51px;
  box-sizing: border-box;
}
.lecturer_b{
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      margin-top: 15px;
      width: 48%;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      .head_img{
        width: 100%;
        background: #CAD6E4;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        img{
          display: block;
          width: 100%;
          //height: 154px;
          height: 140px;
          object-fit: cover;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
      .study_b{
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        background-color: rgba(0, 0, 0, 0.57);
        .num_stu{
          color: #FFFFFF;
        }
        .common_number{
          color: #C1B08A;
        }
      }
      .lecturer_c_b{
        padding: 10px;
        box-sizing: border-box;
        .name_b {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: PingFang SC;
          font-weight: 400;
          .name{
            font-size: 14px;
            color: #333333;
          }
          .fans{
            font-size: 12px;
            color: #666666;
          }
        }
        .popularity_b{
          width: 100%;
          margin-top: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img{
            width: 12px;
            height: 14px;
            margin-right: 4px;
          }
          span{
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C1B08A;
          }
        }
      }
    }
  }
}
.banking_b{
  width: 100%;
  .topTthree_b{
    position: relative;
    width: 100%;
    height: 300px;
    background: linear-gradient(180deg, #3955D0 0%, #5496DD 100%);
    padding: 0 15px;
    box-sizing: border-box;
    .img_b{
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 15px;
      box-sizing: border-box;
      width: 100%;
      height: 120px;
      .first_b{
        position: absolute;
        left: 50%;
        margin-left: -47px;
        bottom: 0;
        width: 94px;
        height: 100%;
        .img_bo{
          position: absolute;
          left: 0;
          bottom: 135px;
          width: 94px;
          height: 100px;
          background: url("../assets/buSchool/selection_icon1.png") no-repeat;
          background-size: 100% 100%;
        }
        .name_b{
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          text-align: center;
          span{
            display: inline-block;
            width: 100%;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
          }
          .name{
            font-size: 16px;
            height: 26px;
            line-height: 26px;
            background-color: #1C5DAC;
            border-radius: 20px;
          }
          .money{
            margin-top: 10px;
          }
        }
        img {
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }
      }
      .second_b{
        position: absolute;
        left: 25px;
        bottom: 0;
        width: 81px;
        height: 100%;
        .img_bo{
          position: absolute;
          left: 0;
          bottom: 120px;
          width: 81px;
          height: 86px;
          background: url("../assets/buSchool/selection_icon2.png") no-repeat;
          background-size: 100% 100%;
        }
        .name_b{
          position: absolute;
          top: 40px;
          left: 0;
          width: 100%;
          text-align: center;
          span{
            display: inline-block;
            width: 100%;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
          }
          .name{
            font-size: 16px;
            height: 26px;
            line-height: 26px;
            background-color: #1C5DAC;
            border-radius: 20px;
          }
          .money{
            margin-top: 10px;
          }
        }
        img {
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
      }
      .third_b{
        position: absolute;
        right: 35px;
        bottom: 0;
        width: 73px;
        height: 100%;
        .img_bo{
          position: absolute;
          right: 0;
          bottom: 105px;
          width: 73px;
          height: 77px;
          background: url("../assets/buSchool/selection_icon3.png") no-repeat;
          background-size: 100% 100%;
        }
        .name_b{
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          text-align: center;
          span{
            display: inline-block;
            width: 100%;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
          }
          .name{
            font-size: 16px;
            height: 26px;
            line-height: 26px;
            background-color: #1C5DAC;
            border-radius: 20px;
          }
          .money{
            margin-top: 10px;
          }
        }
        img {
          position: absolute;
          right: 2px;
          bottom: 2px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
        }
      }
      img{
        width: 100%;
        object-fit: cover;
      }
    }
  }
  ul{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    li{
      width: 100%;
      height: 57px;
      border-bottom: 1px solid #F3F3F3;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .theThird_b{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .num{
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          margin-right: 20px;
        }
        .name{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          img{
            width: 34px;
            height: 34px;
            margin-right: 15px;
            border-radius: 50%;
          }
        }
      }
      .num_b{
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #9ABDEE;
      }
    }
  }
}


.footer_b {
  position: fixed;
  bottom: 0;
  left: 0;
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
    border: 1px solid #0596EB;
    box-sizing: border-box;
    color: #0596EB;
    background-color: #ffffff;
  }
}
.addcls{
  color: #F3F4F6 !important;
  border: 0!important;
  background: #0596EB !important;
}

</style>