<template>
  <div class="bg" :style="height">
    <div class="head">
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
      <span>咨询卡</span>
    </div>
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index,n.id)">{{n.name}}</li>
      </ul>
    </div>
    <div class="cont">
      <ul>
        <li v-for="(n,inx) in tabCont" :key="inx" @click="showQyBox(n)">
          <img :src="n.pic_url" alt="">
          <div class="rightRi">
            <span>{{ n.name }}</span>
            <p>{{n.content}}</p>
          </div>
        </li>
      </ul>
      <div class="nullBox" v-show="show12">
        <img src="../assets/buSchool/nullBoxImg1.png" alt="">
      </div>
    </div>
    <footer_nav></footer_nav>
    <div class="showQy" :style="height" v-if="open" @click="hide1"></div>
    <div class="showQyBox" v-if="open">
      <div class="showQyBox1">
          <img src="../assets/center/showQyBox1_bg.png" alt="">
      </div>
      <div class="showQyBox2">
        <div class="showQyBox2Head">
          <p>{{ name }}</p>
          <span>￥{{ price }}</span>
        </div>
        <div class="showQyBox2Cont">
          <div class="title">选择支付方式</div>
          <div class="zhifuBox">
            <img src="../assets/center/wechat.png" alt="" class="img1">
            <span>微信支付</span>
            <img src="../assets/center/select_icon.png" alt="" class="img2">
          </div>
        </div>
        <div class="btnBox">
          <button>立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import footer_nav from "@/components/footer_bar";

export default {
  name: "consul",
  data(){
    return{
      height:{
        width:'',
        height:'',
      },
      show12:false,
      open:false,
      isActive:'',
      tabList:'',
      tabCont:'',
      name:'',
      price:'',
    }
  },
  methods:{
    // back:function(){
    //   this.$router.go(-1);
    // },
    hh(){
      this.height.height = window.innerHeight +'px'
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index,id){
      this.isActive = index;
      console.log(id);
      this.tab_Cont1(id);
    },
    // 获取卡片分类
    tab_List(){
      this.$post(localStorage.getItem('http') + 'card/get_category',{})
      .then(res=> {
        console.log(res.data)
        this.tabList = res.data.list;
      })
    },
    // 获取卡片列表
    tab_Cont(){
      this.$post(localStorage.getItem('http') + 'card/get_list',{
        category_id:1
      })
      .then(res=> {
        // console.log(res.data)
        this.tabCont = res.data.list;
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    tab_Cont1(id){
      this.$post(localStorage.getItem('http') + 'card/get_list',{
        category_id:id
      })
      .then(res=> {
        console.log(res.data)
        this.tabCont = res.data.list;
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    showQyBox(n){
      this.open = true;
      console.log(n);
      this.price = n.price;
      this.name = n.name;
    },
    hide1(){
      this.open = false;
    }
  },
  created(){
    this.tab_List();
    this.tab_Cont();
    this.hh();
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
  top: 70px;
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
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
    }
    //li:first-child{
    //  color: #5D80FC;
    //}
  }
  ul::-webkit-scrollbar {
    display: none;
  }
}
.cur{
  color: #5D80FC!important;
}
.cont{
  position: relative;
  z-index: 1;
  margin-top: 122px;
  width: 100%;
  padding: 15px 15px 77px 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  ul{
    width: 100%;
    li{
      position: relative;
      margin-bottom: 15px;
      width: 100%;
      height: 150px;
      padding: 36px 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      img{
        float: left;
        width: 75px;
        height: 76px;
        object-fit: cover;
      }
      .rightRi{
        padding: 6px 0 6px 6px;
        box-sizing: border-box;
        span{
          width: 100%;
          text-align: left;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;

        }
        p{
          margin-top: 5px;
          width: 100%;
          text-align: right;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
    li:first-child{
      background: url("../assets/center/consultation_bg1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    li:nth-child(2){
      background: url("../assets/center/consultation_bg2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    li:last-child{
      background: url("../assets/center/consultation_bg3.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 0;
    }
  }
  .nullBox{
    margin-top: 60px;
    width: 100%;
    text-align: center;
    img{
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
}

.showQy{
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.25)
}
.showQyBox{
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -180px;
  z-index: 99999;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  height: 360px;
  .showQyBox1{
        width: 100%;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
  .showQyBox2{
      width: 100%;
      height: 240px;
      background: url("../assets/center/showQyBox2_bg.png") no-repeat;
      background-size: 100% 100%;
      padding: 30px 30px 20px 30px;
      box-sizing: border-box;
      .showQyBox2Head{
        width: 100%;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        p{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;
        }
        span{
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FA6E46;
        }
      }
      .showQyBox2Cont{
        width: 100%;
        margin-top: 18px;
        .title{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
        .zhifuBox{
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .img1{
            width: 35px;height: 35px;
          }
          .img2{
            width: 18px;height: 18px;
          }
          span{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
        }
      }
      .btnBox{
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
        button{
          margin-top: 20px;
          width: 100%;
          height: 42px;
          line-height: 42px;
          border: 0;
          outline: none;
          background: #FA6E46;
          border-radius: 20px;
          font-size: 18px;
          font-family: PingFang SC;
          color: #FFFFFF;
        }
      }
    }
}

</style>