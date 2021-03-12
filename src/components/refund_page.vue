<template>
<div>
  <div class="listLi" :style="height">
    <ul>
      <li v-for="(n,inx) in list" :key="inx">
        <div class="li1">
          <p>订单编号：{{n.num}}</p>
          <template v-if="n.goods[0].refund.status == 0">
            <span>未申请</span>
          </template>
          <template v-if="n.goods[0].refund.status == 1">
            <span>申请中</span>
          </template>
          <template v-if="n.goods[0].refund.status == 2">
            <span>处理中</span>
          </template>
          <template v-if="n.goods[0].refund.status == 3">
            <span>处理完成</span>
          </template>
          <template v-if="n.goods[0].refund.status == 4">
            <span>失败</span>
          </template>
        </div>
        <div class="li2">
          <div class="img_b">
            <img :src="n.goods[0].pic_url" alt="">
          </div>
          <div class="li2Ri">
            <p>{{n.goods[0].fullname}}</p>
            <div class="li2Ri_1">
              <div class="monyB">
                <template v-if="n.goods[0].type == 2">
                  定金：
                </template>
                <template v-else></template>
                ￥{{ (n.goods[0].price/100).toFixed(2) }}
              </div>
              <span>x{{ n.goods[0].amount }}</span>
            </div>
          </div>
        </div>
        <div class="li3">
          <div class="li3_1">
            商品共计：&nbsp;<span>￥{{(n.total_amount/100).toFixed(2)}}</span>
          </div>
          <div class="li3_2">
            <button class="li3_2_btn1" @click="jump_detail(n.goods[0].refund.order_goods_id)">查看详情</button>
          </div>
        </div>
      </li>
    </ul>

  </div>

  <div class="nullBox" v-show="show12">
    <img src="../assets/buSchool/nullBoxImg1.png" alt="">
  </div>

  <div class="back_index">
    <button type="button" @click="back_index">返回个人中心</button>
  </div>
</div>
</template>

<script>
export default {
  name: "refund_page",
  data(){
    return{
      show12:false,
      list:[],
      status:'',
      order_goods_id:'',
      height:{
        width:'',
        height: '',
      }
    }
  },
  methods: {
    // 获取订单列表
    get_list() {
      this.$post(localStorage.getItem('http') + 'order/get_list', {
        token: localStorage.getItem('token'),
        refund:1
      }).then(res=> {
        console.log(res)
        this.list= res.data.list
        if(res.data.list == '' || res.data.list == null){
          this.show12 = true;
        }else{
          this.show12 = false;
        }
      })
    },
    // 获取退款详情
    jump_detail(id) {
      this.$router.push({
        path:'/refund',
        query:{
          id:id
        }
      })
    },
    // 返回个人中心
    back_index(){
      this.$router.push({path: '/center'});
    },
    fun(){
      console.log("监听到了");
      this.$router.push({path: '/center'});
    },
    get_height(){
      this.height.height = window.innerHeight +'px'
    }

  },
  created() {
    // this.status =this.$route.query.status;
    // console.log(this.status);
    this.get_list();
    this.get_height();
  },
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.fun, false);//false阻止默认事件
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
  }
}
</script>

<style scoped lang="less">
.listLi{
  width: 100%;
  padding: 0 15px 70px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #ffffff;
  ul{
    width: 100%;
    li{
      width: 100%;
      //height: 175px;
      border-radius: 4px;
      margin: 12px 0;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      opacity: 1;
      border-radius: 4px;
      padding: 12px;
      box-sizing: border-box;
      .li1{
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #DDDDDD;
        p{
          font-size: 13px;
          color: #666666;
        }
        span{
          font-size: 13px;
          color: #0965FF;
        }
      }
      .li2{
        width: 100%;
        padding: 10px 0 0 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        .img_b{
          //width: 78px;
          height: 78px;
        }
        img{
          object-fit: cover;
          //width: 78px;
          height: 78px;
        }
        .li2Ri{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 8px;
          padding: 2px 0;
          box-sizing: border-box;
          p{
            font-size: 14px;
          }
          .li2Ri_1{
            display: flex;
            justify-content: space-between;
            .monyB{
              font-size: 13px;
              color: #EA610E;
            }
            span{
              font-size: 13px;
              color: #999999;
            }
          }
        }
      }
      .li3{
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .li3_1{
          display: flex;
          align-items: center;
          span{
            font-size: 15px;
            font-weight: 400;
            color: #FF1454;
          }
        }
        .li3_2{
          .li3_2_btn1{
            margin-right: 5px;
            border: 1px solid #0965FF;
            box-sizing: border-box;
            width: 74px;
            height: 25px;
            line-height: 26px;
            border-radius: 13px;
            font-size: 14px;
            padding: 0!important;
            color: #0965FF;
            background-color: #ffffff;
            outline: none;
          }
          .li3_2_btn2{
            width: 74px;
            height: 25px;
            line-height: 26px;
            border-radius: 13px;
            font-size: 14px;
            padding: 0!important;
            color: #0965FF;
            background: linear-gradient(134deg, #6AAEFF 0%, #005EFF 100%);
            box-shadow: 0px 3px 6px rgba(9, 101, 255, 0.3);
            border: 0;
            outline: none;
            color: #ffffff;
          }
        }
      }
    }
  }
}
.nullBox{
  position: absolute;
  top: 50%;
  margin-top: -25%;
  left: 0;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
}
.back_index{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 15px;
  height: 58px;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  button{
    width: 100%;
    height: 40px;
    background-color: #0965FF;
    color: #ffffff;
    border-radius: 30px;
    outline: none;
    border: 0;
    letter-spacing: 1px;
  }
}

</style>