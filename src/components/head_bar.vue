<template>
<div v-show="show_headBar">
  <div :class="{absolute:isabsolute}">
    <div class="head_b">
      <div class="left_b">
        <div class="img_b">
          <img :src="wechat_b_val.face_url" alt="">
        </div>
        <span>{{wechat_b_val.nickname}}<br/>邀您进入商城</span>
      </div>
      <div class="right_b">
        <div class="liuyan_b" @click="click_leaving_b">
          <img src="../assets/buSchool/header_bar_icon2.png" alt="">
          <span>留言</span>
        </div>
        <div class="weixin_b" @click="click_wechat_b">
          <img src="../assets/buSchool/header_bar_icon1.png" alt="">
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="null_bb"></div>
    <!--  留言板-->
    <div class="leaving_b" v-show="leaving_b_s">
      <div class="leaving_b_b">
        <img src="../assets/buSchool/close_img1.png" alt="" class="close_img" @click="close_leaving_b">
        <input type="text" placeholder="请输入您的姓名" v-model="name_val">
        <input type="text" placeholder="请输入您的联系方式" v-model="phone_val">
        <textarea placeholder="请输入您的留言" v-model="area_val"></textarea>
        <div class="btn_b" @click="submit_leaving">提交</div>
      </div>
    </div>
    <!--  微信-->
    <div class="wechat_b" v-show="webchat_b_s">
      <div class="wechat_b_b">
        <img src="../assets/buSchool/close_img1.png" alt="" class="close_img" @click="close_wechat_b">
        <div class="wechat_b_head">
          <div class="img_b">
            <img :src="wechat_b_val.face_url" alt="">
          </div>
          <div class="name_b">
            <div class="name">{{wechat_b_val.nickname}}</div>
            <div class="address">{{wechat_b_val.city_name}}-{{wechat_b_val.area_name}}</div>
          </div>
        </div>
        <div class="wechat_img">
          <img :src="wechat_b_val.we_qrcode" alt="">
          <p>扫一扫二维码，加我微信</p>
        </div>
        <div class="btn_b_s">
          <input type="text" v-model="wechat_b_val.we_number" class="btn_b" id="btn_b" readonly @click="click_copy">
          <p>点击复制微信号</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "head_bar",
  data(){
    return{
      leaving_b_s:false,
      webchat_b_s:false,
      show_headBar: false,
      isabsolute:false,
      name_val:'',
      phone_val:'',
      area_val:'',
      wechat_b_val:{
        area_name: '',
        city_name: '',
        face_url: '',
        nickname: '',
        we_number: '',
        we_qrcode: ''
      },
    }
  },
  methods:{
    click_leaving_b(){
      this.leaving_b_s = true
    },
    close_leaving_b(){
      this.leaving_b_s = false
    },
    click_wechat_b(){
      this.webchat_b_s = true
      // this.$post(localStorage.getItem('http') + 'user/share_info',{
      // })
      // .then(res=> {
      //   // console.log(res)
      //   this.wechat_b_val = res.data
      // })
    },
    // 获取微信信息
    get_wechat_info(){
      this.$post(localStorage.getItem('http') + 'user/share_info',{
      })
      .then(res=> {
        // console.log(res)
        this.wechat_b_val = res.data
      })
    },
    close_wechat_b(){
      this.webchat_b_s = false
    },
    // 点击复制
    click_copy(){
      var copyobject=document.getElementById("btn_b");
      copyobject.select();
      document.execCommand("Copy");
      this.$toast.success('复制成功')
    },
    // 留言提交
    submit_leaving(){
      var reg_user = /^[\u4e00-\u9fa5]{2,4}$/;    //2-4个中文字符正则
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
      if(this.name_val == ''){
        this.$toast.error('请输入姓名');
      }else if(!reg_user.test(this.name_val)) {
        this.$toast.error('姓名只能为2-4中文');
        return false;
      }else if(this.phone_val == ''){
        this.$toast.error('请输入手机号');
      }else if(!reg_tel.test(this.phone_val)) {
        this.$toast.error('请输入正确手机号码');
        return false;
      }else{
        this.$post(localStorage.getItem('http') + 'module/fast_reg',{
          name: this.name_val,
          phone: this.phone_val,
          area: this.area_val,
          from:4
        })
        .then(res=> {
          // console.log(res);
          if(res.code == 1){
            this.name_val = '';
            this.phone_val = '';
            this.area_val = '';
            this.$toast.success('留言成功');
            this.leaving_b_s = false
          }else{
            console.log(res.msg);
            this.$toast.error(res.msg);
          }
        })
      }
    },
    // 根据openid判断头部是否显示
    changeUrl(){
      // let currentUrl = location.href
      // let openidIndex_1 = currentUrl.indexOf('id=')
      // let openidLastIndex_1 = currentUrl.indexOf('&', openidIndex_1)
      // let openidIndex = currentUrl.indexOf('openid')
      // let openidLastIndex = currentUrl.indexOf('=', openidIndex)
      // if(openidIndex > -1){
      //   let leftStr = currentUrl.substring(openidIndex_1 + 3, openidLastIndex_1)
      //   let rightStr = currentUrl.substring(openidLastIndex + 1);
      //   console.log('这是截取的course_id:'+ leftStr)
      //   console.log('这是截取的openid:'+ rightStr)
      //   // console.log('拿到了openid')
      //   this.show_headBar = true
      //   this.isabsolute = true
      //   // this.is_headerBarShow = true
      // }else {
      //   // console.log('没有拿到openid')
      //   this.show_headBar = false
      //   this.isabsolute = false
      //   // this.is_headerBarShow = false
      // }
      var openid_bar = localStorage.getItem('invite_openid');
      if(!openid_bar){
        this.show_headBar = false
        this.isabsolute = false
      }else{
        this.show_headBar = true
        this.isabsolute = true
      }
    },




  },
  created() {
    this.changeUrl();
    this.get_wechat_info();
  }
}
</script>

<style scoped lang="less">
.absolute{
  //position: absolute;
  //top: 0;
  //left: 0;
  width: 100%;
  height: 50px;
}
.head_b{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  z-index: 1999;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.16);
  .left_b{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    margin-right: 10px;
    .img_b{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: #EFEFEF;
    }
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }
    span{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(9, 101, 255, 1);
      //letter-spacing: 2px;
    }
  }
  .right_b{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .liuyan_b,.weixin_b{
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
      img{
        margin-bottom: 2px;
        width: 18px;
        height: 15px;
      }
      span{
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        letter-spacing: 2px;
      }
    }
    .weixin_b{
      margin-right: 0;
    }
  }
}
.null_bb{
  width: 100%;
  height: 50px;
  background-color: #ffffff;
}
.leaving_b,.wechat_b{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 2222;
  display: flex;
  justify-content: center;
  align-items: center;
}
.leaving_b{
  .leaving_b_b{
    position: relative;
    width: 300px;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px rgba(204, 204, 204, 0.5);
    opacity: 1;
    border-radius: 10px;
    padding: 50px 15px 25px;
    box-sizing: border-box;
    .close_img{
      position: absolute;
      right: 12px;
      top: 12px;
      width: 22px;
      height: 22px;
    }
    input{
      width: 100%;
      height: 30px;
      background: #F1F1F1;
      border-radius: 10px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      border: 0;
      outline: none;
      margin-bottom: 15px;
    }
    textarea{
      width: 100%;
      height: 80px;
      background: #F1F1F1;
      border-radius: 10px;
      resize: none;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      border: 0;
      outline: none;
      margin-bottom: 15px;
      padding: 10px 15px;
      box-sizing: border-box;
    }
    .btn_b{
      width: 100%;
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      letter-spacing: 2px;
      background: url("../assets/buSchool/btn_b_liuyan.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.wechat_b{
  .wechat_b_b{
    position: relative;
    width: 300px;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px rgba(204, 204, 204, 0.5);
    opacity: 1;
    border-radius: 10px;
    padding: 50px 30px 25px;
    box-sizing: border-box;
    .close_img{
      position: absolute;
      right: 12px;
      top: 12px;
      width: 22px;
      height: 22px;
    }
    .wechat_b_head{
      display: flex;
      justify-content: flex-start;
      .img_b{
        background: #EFEFEF;
        border-radius: 10px;
        width: 41px;
        height: 41px;
        margin-right: 10px;
        img{
          width: 41px;
          height: 41px;
        }
      }
      .name_b{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        .name{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .address{
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .wechat_img{
      width: 100%;
      margin: 25px 0 10px;
      img{
        width: 100%;
        object-fit: cover;
      }
      p{
        //margin-top: 6px;
        width: 100%;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        text-align: center;
      }
    }
    .btn_b_s{
      .btn_b{
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        letter-spacing: 2px;
        background-color: rgba(22, 114, 249, 1);
        border-radius: 20px;
        border: 0;
        outline: none;
        text-align: center;
        user-select:none;
      }
      p{
        margin-top: 6px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
      }
    }
  }
}
</style>