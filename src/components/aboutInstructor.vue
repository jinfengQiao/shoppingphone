<template>
  <div>
    <div class="instructor_h_b">
      <van-sticky>
        <div class="instructor_h_h">
          <div class="information_b">
            <div class="name">{{ teacher_detail.name }}</div>
            <div class="numerical_b">
              <div class="popularity">
                人气值：{{ teacher_detail.hit }}
              </div>
              <div class="ine"></div>
              <div class="fans">
                粉丝：{{ teacher_detail.attr_count }}
              </div>
            </div>
            <div class="follow_b" @click="cli_follow">
              <template v-if="teacher_detail.attr == 0">
                <div class="follow_n">关注</div>
              </template>
              <template v-else>
                <div class="follow_o">已关注</div>
              </template>
            </div>
          </div>
          <div class="img_b">
            <img :src="teacher_detail.face_url" alt="">
          </div>
        </div>
      </van-sticky>
      <div class="instructor_h_c" v-html="teacher_detail.info"></div>
    </div>
    <div class="instructor_c_b">
      <van-sticky :offset-top="200">
        <div class="instructor_c_h">
          <ul>
            <li v-for="(n,inx) in list_curr" :key="inx" :class="{addCls_instructor:inx == isSel}" @click="listGo(inx,n.id)">{{n.name}}</li>
          </ul>
        </div>
      </van-sticky>
      <div class="instructor_c_c">
        <ul>
          <li v-for="(n,inx) in clsList" :key="inx" @click="jump_courseDetails(n.id)">
            <img :src="n.video_cover" alt="">
            <div class="detailed_b">
              <div class="title">{{ n.title }}</div>
              <p>{{ n.info }}</p>
              <div class="learned">
                <span>课程证书</span>{{ n.sell }}人已学
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutInstructor",
  data(){
    return{
      follow_no:true,
      cont:'企业财税 [1]  管理是企业经营管理的一项非常重要的内容。随着市场经济日趋规范和完善，财税管理在企业竞争中所起的作用越来越显著。企业的财税管理，要着重从税务管理的方法及措施入手，管理水平、最终提高企业竞争力的目的。',
      list_curr:[],
      isSel:true,
      teacher_detail:{
        name:'',
        hit:'',
        attr_count:'',
        attr:'',
        pic_url:'',
        info:'',
      },
      page:1,
      limit:15,
      category_id:'',
      clsList:[],
      title: '',
      desc:'',
      imgUrl:'',

    }
  },
  methods:{
    // 关注
    cli_follow(){
      this.$post(localStorage.getItem('http') + 'teacher/attr',{
        token: localStorage.getItem('token'),
        id:this.teacher_id
      }).then(res=>{
        if(res.code == 1){
          this.get_teacherDetail();
          this.isSel = 0
        }
      })
    },
    // 切换课程类
    listGo(inx,id){
      console.log(inx);
      console.log(id);
      this.isSel = inx
      this.category_id = id
      this.get_clsList(this.category_id);
    },
    // 获取讲师详情
    get_teacherDetail(teacher_id){
      this.$post(localStorage.getItem('http') + 'teacher/get_detail',{
        token: localStorage.getItem('token'),
        id:teacher_id
      }).then(res=>{
        console.log(res)
        this.teacher_detail = res.data
        this.list_curr = res.data.category
        if(res.data.category == ''){
          // console.log('不存在')
        }else{
          this.category_id = res.data.category[0].id
          this.get_clsList(this.category_id);
        }

        // console.log(location.href)

        this.$wxShare(res.data.name,res.data.info,location.href,res.data.face_url)
      })
    },
    // 获取课程列表
    get_clsList(){
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:this.page,
        limit:this.limit,
        category_id:this.category_id,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res)
        this.clsList = res.data.list
      })
    },
    // 点击跳转课程详情
    jump_courseDetails(id){
      this.$router.push({
        path:'courDetails',
        query:{
          id:id
        }
      })
    },



  },
  created() {
    this.isSel = 0
    let teacher_id = this.$route.query.id;
    this.teacher_id = teacher_id
    this.get_teacherDetail(teacher_id);
  }
}
</script>

<style scoped lang="less">
.instructor_h_b{
  width: 100%;
  .instructor_h_h{
    width: 100%;
    height: 200px;
    background: url("../assets/buSchool/aboutInstructor_bg.png") no-repeat 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 30px 20px;
    box-sizing: border-box;
    .information_b{
      flex: 1;
      margin-right: 40px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      //padding: 24px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .name{
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
      .numerical_b{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        .ine{
          width: 1px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
      .follow_b{
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        .follow_n{
          width: 70px;
          height: 24px;
          background: linear-gradient(115deg, #FFC000 0%, #FF9100 100%);
          border-radius: 24px;
          color: #FFFFFF;
          letter-spacing: 2px;
          text-align: center;
          margin-right: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .follow_o{
          width: 70px;
          height: 24px;
          background: #A3C7FF;
          border-radius: 24px;
          color: #1A6EFF;
          letter-spacing: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .img_b{
      width: 130px;
      height: 130px;
      background: #EFEFEF;
      border-radius: 20px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
      }
    }
  }
  .instructor_h_c{
    width: 100%;
    background: #1A6EFF;
    padding:  0 18px 15px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 22px;
  }
}
.instructor_c_b{
  width: 100%;
  background-color: #ffffff;
  .instructor_c_h{
    padding: 20px 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    ul::-webkit-scrollbar {
      display: none; }
    ul{
      width: 100%;
      //display: flex;
      //justify-content: space-between;
      //flex-wrap: nowrap;
      //overflow: auto;
      overflow: auto;
      flex-wrap: nowrap;
      white-space: nowrap;
      li{
        display: inline-block;
        //display: flex;
        //justify-content: center;
        //align-items: center;
        width: 75px;
        //height: 35px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #F6F6F6;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #68A0FF;
        //margin-bottom: 10px;
        margin-right: 15px;
      }
      li:last-child{
        margin-right: 0;
      }
    }
  }
  .instructor_c_c{
    width: 100%;
    padding: 0 15px 20px;
    box-sizing: border-box;
    ul{
      width: 100%;
      li{
        width: 100%;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(210, 210, 210, 0.34);
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 130px;
          object-fit: cover;
          margin-right: 10px;
        }
        .detailed_b{
          flex: 1;
          .title{
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
          }
          p{
            margin-top: 5px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
          .learned{
            margin-top: 5px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            span{
              display: inline-block;
              background: #BED6FF;
              border-radius: 8px;
              font-size: 12px;
              font-family: PingFang SC;
              color: #2B78FF;
              text-align: center;
              padding: 0 4px;
              box-sizing: border-box;
              margin-right: 4px;
            }
          }

        }
      }
    }
  }
}
.addCls_instructor{
  background: #1A6EFF!important;
  color: #FFFFFF!important;
}
</style>