<template>
  <div>
    <div class="posiBox">
<!--      <div class="head">-->
<!--        <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--        <span>我的积分</span>-->
<!--      </div>-->
      <div class="banner">
        <div class="bannerBox">
          <div class="moneyBox">
            <p>可用积分</p>
            <span>{{score}}</span>
            <button type="button" @click="jumpSignIn">签到换积分</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont" id="cont" :style="height">
      <ul>
        <li v-for="(n,inx) in jifenList" :key="inx">
          <div class="left">
            <template v-if="n.goods_type == '' || n.goods_type == null">
              <span>{{n.source}}</span>
            </template>
            <template v-else>
              <span>{{n.source + n.goods_type}}</span>
            </template>
            <div class="time">{{ n.addtime}}</div>
          </div>
          <div class="right">
            <template v-if="n.type == 1">
              <span>{{n.num}}</span>
            </template>
            <template v-if="n.type == 2">
              <span class="spanAdd">{{n.num}}</span>
            </template>
          </div>
        </li>
      </ul>

      <div class="nullBox" v-show="show12">
        <img src="../assets/buSchool/nullBoxImg1.png" alt="">
      </div>
    </div>
    <div class="btnBox" v-show="jifenDuihuan">
      <button type="button">兑换积分</button>
    </div>

    <noSharing></noSharing>
  </div>
</template>

<script>

import noSharing from "@/components/noSharing";

export default {
  name: "integral",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      jifenDuihuan:false,
      // show:true,
      jifenList:[],
      score:'',
      page:1,
      limit:15,
      show12:false,
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpSignIn:function (){
      // console.log(this.currentYear + "-" +  this.currentMonth+ "-" + day);
      this.$post(localStorage.getItem('http') + 'user_score/add',{
        token: localStorage.getItem('token'),
        source: 1,
      })
      .then(res=> {
        if(res.code == 1){
          this.$toast.success(res.msg);
        }
        this.$router.push('/signIn');
      })

    },
    onScroll () {
      // 内容元素的总高度
      let innerHeight = document.querySelector('#cont').clientHeight
      // 浏览器可见区域高度
      let outerHeight = document.documentElement.clientHeight
      // 滚动条的位置高度
      let scrollTop = document.documentElement.scrollTop
      // console.log(scrollTop + outerHeight );
      // console.log(innerHeight + 790);
      if(scrollTop + outerHeight == innerHeight + 790){
        this.page++;
        this.get_list();
      }
    },
    // 获取积分记录
    get_list() {
      this.$post(localStorage.getItem('http') + 'user_score/get_list',{
        token: localStorage.getItem('token'),
        page:this.page,
        limit:this.limit
      })
      .then(res=> {
        // console.log(res)
        if (res.data.list.length != 0){
          var arr = [];
          arr = this.jifenList;
          res.data.list.forEach(function(v){
            arr.push(v);
          })
          this.jifenList = arr;
          this.show12 = false;
        }else{
          this.show12 = true;
          this.$toast.error('没有更多了!');
          res.data.list = ''
        }
      })
    },
    // 获取积分
    get_money(){
      this.$post(localStorage.getItem('http') + 'user_info/get_money',{
        token: localStorage.getItem('token'),
      })
      .then(res=> {
        // console.log(res)
        this.score = res.data.score
        if(!this.score){
          this.score = 0;
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.onScroll);
  },
  created(){
    this.hh();
    this.get_list();
    // let score =this.$route.query.score;
    // this.score = score
    this.get_money();
    window.addEventListener('scroll', this.onScroll);


  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  background-color: #f3f4f6;
  padding: 0 0 62px 0;
  box-sizing: border-box;
}
.posiBox{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
}
.head{
  position: relative;
  width: 100%;
  height: 70px;
  line-height: 70px;
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
.banner{
  width: 100%;
  height: 212px;
  background-color: #f3f4f6;
  padding: 15px;
  box-sizing: border-box;
  .bannerBox{
    width: 100%;
    height: 182px;
    background: url("../assets/center/integral_bg.png") no-repeat;
    background-size: 100% 100%;
    .moneyBox{
      width: 100%;
      text-align: center;
      padding: 35px 0 0 0;
      box-sizing: border-box;
      span{
        margin-top: 3px;
        display: block;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
      }
      p{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      button{
        margin-top: 5px;
        width: 142px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4E77EB;
        border: 0;
        outline: none;
      }
    }
  }
}
.cont{
  width: 100%;
  padding: 212px 0 0 0;
  box-sizing: border-box;
  //margin-top: 212px;
  //margin-bottom: 76px;
  background-color: #ffffff;
  ul{
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    li:last-child{
      border: 0;
    }
    li{
      width: 100%;
      height: 83px;
      border-bottom: 1px solid #DCDCDC;
      box-sizing: border-box;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      .left{
        float: left;
        //width: 100px;
        span{
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .time{
          margin-top: 10px;
          width: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
      .right{
        float: right;
        //width: 100px;
        text-align: right;
        span{
          width: 100%;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #F53033;
          line-height: 53px;
        }
        .spanAdd{
          color: #0596EB;
        }
      }
    }
  }
}
.btnBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 76px;
  padding: 20px 35px;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  button{
    width: 136px;
    height: 36px;
    line-height: 36px;
    background: #0596EB;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
}
.nullBox{
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
  img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
}
</style>