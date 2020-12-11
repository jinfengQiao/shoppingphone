<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tanchuang" v-show="tcShow">
      <div class="tanchuangBox">
        <div class="tanchuangBox1">
          <div class="tanchuangBox1Head">
            <img src="../assets/center/ceshi_bg123.png" alt="">
            <div class="tanBoxCont">
              <p>上海自贸区内资公司注册营业执照办理</p>
              <span>￥1999</span>
            </div>
            <div class="guanbi">
              <img src="../assets/center/zhifuTancTuichu.png" alt="" @click="guanbi">
            </div>
          </div>
          <div class="payMethod">
            <p>选择支付方式</p>
            <div class="zhifuBox">
              <div class="weixinZhifu" @click="weixinZhifu">
                <div class="weixinZhifuLeft">
                  <img src="../assets/center/wechat.png" alt="" class="img1">
                  <span>微信支付</span>
                </div>
                <div class="weixinZhifuRight">
                  <input type="radio" name="zhifu" checked>
                  <img src="../assets/center/select_icon.png" alt="" class="img2" v-show="weixinSelect">
                </div>
              </div>
              <div class="yueZhifu" name="zhifu" @click="yueZhifu">
                <div class="yueZhifuLeft">
                  <img src="../assets/center/yue.png" alt="" class="img1">
                  <span>余额支付</span>
                </div>
                <div class="yueZhifuRight">
                  <input type="radio" name="zhifu">
                  <img src="../assets/center/select_icon.png" alt="" class="img2" v-show="yueSelect">
                </div>
              </div>
            </div>
          </div>
          <div class="jifenBox">
            <div class="jifenBox1">
              <div class="duihuan">
<!--                <img src="../assets/center/duihuan_bg.png" alt=""> -->
                积分兑换
              </div>
              <div class="jifenBox1Ri">100积分 = 1元</div>
            </div>
            <div class="jifenBox2">
              <div class="jifenBox2Le">我的积分 <span>20000</span></div>
              <input type="number" placeholder="输入兑换积分">
            </div>
          </div>
          <div class="btnBox">
            <button>立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payComp",
  data(){
    return{
      tcShow: false,
      weixinSelect:true,
      yueSelect:false,
    }
  },
  methods:{
    guanbi(){
      // this.tcShow = false
    },
    weixinZhifu(){
      this.weixinSelect = true
      this.yueSelect = false
    },
    yueZhifu(){
      this.weixinSelect = false
      this.yueSelect = true
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
html{
  position: relative;
}
.tanchuang{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 99999;
  color: #ffffff;
  .tanchuangBox{
    position: absolute;
    top: 50%;
    margin-top: -180px;
    width: 100%;
    //height: 360px;
    padding: 0 30px;
    box-sizing: border-box;
    .tanchuangBox1{
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0px 2px 10px rgba(204, 204, 204, 0.5);
      opacity: 1;
      border-radius: 5px;
      padding: 15px;
      box-sizing: border-box;
      .tanchuangBox1Head{
        position: relative;
        width: 100%;
        height: 78px;
        display: flex;
        justify-content: flex-start;
        img{
          width: 78px;
          height: 78px;
        }
        .tanBoxCont{
          margin-left: 12px;
          p{
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            display: -webkit-box;
            -webkit-line-clamp:2;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            padding: 0 20px 0 0;
            box-sizing: border-box;
          }
          span{
            font-size: 18px;
            font-family: Roboto;
            font-weight: 400;
            line-height: 36px;
            color: #EA610E;
          }
        }
        .guanbi{
          position: absolute;
          right: -6px;
          top: -6px;
          img{
            width: 24px;
            height: 24px;
            object-fit: cover;
          }
        }
      }
      .payMethod{
        padding: 16px 0 0 0;
        box-sizing: border-box;
        width: 100%;
        p{
          width: 100%;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .zhifuBox{
          margin-top: 14px;
          padding: 0 0 15px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #dddddd;
          .weixinZhifu{
            position: relative;
            display: flex;
            height: 35px;
            justify-content: space-between;
            //align-items: center;
            margin-bottom: 15px;
            .weixinZhifuLeft{
              img{
                float: left;
                width: 35px;height: 35px;
              }
              span{
                float: left;
                margin-left: 7px;
                line-height: 35px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
              }
            }
            .weixinZhifuRight{
              img{
                float: right;
                width: 18px;height: 18px;
                margin-top: 8px;
              }
              input{
                opacity: 0;
                position: absolute;
                right:0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
          .yueZhifu{
            position: relative;
            display: flex;
            height: 35px;
            justify-content: space-between;
            align-items: center;
            .yueZhifuLeft{
              img{
                float: left;
                width: 35px;height: 35px;
              }
              span{
                float: left;
                margin-left: 7px;
                line-height: 35px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
              }
            }
            .yueZhifuRight{
              img{
                float: right;
                width: 18px;height: 18px;
                margin-top: 8px;
              }
              input{
                opacity: 0;
                position: absolute;
                right:0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
.jifenBox{
  width: 100%;
  //height: 100px;
  padding: 12px 0;
  box-sizing: border-box;
  .jifenBox1{
    width: 100%;
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .duihuan{
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      img{
        vertical-align: middle;
        width: 16px;
        height: 16px;
      }
    }
    .jifenBox1Ri{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1672F9;
    }
  }
  .jifenBox2{
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jifenBox2Le{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      span{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
      }
    }
    input{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      width: 100px;
      border: 1px solid #999999;
      border-radius: 2px;
      outline: none;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
}
.btnBox{
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  button{
    //margin-top: 20px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    border: 0;
    outline: none;
    background: #1672F9;
    border-radius: 20px;
    font-size: 18px;
    font-family: PingFang SC;
    color: #FFFFFF;
  }
}
</style>