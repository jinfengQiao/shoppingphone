<template>
  <div class="bg">
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :class="{cur:index==isActive}" :key="index" @click="listGo(index,n.id)">{{n.name}}</li>
      </ul>
    </div>
    <div class="cont" :style="height" v-bind:class="{cont_top:is_headerBarShow}">
      <ul>
        <li v-for="(n,inx) in tabCont" :key="inx" @click="showQyBox(n)">
          <img :src="n.pic_url" alt="">
          <div class="rightRi">
            <span>{{ n.name }}</span>
            <pre>{{n.content}}</pre>
          </div>
        </li>
      </ul>
      <div class="de_b" v-show="de_b_show">
        <img :src="details_img" alt="">
      </div>
      <div class="nullBox" v-show="show12">
        <img src="../assets/buSchool/nullBoxImg1.png" alt="">
      </div>
    </div>
    <footer_nav></footer_nav>
    <div class="showQy" v-show="show_showQy" @click="close_showQy">
      <div class="showQyBox">
        <div class="showQyBox_b" @click.stop>
          <div class="showQyBox1">
            <div @click="get_invitationPoster">
              <img src="../assets/buSchool/invite_friends_icon.png" alt="">
              <span>邀请好友</span>
            </div>
          </div>
          <div class="showQyBox2">
            <div class="showQyBox2Head">
              <p>{{ name }}</p>
              <span>￥{{ price }}</span>
            </div>
            <div class="returnCom_b">
              预计返佣：{{two_back}} ~ {{one_back}}元
            </div>
            <div class="showQyBox2Cont">
              <div class="title">选择支付方式</div>
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
                  <img src="../assets/center/duihuan_bg.png" alt=""> 积分兑换
                </div>
                <div class="jifenBox1Ri">100积分 = 1元</div>
              </div>
              <div class="jifenBox2">
                <div class="jifenBox2Le">我的积分 <span>{{score}}</span></div>
                <input type="number" placeholder="输入兑换积分" v-model="use_score">
              </div>
            </div>
            <div class="btnBox_serve">
              <button @click="serviceBtn">咨询客服</button>
            </div>
            <div class="btnBox">
              <button @click="buyBtn">立即购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grey_background" v-show="show_share" @click="close_invitationPoster">
      <div class="invitationPoster_b">
        <div class="p_bo">
          <p class="invita_p1">
            1<span>点击右上角分享给好友</span>
            <img src="../assets/buSchool/share_icon.png" alt="">
          </p>
          <p class="invita_p1 invita_p2">
            2<span>长按下方图片保存或扫码了解</span>
          </p>
        </div>
        <div class="img_bo">
          <img :src="pic_url_share" alt="" @click.stop>
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
      weixinSelect:true,
      yueSelect:false,
      show12:false,
      isActive:'',
      tabList:'',
      tabCont:'',
      name:'',
      price:'',
      category_id:1,
      card_id:'',
      use_score:0,
      title: '行业专家7*24在线答疑，帮您解决企业经营中的各种难题。',
      integrityurl:'',
      // logo:'https://m.tjqpjt.com/logo.png',
      desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
      imgUrl: 'https://m.tjqpjt.com/logo.png',
      show_showQy:false,
      show_share:false,
      pic_url_share:'',
      two_back:'',
      one_back:'',
      id_share:'',
      details_img:'http://quanpeng.oss-cn-zhangjiakou.aliyuncs.com/of/img/1615882420/2ec1d187bb30ab8653331c5c5eeb86d6.png',
      de_b_show:true,
      is_headerBarShow:true
    }
  },
  methods:{
    // back:function(){
    //   this.$router.go(-1);
    // },
    get_height(){
      this.height.height = window.innerHeight - 52 +'px'
    },
    jumpMoneyDetailed:function (){
      this.$router.push('./moneyDetailed');
    },
    listGo(index,id){
      this.isActive = index;
      // console.log(id);
      this.category_id = id;
      this.tab_Cont();
    },
    // 获取卡片分类
    tab_List(){
      this.$post(localStorage.getItem('http') + 'card/get_category',{})
      .then(res=> {
        // console.log(res.data)
        this.tabList = res.data.list;
      })
    },
    // 获取卡片列表
    tab_Cont(){
      this.$post(localStorage.getItem('http') + 'card/get_list',{
        token: localStorage.getItem('token'),
        category_id:this.category_id,
      })
      .then(res=> {
        // console.log(res)
        this.tabCont = res.data.list;

        if(res.data.list == '' || res.data.list == null){
          this.show12 = true
          this.de_b_show = false
        }else{
          this.show12 = false
          this.de_b_show = true
        }
      })
    },
    showQyBox(n){
      if(!localStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              // console.log('未登录')
            });
      }else{
        this.show_showQy = true;
        // console.log(n);
        this.price = (n.price/100).toFixed(2);
        this.name = n.name;
        this.card_id = n.id;
        this.two_back = n.two_back
        this.one_back = n.one_back
        this.id_share = n.id
      }
    },
    // 点击空白关闭盒子
    close_showQy(){
      this.show_showQy = false
    },
    weixinZhifu(){
      this.weixinSelect = true
      this.yueSelect = false
    },
    yueZhifu(){
      this.weixinSelect = false
      this.yueSelect = true
    },
    // 立即购买
    buyBtn(){
      // console.log(this.card_id)

      this.$dialog.confirm({
        title:'是否确认购买',
      })
      .then(()=>{
        // console.log('支付中..')
        this.$post(localStorage.getItem('http') + 'card/to_pay',{
          token: localStorage.getItem('token'),
          card_id: this.card_id,
        })
            .then(res=> {
              // console.log(res.data)
              if(res.code == 1){
                // console.log('下单成功');
                this.order_id = res.data.order_id
                // console.log(this.order_id);
                this.order_type = res.data.order_type
                // console.log(this.order_type);
                // 余额支付
                if(this.weixinSelect == true){
                  // console.log('微信支付')
                  this.$post(localStorage.getItem('http') + 'pay/wechat_pay',{
                    token: localStorage.getItem('token'),
                    order_id: this.order_id,
                    openid: localStorage.getItem('openid'),
                    order_type: 2,
                    use_score: this.use_score
                  })
                      .then(res=> {
                        // console.log(res)
                        window.WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', res ,
                            function(res){
                              if(res.err_msg == "get_brand_wcpay_request:ok"){
                                location.href = "/#/consultation";
                                // this.$router.push({
                                //   path: '/lesson'
                                // })
                              }else{
                                // alert(res);
                              }
                            });
                      })
                }else{
                  // console.log('余额支付')
                  this.$post(localStorage.getItem('http') + 'pay/balance_pay',{
                    token: localStorage.getItem('token'),
                    order_id: this.order_id,
                    order_type: 2,
                    use_score: this.use_score
                  })
                      .then(res=> {
                        // console.log(res)
                        if(res.code == 0){
                          // console.log('余额不足')
                          this.$toast.error(res.msg)
                        }
                        if(res.code == 1){
                          this.$toast.success(res.msg);
                          this.$router.push('./consultation');
                        }
                      })
                }
              }else{
                this.$toast.error(res.msg)
              }
            })
      })
      .catch(()=>{
        // console.log('未支付')
      });


    },
    // 咨询客服
    serviceBtn(){
      // console.log('咨询客服');
      window.location.href='https://dft.zoosnet.net/LR/Chatpre.aspx?id=DFT45969991&cid=e6cb3acd84ab4bcab85999cc8bb28e43&lng=cn&sid=e6cb3acd84ab4bcab85999cc8bb28e43&p=http%3A//www.tj-jxsw.com/&rf1=&rf2=&e=%25u6765%25u81EA%25u9996%25u9875%25u7684%25u5BF9%25u8BDD&msg=&d=1615016952432';
    },
    share(title,desc,link,imgUrl){
      this.$post(localStorage.getItem('http') + 'wechat/get_jssdk_config',{
        url: this.integrityurl
      }).then(res=> {
        var wx = this.$wx;
        wx.config(res.data);
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList: res.data.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function() {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });

          wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
              // console.log("message ok");
            }
          });

          wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
              // console.log("timeline ok");
            }
          })


        });


      });
    },
    // 邀请好友
    get_invitationPoster(){
      if(!localStorage.getItem('token')){
        this.$dialog.confirm({
          title:'登录状态',
          message:'未登录，请登录',
        })
            .then(()=>{
              this.$router.push('/login')
            })
            .catch(()=>{
              // console.log('未登录')
            });
      }else{
        this.show_share = true
        this.$post(localStorage.getItem('http') + 'card/make_playbill', {
          token: localStorage.getItem('token'),
          id:this.id_share
        }).then(res => {
          // console.log(res)
          if(res.code == 1){
            this.pic_url_share = res.data.pic_url
          }
        })
      }
    },
    // 关闭邀请海报弹窗
    close_invitationPoster(){
      this.show_share = false
      this.pic_url_share = ''
    },



  },
  created(){
    this.get_height();
    this.integrityurl = window.location.href;
    this.share();
    var score = localStorage.getItem('score');
    this.score = score
    // console.log(this.score)
    this.tab_List();
    this.tab_Cont();
    var wx = this.$wx
    wx.showOptionMenu();
    this.$wxShare(this.title,this.desc,location.href,this.imgUrl)

    var openid_bar = localStorage.getItem('invite_openid');
    if(!openid_bar){
      this.is_headerBarShow = false
    }else{
      this.is_headerBarShow = true
    }
  },
  components: {
    footer_nav
  }
}
</script>

<style lang="less" scoped>
.bg{
  position: relative;
  //float: left;
  width: 100%;
  background-color: #f3f4f6;
}
//.head{
//  position: absolute;
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 70px;
//  line-height: 70px;
//  background-color: #ffffff;
//  z-index: 1999;
//  img{
//    position: absolute;
//    left: 15px;
//    top: 26px;
//    width: 10px;
//    height: 18px;
//  }
//  span{
//    text-align: center;
//    width: 100%;
//    display: block;
//    font-size: 19px;
//    font-family: PingFang SC;
//    font-weight: bold;
//    color: #333333;
//  }
//}
.tab{
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  //margin-top: 70px;
  width: 100%;
  //height: 52px;
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
      font-size: 14px;
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
  padding:  67px 15px 25px;
  box-sizing: border-box;
  overflow: auto;
  ul{
    width: 100%;
    li{
      position: relative;
      margin-bottom: 15px;
      width: 100%;
      height: 150px;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        float: left;
        width: 50px;
        //height: 76px;
        //max-width: 90px;
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
        pre{
          margin-top: 5px;
          width: 100%;
          text-align: right;
          font-size: 12px;
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
      //margin-bottom: 0;
    }
  }
  .de_b{
    width: 100%;
    img{
      width: 100%;
      object-fit: cover;
    }
  }
  .nullBox{
    position: fixed;
    top: 50%;
    margin-top: -80px;
    width: 100%;
    left: 50%;
    margin-left: -25%;
    img{
      width: 50%;
      height: 50%;
      object-fit: cover;
    }
  }
}
.cont_top{
  padding:  67px 15px 77px!important;
}
.showQy{
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.25);
}
.showQyBox {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -240px;
  //z-index: 2000;
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;

  .showQyBox_b {
    width: 100%;
  }

  .showQyBox1 {
    width: 100%;
    height: 85px;
    background: url("../assets/center/showQyBox1_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    div{
      border: 2px solid #ffffff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 2px 15px;
      box-sizing: border-box;
      border-radius: 20px;
    }
    img{
      width: 18px;
      height: 18px;
      margin-right: 5px;
      vertical-align: middle;
      align-items: center;
    }
    span{
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
    }
  }

  .showQyBox2 {
    width: 100%;
    //height: 240px;
    //background: url("../assets/center/showQyBox2_bg.png") no-repeat;
    //background-size: 100% 100%;
    background-color: #ffffff;
    padding: 20px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    .showQyBox2Head {
      width: 100%;
      line-height: 24px;
      display: flex;
      justify-content: space-between;

      p {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
      }

      span {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FA6E46;
      }
    }
    .returnCom_b{
      display: inline-block;
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      border-radius: 2px;
      padding: 3px 10px;
      box-sizing: border-box;
      background-color: #486eef;
    }
    .showQyBox2Cont {
      width: 100%;
      margin-top: 10px;

      .title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }

      .zhifuBox {
        margin-top: 14px;
        padding: 0 0 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #dddddd;

        .weixinZhifu {
          position: relative;
          display: flex;
          height: 35px;
          justify-content: space-between;
          //align-items: center;
          margin-bottom: 15px;

          .weixinZhifuLeft {
            img {
              float: left;
              width: 35px;
              height: 35px;
            }

            span {
              float: left;
              margin-left: 7px;
              line-height: 35px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }

          .weixinZhifuRight {
            img {
              float: right;
              width: 18px;
              height: 18px;
              margin-top: 8px;
            }

            input {
              opacity: 0;
              position: absolute;
              right: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

        .yueZhifu {
          position: relative;
          display: flex;
          height: 35px;
          justify-content: space-between;
          align-items: center;

          .yueZhifuLeft {
            img {
              float: left;
              width: 35px;
              height: 35px;
            }

            span {
              float: left;
              margin-left: 7px;
              line-height: 35px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }

          .yueZhifuRight {
            img {
              float: right;
              width: 18px;
              height: 18px;
              margin-top: 8px;
            }

            input {
              opacity: 0;
              position: absolute;
              right: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

        //.img1{
        //  width: 35px;height: 35px;
        //}
        //.img2{
        //  width: 18px;height: 18px;
        //}
        //span{
        //  font-size: 14px;
        //  font-family: PingFang SC;
        //  font-weight: 500;
        //  color: #333333;
        //}
      }
    }

    .jifenBox {
      width: 100%;
      //height: 100px;
      padding: 12px 0;
      box-sizing: border-box;

      .jifenBox1 {
        width: 100%;
        height: 20px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .duihuan {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          img {
            vertical-align: middle;
            width: 16px;
            height: 16px;
          }
        }

        .jifenBox1Ri {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FA6E46;
        }
      }

      .jifenBox2 {
        width: 100%;
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .jifenBox2Le {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;

          span {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
          }
        }

        input {
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

    .btnBox_serve {
      margin-bottom: 12px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;

      button {
        //margin-top: 20px;
        width: 100%;
        height: 38px;
        line-height: 38px;
        border: 0;
        outline: none;
        background: #486eef;
        border-radius: 20px;
        font-size: 18px;
        font-family: PingFang SC;
        color: #FFFFFF;
      }
    }

    .btnBox {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;

      button {
        //margin-top: 20px;
        width: 100%;
        height: 38px;
        line-height: 38px;
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
.grey_background {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2001;
  .invitationPoster_b {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15%;
    box-sizing: border-box;
    flex-direction: column;
    .p_bo{
      position: absolute;
      top: 20px;
      left: 0;
      width: 100%;
      padding: 20px 15% 5px;
      box-sizing: border-box;
      //height: 110px;
    }
    p{
      //margin-top: 5px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    //p:last-child{
    //  margin-bottom: 5px;
    //}
    .invita_p1{
      position: relative;
      //position: absolute;
      //top: 0;
      //left: 0;
      width: 100%;
      //padding: 20px 15% 0;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #FFFFFF;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        margin-top: 0;
        position: absolute;
        //right: 20px;
        //top: 0;
        right: -40px;
        top: -16px;
        width: 80px;
        object-fit: cover;
      }
      span{
        margin-left: 10px;
        padding: 3px 10px;
        box-sizing: border-box;
        //opacity: 0.81;
        border-radius: 15px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        background-color: rgba(112, 112, 112, 0.81);
      }
    }
    .invita_p2{
      //top: 45px;
    }
    .img_bo{
      position: absolute;
      top: 140px;
      left: 0;
      width: 100%;
      padding: 0 15%;
    }
    img{
      object-fit: cover;
      width: 100%;
      //height: 100%;
    }
  }
}


</style>