<template>
  <div class="bg">
    <div class="head">
<!--      <div class="headTitle">-->
<!--        <img src="../assets/center/back_icon.png" alt="" @click="back">-->
<!--        <span>我的下级</span>-->
<!--      </div>-->
      <div class="headCont">
        <p>他得返利</p>
        <span>我得收益</span>
        <div class="btnBox">
          邀请码：{{yaoqingCode}}
        </div>
        <button type="button" @click="get_invitationPoster">点击生成邀请海报</button>
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
      <div class="contCont" :style="height1" :class="{contCont_top:is_headerBarShow}">
        <div class="contCont1" v-show="tabState==1">
          <ul>
            <li v-for="(n,inx) in yijiList" :key="inx" @click="jumpViewSupe1(n.id)">
              <div class="cont_left_b">
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
              </div>
              <div class="money">{{ n.sum_price }}</div>
            </li>
            <div class="overDi">没有更多了</div>
          </ul>
        </div>
        <div class="contCont2" v-show="tabState==2">
          <ul>
            <li v-for="(n,inx) in erjiList" :key="inx" @click="jumpViewSupe2(n.id)">
              <div class="cont_left_b">
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
              </div>
<!--              <button @click="jumpViewSupe">查看上级</button>-->
              <div class="money">{{ n.sum_price }}</div>
            </li>
            <div class="overDi">没有更多了</div>
          </ul>
        </div>
      </div>
    </div>

<!--    <van-cell title="显示分享面板" @click="showShare = true" />-->
<!--    <van-share-sheet-->
<!--        v-model="showShare"-->
<!--        title="&#45;&#45; 分享到 &#45;&#45;"-->
<!--        :options="options"-->
<!--        @select="onSelect"-->
<!--    />-->
<!--    <wechatInv></wechatInv>-->
    <noSharing></noSharing>

    <div class="grey_background" v-show="show" @click="close_invitationPoster">
      <div class="invitationPoster_b">
        <img :src="pic_url" alt="" @click.stop>
      </div>
    </div>

  </div>
</template>

<script>
// import wechatInv from "@/components/wechatInv";
import noSharing from "@/components/noSharing";

export default {
  name: "subordinate",
  data() {
    return {
      // showShare: false,
      options: [
        {name: '微信', icon: 'wechat'},
        // { name: '微博', icon: 'weibo' },
        // { name: '复制链接', icon: 'link' },
        // { name: '分享海报', icon: 'poster' },
        // { name: '二维码', icon: 'qrcode' },
      ],
      tabState: 1,
      isActive: 0,
      height: {
        width: '',
        height: '',
      },
      height1: {
        width: '',
        height: '',
      },
      contHeadBoxLi: [
        '一级', '二级'
      ],
      yijiList: [],
      erjiList: [],
      level: '',
      integrityurl: '',
      yaoqingCode: 0,
      show:false,
      pic_url:'',
      is_headerBarShow:true,
    }
  },
  methods: {
    back: function () {
      this.$router.go(-1);
    },
    hh() {
      // this.height.height = window.innerHeight - 285 + 'px'
    },
    hh1() {
      this.height1.height = window.innerHeight + 'px'
    },
    toggle(inx) {
      this.isActive = inx;
      var inx1 = inx + 1
      this.tabState = inx1;
    },
    // 跳转到详情
    jumpViewSupe1(id) {
      // this.$router.push('/viewSupe');
      this.$router.push({
        path: '/viewSupe',
        query: {
          level: 1,
          id: id,
        }
      })
    },
    jumpViewSupe2(id) {
      // this.$router.push('/viewSupe');
      this.$router.push({
        path: '/viewSupe',
        query: {
          level: 2,
          id: id,
        }
      })
    },
    // 获取下级用户列表
    get_list() {
      this.$post(localStorage.getItem('http') + 'user_relation/get_list', {
        token: localStorage.getItem('token'),
        level: 1
      })
          .then(res => {
            // console.log(res.data)
            this.yijiList = res.data
          })
    },
    get_list1() {
      this.$post(localStorage.getItem('http') + 'user_relation/get_list', {
        token: localStorage.getItem('token'),
        level: 2
      })
          .then(res => {
            // console.log(res.data)
            this.erjiList = res.data
          })
    },
    // 获取邀请码
    get_Code() {
      this.$post(localStorage.getItem('http') + 'user_info/get_invite_code', {
        token: localStorage.getItem('token'),
      }).then(res => {
        // console.log(res.data)
        this.yaoqingCode = res.data.invite_code
      })
    },
    // 生成邀请海报
    get_invitationPoster(){
      // console.log(123)
      this.show = true
      this.$post(localStorage.getItem('http') + 'user_info/make_playbill', {
        token: localStorage.getItem('token'),
      }).then(res => {
        // console.log(res)
        if(res.code == 1){
          // console.log(res)
          this.pic_url = res.data.pic_url
        }
      })
    },
    // 关闭邀请海报弹窗
    close_invitationPoster(){
      this.show = false
    }


  },
  created() {
    this.integrityurl = window.location.href;
    this.get_Code();
    this.hh();
    this.hh1();
    this.get_list();
    this.get_list1();

    // var wx = this.$wx
    // wx.showOptionMenu();

    var openid_bar = localStorage.getItem('invite_openid');
    if(!openid_bar){
      this.is_headerBarShow = false
    }else{
      this.is_headerBarShow = true
    }

  },
  components: {
    noSharing
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to)
    // console.log(from)
      next(vm=>{
        // console.log(vm)
        if(from.query.level == 2){
          // console.log('二级')
          vm.isActive=1
          vm.tabState=2
        }else{
          // console.log('一级')
          vm.isActive=0
          vm.tabState=1
        }
      });



    // if(to.name == 'viewSipe'){
    //   console.log('是一级')
    //   next();
    // }else{
    //   console.log('是二级');
    //   next();
    // }
    // if(from.name == 'viewSupe'){
    //   next(vm=>{
    //     if(vm.level == 2){
    //       vm.isActive=1
    //       vm.tabState=2
    //     }else {
    //       vm.isActive=0
    //       vm.tabState=1
    //     }
    //   });
    // }else{
    //   next(vm=>{
    //     vm.isActive=0
    //     vm.tabState=1
    //   });
    // }
  },
};

</script>

<style lang="less" scoped>
.bg{
  position: relative;
  width: 100%;
  background-color: rgba(78, 119, 235, 1);
  //padding: 0 0 62px 0;
  //box-sizing: border-box;
}
.head{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 310px;
  background: url("../assets/center/subordinate_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 18px 0;
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
      padding: 0 0 0 17px;
      box-sizing: border-box;
    }
    span{
      font-size: 32px;
      font-family: WenYue XinQingNianTi;
      font-weight: normal;
      color: #FFC000;
      padding: 0 0 0 17px;
      box-sizing: border-box;
    }
    .btnBox{
      //display: none;
      position: relative;
      width: 180px;
      height: 77px;
      line-height: 77px;
      text-align: center;
      background: #FFFFFF;
      background: url("../assets/center/btnBox_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #4E60E5;
    }
    button{
      outline: none;
      border: 0;
      background-color: rgba(0,0,0,0);
      font-size: 18px;
      font-family: WenYue XinQingNianTi;
      font-weight: normal;
      color: #ffffff;
      margin-left: 24px;
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
      background: rgba(78, 119, 235, 0.18);
      border-radius: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul{
        width: 100%;
        li{
          float: left;
          width: 50%;
          height: 52px;
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #4E77EB;
          line-height: 52px;
        }
        li:first-child{

        }
        .addCls{
          color: #FFFFFF;;
          background: #4E77EB;
          border-radius: 5px;
        }
      }
    }
  }
  .contCont{
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 67px 0 0 0;
    min-height: calc(100vh - 310px);
    max-height: calc(100vh - 310px);
    overflow: auto;
    .cont_left_b{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
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
            margin-right: 10px;
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
            object-fit: cover;
            margin-right: 10px;
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
  .contCont_top{
    min-height: calc(100vh - 360px)!important;
    max-height: calc(100vh - 360px)!important;
  }
}
.grey_background {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  //z-index: 9;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.4);
  .invitationPoster_b {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15%;
    box-sizing: border-box;
    img{
      object-fit: cover;
      width: 100%;
      //height: 100%;
    }
  }

}

</style>