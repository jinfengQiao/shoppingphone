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
              <template v-if="this.teacher_detail_count == 0">
                <div class="follow_n">投票</div>
              </template>
              <template v-else>
                <div class="follow_o">已投票</div>
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
<!--    公众号弹窗-->
    <div class="official_b" v-show="official_account">
      <img src="../assets/buSchool/official_b_img.png" alt="" class="official_b_img">
      <p>请先关注公众号</p>
      <img src="../assets/buSchool/close_img.png" alt="" class="close_img" @click="close_official_account">
    </div>



  </div>
</template>

<script>
export default {
  name: "aboutInstructor_ranking",
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
        face_url:'',
      },
      page:1,
      limit:15,
      category_id:'',
      clsList:[],
      title: '',
      desc:'',
      imgUrl:'',
      teacher_detail_count:'',
      official_account:false,

    }
  },

  methods:{
    // 投票
    cli_follow(){
      this.$post(localStorage.getItem('http') + 'school/vote',{
        openid: localStorage.getItem('openid'),
        teacher_id:this.teacher_id
      }).then(res=>{
        // console.log('点击投票的结果' + res)
        if(res.code == 1){
          // console.log('投票成功');
          this.get_whethervote();
          this.$toast.success(res.msg);
        }else if(res.code == 2){
          this.$toast.error('请先关注公众号');
        }else{
          // if(this.teacher_detail_count == 0){
          //   this.$toast.error('您的票数已用完，请明天再来吧~');
          // }else{
          //   this.$toast.error('您今天已经为Ta投过票啦~');
          // }
          this.$toast.error(res.msg);
        }
      })
    },
    // 切换课程类
    listGo(inx,id){
      // console.log(inx);
      // console.log(id);
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
        // console.log(res)
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
        keyword:this.keyword,
        teacher_id:this.teacher_id,
      })
          .then(res=> {
            // console.log(res)
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
    // 获取是否可以为讲师投票
    get_whethervote(){
      this.$post(localStorage.getItem('http') + 'school/get_vote_count',{
        openid: localStorage.getItem('openid'),
        teacher_id:this.teacher_id,
      })
      .then(res=> {
        if(res.code == 1){
          this.teacher_detail_count = res.data.count
        }else{
          this.teacher_detail_count = 0
        }
      })
    },
    // 关闭公众号弹窗
    close_official_account(){
      this.official_account = false
    }
  },
  created() {
    this.isSel = 0
    let teacher_id = this.$route.query.id;
    this.teacher_id = teacher_id
    this.get_teacherDetail(teacher_id);
    this.get_whethervote();
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
        //margin-right: 15px;
        margin-right: 2%;
        //padding: 4px 18px;
        width: 23.5%;
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
      }
      li:last-child{
        margin-right: 0!important;
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
.official_b{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
  .official_b_img{
    width: 134px;
    height: 134px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -67px;
    margin-top: -97px;
  }
  p{
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: 50px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    letter-spacing: 2px;
  }
  .close_img{
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -16px;
    margin-top: 120px;
  }
}
</style>