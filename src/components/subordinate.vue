<template>
  <div class="bg">
    <div class="head">
      <div class="headTitle">
        <img src="../assets/center/back_icon.png" alt="" @click="back">
        <span>我的下级</span>
      </div>
      <div class="headCont">
        <p>他得返利</p>
        <span>我得收益</span>
        <div class="btnBox">
          <img src="../assets/center/subordinate_btnIcon.png" alt="">
          <button type="button" @click="inviteFriends">邀请好友</button>
        </div>
      </div>
    </div>
    <div class="cont" :style="height">
      <div class="contHead">
        <div class="contHeadBox">
          <ul>
            <li v-for="(n,inx) in contHeadBoxLi" :key="inx" :class="{addCls:inx==isActive}" @click="toggle(inx)">{{n}}</li>
          </ul>
        </div>
      </div>
      <div class="contCont" :style="height1">
        <div class="contCont1" v-show="tabState==1">
          <ul>
            <li v-for="(n,inx) in yijiList" :key="inx" @click="jumpViewSupe1(n.id)">
              <template v-if="n.face_url == null || n.face_url == ''">
                <img src="../assets/center/headImg.png" alt="">
              </template>
              <template v-else>
                <img :src="n.face_url" alt="">
              </template>
              <div class="middle">
                <template v-if="n.nickname == null || n.nickname == ''">
                  <span>未命名</span>
                </template>
                <template v-else>
                  <span>{{n.nickname}}</span>
                </template>
                <div class="time">{{ n.addtime }}</div>
              </div>
              <div class="money">{{ n.sum_price }}</div>
            </li>
            <div class="overDi">没有更多了</div>
          </ul>
        </div>
        <div class="contCont2" v-show="tabState==2">
          <ul>
            <li v-for="(n,inx) in erjiList" :key="inx" @click="jumpViewSupe2(n.id)">
              <template v-if="n.face_url == null || n.face_url == ''">
                <img src="../assets/center/headImg.png" alt="">
              </template>
              <template v-else>
                <img :src="n.face_url" alt="">
              </template>
              <div class="middle">
                <template v-if="n.nickname == null || n.nickname == ''">
                  <span>未命名</span>
                </template>
                <template v-else>
                  <span>{{n.nickname}}</span>
                </template>
                <div class="time">{{ n.addtime }}</div>
              </div>
<!--              <button @click="jumpViewSupe">查看上级</button>-->
              <div class="money">{{ n.sum_price }}</div>
            </li>
            <div class="overDi">没有更多了</div>
          </ul>
        </div>
      </div>
    </div>

    <van-cell title="显示分享面板" @click="showShare = true" />
    <van-share-sheet
        v-model="showShare"
        title="-- 分享到 --"
        :options="options"
        @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: "subordinate",
  data(){
    return{
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      tabState: 1,
      isActive:'',
      height:{
        width:'',
        height:'',
      },
      height1:{
        width:'',
        height:'',
      },
      contHeadBoxLi:[
          '一级','二级'
      ],
      yijiList:[

      ],
      erjiList:[

      ],
      level:''
    }
  },
  methods: {
    back:function(){
      this.$router.go(-1);
    },
    hh(){
      this.height.height = window.innerHeight-285 +'px'
    },
    hh1(){
      this.height1.height = window.innerHeight - 377 +'px'
    },
    toggle(inx){
      this.isActive = inx;
      var inx1 = inx + 1
      this.tabState = inx1;
    },
    // 跳转到详情
    jumpViewSupe1(id){
      // this.$router.push('/viewSupe');
      this.$router.push({
        path: '/viewSupe',
        query: {
          level : 1,
          id : id
        }
      })
    },
    jumpViewSupe2(id){
      // this.$router.push('/viewSupe');
      this.$router.push({
        path: '/viewSupe',
        query: {
          level : 2,
          id : id
        }
      })
    },
    // 获取下级用户列表
    get_list(){
      this.$post(localStorage.getItem('http') + 'user_relation/get_list',{
        token: sessionStorage.getItem('token'),
        level:1
      })
      .then(res=> {
        console.log(res.data)
        this.yijiList = res.data
      })
    },
    get_list1(){
      this.$post(localStorage.getItem('http') + 'user_relation/get_list',{
        token: sessionStorage.getItem('token'),
        level:2
      })
      .then(res=> {
        // console.log(res.data)
        this.erjiList = res.data
      })
    },

    // 邀请好友
    inviteFriends(){
      this.showShare = true
    },
    onSelect(option) {
      this.$toast.success(option.name);
      this.showShare = false;
    },
  },
  created(){
    this.hh();
    this.hh1();
    this.get_list();
    this.get_list1();
  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: rgba(78, 119, 235, 1);
  //padding: 0 0 62px 0;
  //box-sizing: border-box;
}
.head{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 310px;
  background: url("../assets/center/subordinate_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  .headTitle{
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 19px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    img{
      position: absolute;
      left: 0;
      top:6px;
      width: 10px;
      height: 18px;
    }
  }
  .headCont{
    width: 100%;
    p{
      margin-top: 25px;
      margin-bottom: 10px;
      font-size: 32px;
      font-family: WenYue XinQingNianTi;
      font-weight: normal;
      color: #FFFFFF;
    }
    span{
      font-size: 32px;
      font-family: WenYue XinQingNianTi;
      font-weight: normal;
      color: #FFC000;
    }
    .btnBox{
      position: relative;
      margin-top: 25px;
      width: 145px;
      height: 52px;
      button{
        width: 100%;
        height: 52px;
        outline: none;
        border: 0;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #4E60E5;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 0 0 0 25px;
        box-sizing: border-box;
      }
      img{
        position: absolute;
        left: 18px;
        top: 50%;
        margin-top: -12px;
        width: 25px;
        height: 25px;
      }
    }

  }
}
.cont{
  position: absolute;
  top: 285px;
  left: 0;
  width: 100%;
  z-index: 3;
  padding: 25px 15px 0 15px;
  box-sizing: border-box;
  background: #E8F1FF;
  border-radius: 25px 25px 0px 0px;
  .contHead{
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    height: 52px;
    padding: 0 15px;
    box-sizing: border-box;
    background: #E8F1FF;
    .contHeadBox{
      width: 100%;
      height: 52px;
      background: rgba(5, 150, 235, 0.36);
      border-radius: 5px;
      padding: 12px 0;
      box-sizing: border-box;
      ul{
        width: 100%;
        height: 28px;
        li{
          float: left;
          width: 50%;
          height: 28px;
          line-height: 28px;
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
        }
        li:first-child{
          border-right: 1px solid rgba(5, 150, 235, 1);
          box-sizing: border-box;
        }
        .addCls{
          color: rgba(78, 119, 235, 1);
        }
      }
    }
  }
  .contCont{
    width: 100%;
    margin-top: 67px;
    overflow: auto;
    background: #FFFFFF;
    border-radius: 5px;
    .contCont1{
      float: left;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      ul{
        float: left;
        width: 100%;
        li{
          float: left;
          width: 100%;
          height: 84px;
          border-bottom: 1px solid #d2d2d2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
          }
          .middle{
            span{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #666666;
            }
            .time{
              margin-top: 5px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }
          .money{
            margin-left: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #F53033;
            min-width: 90px;
            text-align: right;
          }
        }
        .overDi{
          float: left;
          width: 100%;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
    .contCont2{
      float: left;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      ul{
        float: left;
        width: 100%;
        li{
          float: left;
          width: 100%;
          height: 84px;
          border-bottom: 1px solid #d2d2d2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            width: 44px;
            height: 44px;
            border-radius: 50%;
          }
          .middle{
            span{
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #666666;
            }
            .time{
              margin-top: 5px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }
          .money{
            margin-left: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #F53033;
            min-width: 90px;
            text-align: right;
          }
          button{
            margin-left: 10px;
            width: 70px;
            height: 24px;
            line-height: 24px;
            background: linear-gradient(0deg, #0C67FF 0%, #549CFF 100%);
            border-radius: 10px;
            border: 0;
            outline: none;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
        .overDi{
          float: left;
          width: 100%;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
}


</style>