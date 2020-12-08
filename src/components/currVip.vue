<template>
  <div class="bg" :style="height">
    <div class="head">
      <img src="../assets/center/back_icon1.png" alt="" @click="back">
      <span>课程VIP卡</span>
    </div>
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index)">{{n}}</li>
      </ul>
    </div>
    <div class="cont">
      <div class="cont1" v-show="tabState==1">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg1.png" alt="">
        </div>
        <div class="cont11">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li11:idx==index}" @click="son(idx)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
<!--              <div class="duihaoBox">-->
<!--                <img src="../assets/buSchool/duihao_icon.png" alt="">-->
<!--              </div>-->
            </li>
          </ul>
        </div>
        <div class="cont12">
          <ul>
            <li v-for="(n,index) in contContHead" :key="index" :class="{contContHeadAdd:index==isSelect}" @click="changeCls(index,n.id)">{{n.name}}</li>
          </ul>
        </div>
        <div class="cont13">
          <ul>
            <li v-for="(n,index) in contContCont" :key="index">
              <img :src="n.video_cover" alt="">
              <div class="box1">
                <div class="title">{{n.title}}</div>
                <p>{{n.info}}</p>
                <div class="zhengshuBox">
                  <button type="button">课程证书</button>
                  <span>{{n.sell}}人已学</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="nullBox" v-show="show12">
            <img src="../assets/buSchool/nullBoxImg1.png" alt="">
          </div>
        </div>
        <div class="buyBtn1">
          <button>立即开通</button>
        </div>
      </div>
      <div class="cont2" v-show="tabState==2">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg2.png" alt="">
        </div>
        <div class="cont21">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li12:idx==index}" @click="son(idx)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
              <!--              <div class="duihaoBox">-->
              <!--                <img src="../assets/buSchool/duihao_icon.png" alt="">-->
              <!--              </div>-->
            </li>
          </ul>
        </div>
        <div class="cont22">
          <ul>
            <li v-for="(n,index) in contContHead" :key="index" :class="{contContHeadAdd1:index==isSelect2}" @click="changeCls2(index)">{{n.name}}</li>
          </ul>
        </div>
        <div class="buyBtn2">
          <button>立即开通</button>
        </div>
      </div>
      <div class="cont3" v-show="tabState==3">
        <div class="bgImg">
          <img src="../assets/buSchool/vipBgImg2.png" alt="">
        </div>
        <div class="cont31">
          <ul>
            <li v-for="(item,idx) in monthList" :key="idx" :class="{li13:idx==index}" @click="son(idx)">
              <p>{{item.month}}</p>
              <span>￥{{item.money}}</span>
              <!--              <div class="duihaoBox">-->
              <!--                <img src="../assets/buSchool/duihao_icon.png" alt="">-->
              <!--              </div>-->
            </li>
          </ul>
        </div>
        <div class="cont32">
          <p>至尊VIP专属权益</p>
          <ul>
            <li>
              <img src="../assets/buSchool/currZz_icon1.png" alt="">
              <span>好课畅学</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon2.png" alt="">
              <span>优先接待</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon3.png" alt="">
              <span>贴心服务</span>
            </li>
            <li>
              <img src="../assets/buSchool/currZz_icon4.png" alt="">
              <span>会员标识</span>
            </li>
          </ul>
        </div>
        <div class="buyBtn3">
          <button>立即开通</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "currVip",
  data(){
    return{
      show12:false,
      height:{
        width:'',
        height:'',
      },
      index:0,
      tabState: 1,
      isActive:'',
      isSelect:'',
      isSelect1:'',
      isSelect2:'',
      tabList:[
          '入门VIP','贵宾VIP','至尊VIP'
      ],
      contContHead:[
        // '财税','法律','融资','股权','资本','人力'
      ],
      contContCont:[
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // },
        // {
        //   imgUrl:require('../assets/buSchool/ceshiImg11.png'),
        //   title:'第一节【财税入门课程】',
        //   context:'简单介绍此节课的主要内容',
        //   num:'130'
        // }
      ],
      monthList:[]
    }
  },
  methods:{
    hh(){
      this.height.height = window.innerHeight+'px'
    },
    back:function(){
      this.$router.go(-1);
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index){
      var that = this
      that.isActive = index;
      // console.log(index + 1);
      var index1 = index + 1
      that.tabState = index1;

      that.get_courCard1(index1);

    },
    changeCls(index,id){
      this.isSelect = index;
      console.log(id);
      this.category_id1 = id;
      console.log(this.category_id1);
      this.get_clsList();
    },
    changeCls1(index){
      this.isSelect1 = index;
    },
    changeCls2(index){
      this.isSelect2 = index;
    },
    son(idx){
      this.index=idx;
      var index1 = idx + 1
      console.log(index1);
    },
    // 获取课程卡
    get_courCard() {
      this.$post(localStorage.getItem('http') + 'school/get_card',{
        type:1
      })
      .then(res=> {
        console.log(res.data)
        this.monthList= res.data.price
      })
    },
    get_courCard1(index1) {
      this.$post(localStorage.getItem('http') + 'school/get_card',{
        type:index1
      })
      .then(res=> {
        console.log(res.data)
        this.monthList= res.data.price
      })
    },
    // 获取课程分类
    get_class() {
      this.$post(localStorage.getItem('http') + 'school/get_category',{})
      .then(res=> {
        console.log(res.data)
        this.contContHead= res.data
        // this.category_id = res.data.id
        // console.log(this.category_id)
      })
    },
    // 获取课程列表
    get_clsList(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:page,
        limit:limit,
        category_id:this.category_id1,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont= res.data.list
        console.log(this.contContCont);
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    get_clsList1(page,limit) {
      this.$post(localStorage.getItem('http') + 'school/get_course',{
        page:page,
        limit:limit,
        category_id:1,
        keyword:this.keyword
      })
      .then(res=> {
        console.log(res.data.list)
        this.contContCont= res.data.list
        console.log(this.contContCont);
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
  },
  created(){
    this.hh();
    this.get_courCard();
    this.get_clsList1();
    this.get_class();
  },
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
  height: 35px;
  line-height: 35px;
  background-color: #FFFFFF;
  padding: 0 35px;
  box-sizing: border-box;
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    overflow-x: auto;
    white-space:nowrap;
    li{
      cursor: pointer;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
    }
  }
}
.cur{
  color: #333333!important;
}
.cont{
  position: relative;
  z-index: 1;
  margin-top: 105px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  .cont1{
    width: 100%;
    padding: 0 0 45px 0;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont11{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          position: relative;
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #0596EB;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #0596EB;
          }
          .duihaoBox{
            position: absolute;
            top: -13px;
            right: -13px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #D9561D;
            text-align: center;
            line-height: 25px;
            img{
              vertical-align: middle;
              width: 15px;
              height: 14px;
            }
          }
        }
      }
    }
    .cont12{
      width: 100%;
      margin-top: 5px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 20px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
    }
    .cont13{
      width: 100%;
      margin-top: 15px;
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 110px;
          border-bottom: 1px solid rgba(220, 220, 220, 0.34);
          padding: 15px 0 14px;
          box-sizing: border-box;
          display: flex;
          //justify-content: space-between;
          justify-items: center;
          justify-content: flex-start;
          img{
            margin-right: 5px;
            width: 130px;
            height: 80px;
          }
          .box1{
            position: relative;
            height: 80px;
            .title{
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #333333;
            }
            p{
              height: 18px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
            .zhengshuBox{
              position: absolute;
              left: 0;
              bottom: 0;
              height: 18px;
              min-width: 150px;
              button{
                width: 56px;
                height: 18px;
                background: #BED6FF;
                border-radius: 8px;
                font-size: 12px;
                font-family: PingFang SC;
                color: #2B78FF;
                outline: none;
                border: 0;
                line-height: 16px;
              }
              span{
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 4px;
              }
            }
          }
        }
      }
      .nullBox{
        width: 100%;
        text-align: center;
        img{
          width: 50%;
          height: 50%;
          object-fit: cover;
        }
      }
    }
  }
  .cont2{
    width: 100%;
    padding: 0 0 45px 0;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont21{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #F19A45;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #F19A45;
          }
        }
      }
    }
    .cont22{
      width: 100%;
      margin-top: 5px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          margin-top: 15px;
          padding: 4px 20px;
          box-sizing: border-box;
          background: rgba(220, 220, 220, 0.27);
          border-radius: 2px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #666666;
        }
      }
    }
  }
  .cont3{
    width: 100%;
    padding: 0 0 45px 0;
    box-sizing: border-box;
    .bgImg{
      width: 100%;
      height: 143px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
    .cont31{
      width: 100%;
      height: 72px;
      margin-top: 15px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          width: 105px;
          height: 72px;
          background: url("../assets/buSchool/cont11_bg.png") no-repeat;
          background-size: 100% 100%;
          padding: 10px;
          box-sizing: border-box;
          //border: 2px solid #D9561D;
          border: 2px solid rgba(0,0,0,0);
          border-radius: 5px;
          p{
            float: left;
            width: 100%;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
          span{
            float: left;
            width: 100%;
            text-align: right;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #D9561D;
          }
        }
      }
    }
    .cont32{
      width: 100%;
      margin-top: 15px;
      p{
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }
      ul{
        width: 100%;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        li{
          width: 52px;
          text-align: center;
          img{
            width: 48px;
            height: 48px;
          }
          span{
            width: 100%;
          }
        }
      }
    }
  }
  .contContHeadAdd{
    background: rgba(13, 104, 255, 0.27)!important;
    color: #0E69FF!important;
  }
  .contContHeadAdd1{
    background: rgba(241, 154, 69, 0.27)!important;
    color: #D7761E!important;
  }
  .contContContAdd{
    box-shadow:2px 2px 5px #cccccc;
  }
  .li11{
    border: 2px solid #0596EB!important;
  }
  .li12{
    border: 2px solid #F19A45!important;
  }
  .li13{
    border: 2px solid #D9561D!important;
  }
}
.buyBtn1,.buyBtn2,.buyBtn3{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #f3f4f6;
  button{
    width: 100%;
    height: 42px;
    margin-top: 7px;
    background: #0596EB;
    border-radius: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    outline: none;
    border: 0;
  }
}
.buyBtn2{
  button{
    background: #F3B451;
  }
}
.buyBtn3{
  button{
    background: #D9561D;
  }
}

</style>