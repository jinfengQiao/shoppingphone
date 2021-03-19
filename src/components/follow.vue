<template>
  <div class="follow_b" :style="height">
    <ul>
      <li v-for="(n,inx) in attr_teacher" :key="inx">
        <div class="li_h">
          <div class="name_b" @click="jump_aboutInstructor(n.id)">
            <div class="img_b">
              <img :src="n.face_url" alt="">
            </div>
            <span>{{n.name}}</span>
          </div>
          <div class="cli_follow_b" @click="cli_follow(n.id,inx)">
            <span class="follow_ok" v-if="n.attr_a">已关注</span>
            <span class="follow_no" v-else>关注</span>
          </div>
        </div>
        <div class="li_c">
          <ul>
            <li v-for="(item,index) in n.course" :key="index" @click="jump_courseDetails(item.id)">
              <img :src="item.video_cover" alt="">
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="nullBox" v-show="show12">
      <img src="../assets/buSchool/nullBoxImg1.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "follow",
  data(){
    return{
      show12:false,
      attr_teacher:[],
      height:{
        width:'',
        height: '',
      }
    }
  },
  methods: {
    // 点击关注
    cli_follow(id,inx) {
      this.$post(localStorage.getItem('http') + 'teacher/attr', {
        token: localStorage.getItem('token'),
        id: id
      }).then(res => {
        console.log(res.data.attr)
        this.attr_teacher[inx].attr_a = res.data.attr

      })
    },
    // 获取关注讲师
    get_attr_teacher() {
      this.$post(localStorage.getItem('http') + 'user_info/get_attr_teacher', {
        token: localStorage.getItem('token'),
      }).then(res => {
        console.log(res)
        if (res.code == 1) {
          if (res.data.length == 0) {
            this.show12 = true;
          } else {
            this.show12 = false
            this.attr_teacher = res.data.map(item =>({...item, attr_a: 1}))
          }
        }
      })
    },
    // 获取高度
    get_height(){
      this.height.height = window.innerHeight + 'px';
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
    // 点击跳转讲师详情
    jump_aboutInstructor(id){
      this.$router.push({
        path:'./aboutInstructor',
        query:{
          id:id,
        }
      });
    }


  },
  created() {
    this.get_attr_teacher();
    this.get_height();
  }
}
</script>

<style scoped lang="less">
.follow_b{
  ul{
    width: 100%;
    //background-color: rgba(210, 210, 210, 1);
    li{
      width: 100%;
      //height: 371px;
      padding: 20px 15px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-bottom: 1px solid rgba(210, 210, 210, 0.3);
      .li_h{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name_b{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img_b{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            background-color: #efefef;
          }
          img{
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
          }
          span{
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
          }
        }
        .cli_follow_b{
          span{
            letter-spacing: 2px;
            text-align: center;
            width: 60px;
            height: 24px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            border-radius: 21px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .follow_ok{
            background: #F2F2F2;
            color: #999999;
          }
          .follow_no{
            border: 1px solid #333333;
            background: #ffffff;
            color: #333333;
            box-sizing: border-box;

          }
        }
      }
      .li_c{
        width: 100%;
        margin-top: 20px;
        ul{
          width: 100%;
          overflow: auto;
          display: flex;
          justify-content: flex-start;
          flex-wrap: nowrap;
          li{
            padding: 0!important;
            height: auto!important;
            border: 0;
            margin-right: 10px;
            width: 150px;
            img{
              //width: 100%;
              width: 150px;
              object-fit: cover;
            }
            span{
              //margin-top: 12px;
              display: inline-block;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
            }
          }
        }
        ul::-webkit-scrollbar {
          display: none;
        }
      }
    }
    li:last-child{
      border: none;
    }
  }
}

.nullBox{
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  img{
    width: 181px;
    height: 181px;
  }
}
</style>