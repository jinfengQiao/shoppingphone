<template>
  <div class="bg" :style="height">
<!--    <div class="head">-->
<!--      <img src="../assets/center/back_icon1.png" alt="" @click="back">-->
<!--      <span>搜索</span>-->
<!--    </div>-->
    <div class="searchBox">
      <div class="btnBox">
        <input type="text" v-model="keyword">
        <img src="../assets/buSchool/search_icon.png" alt="">
      </div>
      <span @click="searchBtn">确定</span>
    </div>
    <div class="cont">
<!--      <div class="cont2Cont1" v-for="(n,inx) in contContCont1" :key="inx" @click="jumpArtiDetails(n.id)">-->
      <div class="cont2Cont1" v-for="(n,inx) in contContCont1" :key="inx">
        <span>{{ n.title }}</span>
        <p>{{ n.info }}</p>
        <ul>
          <li v-for="(spu,k) in n.media_url.img" :key="k">
            <img :src="spu" alt="">
          </li>
        </ul>
        <div class="timeNumBox">
          <div class="time">{{n.publishtime}}</div>
          <div class="lookNum">
            <img src="../assets/buSchool/look_icon.png" alt="">
            <div class="num">{{n.hit}}</div>
          </div>
        </div>
      </div>

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
  name: "search",
  data(){
    return{
      contContCont1:[],
      show12:false,
      category_id:'',
      keyword:'',
      height:{
        width:'',
        height:'',
      },
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight-55 +'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },

    searchBtn(){
      console.log(this.keyword)
      this.$post(localStorage.getItem('http') + 'school/get_article',{
        page:1,
        limit:10,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont1 = res.data.list
        console.log(this.keyword)

        if(this.keyword == '' || this.keyword == null){
          this.contContCont1 = ''
          res.data.list = ''
          this.show12 = true;
          // this.$toast.success('输入为空');
          this.$toast.error('输入为空');
        }else{
          this.contContCont1 = res.data.list
          this.show12 = false;
        }

        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    }
  },
  created(){
    this.hh();
  },
  components:{
    noSharing
  }
}
</script>

<style lang="less" scoped>
.bg{
  background-color: #ffffff;
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
.searchBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  height: 55px;
  line-height: 25px;
  display: flex;
  justify-content: space-between;
  background-color: #f3f4f6;
  .btnBox{
    position: relative;
    flex: 88%;
    input{
      width: 95%;
      height: 25px;
      border: 0;
      border-radius: 12px;
      background-color: #ffffff;
      padding: 0 40px;
      box-sizing: border-box;
    }
    img{
      position: absolute;
      top: 4px;
      left: 11px;
      width: 17px;
      height: 17px;
    }
  }
  span{
    flex: 12%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
  }
}
.cont{
  width: 100%;
  margin-top: 52px;
  padding: 0 15px 30px 15px;
  box-sizing: border-box;
  .contCont{
    width: 100%;
    margin-top: 15px;
  }
  .cont2Cont1{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEE;
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    p{
      margin-top: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    ul:after{
      content:' ';
      width:90px; //这个宽度和子元素宽度一致
      height:0;
      display:block;
    }
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      li{
        margin-top: 15px;
        width: 90px;
        height: 90px;
        img{
          float: left;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .timeNumBox{
      margin-top: 12px;
      width: 100%;
      height: 18px;
      line-height: 18px;
      .time{
        float: left;
      }
      .lookNum{
        float: left;
        margin-left: 20px;
        img{
          float: left;
          margin-top: 4px;
          width: 13px;
          height: 9px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #C3C3C3;
        }
        .num{
          float: left;
          margin-left: 5px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #C3C3C3;
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