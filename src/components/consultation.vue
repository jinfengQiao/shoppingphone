<template>
  <div class="bg">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>我的咨询卡</span>-->
<!--    </div>-->
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index,n.id)">{{n.name}}</li>
      </ul>
    </div>
    <div class="cont" :class="{cont_top:is_headerBarShow}">
      <ul>
        <li v-for="(n,inx) in tabCont" :key="inx" @click="jumpLink(n.card_info.link)">
          <img :src="n['card_info'].pic_url" alt="">
          <div class="rightRi">
            <span>{{ n.card_info.name }}</span>
            <p>{{n.card_info.content}}</p>
            <p>结束时间：{{n.endtime}}</p>
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
  name: "consultation",
  data(){
    return{
      isActive:'',
      tabList:[],
      tabCont:[],
      show12:false,
      category_id:0,
      is_headerBarShow:true,
    }
  },
  methods:{
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index,id){
      this.isActive = index;
      this.category_id = id;
      this.tab_Cont();
    },
    tab_List(){
      this.$post(localStorage.getItem('http') + 'card/get_category',{})
      .then(res=> {
        // console.log(res.data)
        // console.log(res.data.list[0].id)
        this.category_id = res.data.list[0].id;
        this.tabList = res.data.list;

        this.tab_Cont();
      })
    },
    tab_Cont(){
      // console.log(this.category_id);
      this.$post(localStorage.getItem('http') + 'user_card/get_list',{
        category_id:this.category_id,
        token: localStorage.getItem('token')
      })
      .then(res=> {
        // console.log(res);
        if(res.data.length == 0){
          this.show12 = true;
          this.tabCont = [];
        }else{
          this.show12 = false;
          this.tabCont = res.data;
        }
      })
    },
    jumpLink(link){
      // console.log(link)
      window.location.href=link
    },
  },
  created(){
    this.tab_List();

    var openid_bar = localStorage.getItem('invite_openid');
    if(!openid_bar){
      this.is_headerBarShow = false
    }else{
      this.is_headerBarShow = true
    }
  },
  components: {
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  //background-color: #f3f4f6;
  width: 100%;
  position: relative;
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
  position: absolute;
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
  //margin-top: 52px;
  width: 100%;
  padding: 67px 15px 15px;
  box-sizing: border-box;
  min-height: calc(100vh);
  max-height: calc(100vh);
  overflow: auto;
  ul{
    width: 100%;
    li{
      position: relative;
      margin-bottom: 15px;
      width: 100%;
      height: 150px;
      //padding: 10px 30px;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        float: left;
        //width: 75px;
        height: 76px;
        max-width: 90px;
        object-fit: cover;
      }
      .rightRi{
        padding: 6px 0 6px 6px;
        box-sizing: border-box;
        span{
          width: 100%;
          text-align: right;
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
    margin-bottom: 60px;
    width: 100%;
    text-align: center;
    img{
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
}
.cont_top{
  min-height: calc(100vh - 50px)!important;
  max-height: calc(100vh - 50px)!important;
}
</style>