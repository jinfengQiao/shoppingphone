<template>
  <div>
    <head_bar></head_bar>
    <router-view></router-view>
  </div>
</template>

<script>
import {getUrlCode} from './utils/getUrlCode'
export default {
  data(){
    return{

    }
  },
  methods:{
    auto_login(openid){
      //自动登录接口
      this.$post(localStorage.getItem('http') + 'user/login_by_openid',{
        openid: openid
      })
      .then(res=> {
        if(res.code == 1){
          // localStorage.setItem('token',res.data.token)
          // localStorage.setItem('phone',res.data.phone)
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('phone',res.data.phone)
          if(getUrlCode().code){
            location.href = 'https://m.tjqpjt.com/#' + this.$route.fullPath
          }
        }
      })
    },
    get_openid(){
      function getUrlPara(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
      }
      let code = getUrlPara("code");
      if(!code){
        // let path = this.$route.path
        let redirect_url = encodeURIComponent(location.href);
        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6bb6df7430479e17&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      }
      this.$post(localStorage.getItem('http') + 'wechat/get_openid',{
        code:code
      }).then(res => {
        localStorage.setItem("openid",res.data);
        this.auto_login(res.data);
      })
    },
  },

  created() {
    if(this.$route.query.openid) {
      // console.log('這是openid' + this.$route.query.openid)
      localStorage.setItem('invite_openid', this.$route.query.openid)
      // this.$notify(localStorage.getItem('invite_openid'));
    }

    // 手机商城
    // localStorage.setItem('http', 'http://of.kurohane.com/api/')
    // localStorage.setItem('url', 'http://192.168.1.244/official/public/api/')
    // localStorage.setItem('http', 'http://of.kurohane.com/')
    // localStorage.setItem('url', 'http://192.168.1.244/official/public/')
    localStorage.setItem('http', 'https://of.tjqpjt.com/api/')
    localStorage.setItem('url', 'https://of.tjqpjt.com')


    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      var openid = localStorage.getItem("openid");
      if(!openid){
        this.get_openid();
      }else{
        this.auto_login(openid);
      }
    }

    var _hmt = _hmt || [];
    window._hmt = _hmt; // 修改为window 全局变量
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?174ed9804ea40f6ed7a93e63c2a4c7d1";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },
  mounted () {
    // id 是我需要获取的参数名，如果你要获取user等其他，自行更换即可
    // console.log(this.Utils.getUrlKey('openid'))
  },
  component:{

  }
}
</script>

<style lang="less">
  /*@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';*/
  @import 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
  @import './assets/swiper/css/swiper.min.css';
  @font-face {
    font-family: 'PingFang SC';
    src: url('assets/font/PingFang SC Regular.ttf'); //你的资源目录
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto-Regular';
    src: url('assets/font/Roboto-Regular.ttf'); //你的资源目录
    font-weight: normal;
    font-style: normal;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    //color: #333333;
    font-family: 'Roboto-Regular';
  }
  ul li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  html{
    background-color: #ffffff;
  }
  /*共用商品列表*/
  //.goods_list{
  //  padding: 16px 16px 0;
  //  display: flex;
  //  justify-content: space-between;
  //  flex-wrap: wrap;
  //  li{
  //    width: 47%;
  //    box-shadow:0px 0px 10px rgba(0,0,0,0.16);
  //    margin-bottom: 16px;
  //    img{
  //      width: 100%;
  //      height: 178px;
  //      object-fit: cover;
  //    }
  //    .goods_list_li{
  //      padding: 10px 8px;
  //      h2{
  //        font-size: 14px;
  //        margin-bottom: 8px;
  //      }
  //      .goods_list_li_price_num{
  //        display: flex;
  //        justify-content: space-between;
  //        align-items: center;
  //        .goods_list_li_price{
  //          display: flex;
  //          align-items: center;
  //          p{
  //            color: #EA610E;
  //          }
  //        }
  //        .goods_list_li_price p:nth-child(1){
  //          font-size: 12px;
  //        }
  //        .goods_list_li_price p:nth-child(2){
  //          font-size: 18px;
  //        }
  //        span{
  //          font-size: 12px;
  //          color: #999999;
  //        }
  //      }
  //    }
  //  }
  //}

  // 弹出框
  .dio{
    box-shadow:0px 3px 10px rgba(204,204,204,0.5)!important;
    border-radius:5px!important;
  }
  .dio /deep/ .mu-dialog-body{
    padding: 16px 12px!important;
  }


  // 阿里图标svg
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  // 详情抬头
  .deta_header{
    width: 100%;
    background:linear-gradient(322deg,rgba(106,174,255,1) 0%,rgba(0,94,255,1) 100%);
    .deta_header_title{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 16px 0;
      .iconfont{
        left: 16px;
        top: 15px;
        color: white;
        position: absolute;
        line-height: 25px;
      }
      h2{
        font-size: 18px;
        color: white;
        line-height: 25px;
      }
    }
    .deta_header_state{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 24px 35px 24px 40px;
      .deta_header_state_left{
        h2{
          font-size: 14px;
          color: white;
          margin-bottom: 6px;
        }
        p{
          font-size: 12px;
          color: white;
          opacity: 0.7;
        }
      }
    }
  }

  .van-popover__content{
    border-radius: 4px!important;
  }
</style>

