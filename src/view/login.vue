<template>
    <div class="login_background">

        <div class="header">
            <mu-appbar style="width: 100%;" color="transparent">
                <img :src="logo_url" alt="">
                <mu-button style="display: none;" icon slot="right" @click="open">
                    <mu-icon color="#eeeeee" value="menu"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div v-if="service_show" class="service" @click="service_open">
              <p>客服热线：400-1025-199</p>
            </div>
            <div class="nav_background" ref="nav_background"  >
                <div class="nav" ref="nav">
                    <img :src="logo_url" alt="" ref="imgs">
                    <ul class="off_nav" ref="off_nav" >
                        <li v-for="i in nav_list" :key="i.id">
                          <router-link style="width: 100%; display: block;" :to="i.link" @click.native="tokens(i)" >{{ i.name }}</router-link>
                        </li>
                        <li @click="service">
                          <a>联系客服</a>
                        </li>
                        <li>
                          <a style="width: 100%; display: block;"  href="">权鹏官网</a>
                        </li>
                        <li @click="login">
                            <a>登录注册</a>
                        </li>
                    </ul>
                </div>
                <div class="backgronds" @click="backgronds">

                </div>
            </div>
        </div>


        <div class="form">
            <div class="login_input">
                <div class="login_form">
                    <mu-container>
                        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                            <mu-form-item help-text="" prop="phone" :rules="phone">
                                <mu-text-field underline-color="#2196f3" v-model="validateForm.phone" prop="username"></mu-text-field>
                                <template v-slot:label>
                                    <div style="display: flex; align-items: flex-end; ">
                                        <i class="iconfont icon-shoujihao" style="color: #486EEF; "></i>
                                        <p style="margin-left: 9px; line-height: 22px; color: #486EEF;">手机号</p>
                                    </div>
                                </template>
                            </mu-form-item>
                            <mu-form-item label="密码" type="password" prop="pass" :rules="pass">
                                <mu-text-field underline-color="#2196f3" type="password" v-model="validateForm.pass" prop="password"></mu-text-field>
                                <template v-slot:label>
                                    <div style="display: flex; align-items: flex-end; ">
                                        <i class="iconfont icon-mima" style="color: #486EEF; "></i>
                                        <p style="margin-left: 9px; line-height: 22px; color: #486EEF;">密码</p>
                                    </div>
                                </template>
                            </mu-form-item>
                            <mu-form-item v-if="password_show" label="再次输入密码" prop="pass_two" :rules="pass_two" :error-text="error_text1">
                                <mu-text-field underline-color="#2196f3" type="password" v-model="validateForm.pass_two" prop="password"></mu-text-field>
                                <template v-slot:label>
                                    <div style="display: flex; align-items: flex-end; ">
                                        <i class="iconfont icon-mima" style="color: #486EEF; "></i>
                                        <p style="margin-left: 9px; line-height: 22px; color: #486EEF;">再次确认密码</p>
                                    </div>
                                </template>
                            </mu-form-item>
                            <mu-form-item help-text="" prop="phone" v-show="tuijianren">
                              <mu-text-field underline-color="#2196f3" v-model="validateForm.invite_code" prop="username"></mu-text-field>
                              <template v-slot:label>
                                <div style="display: flex; align-items: flex-end; ">
                                  <i class="iconfont icon-shoujihao" style="color: #486EEF; "></i>
                                  <p style="margin-left: 9px; line-height: 22px; color: #486EEF;">推荐人</p>
                                </div>
                              </template>
                            </mu-form-item>
                            <mu-form-item v-show="yanzhengmaBox" label="验证码" prop="verify" :rules="verify" :style="{marginBottom: password_show? '15px' : ''}">
                                <div class="ver_code" style="display: flex;">
                                    <mu-text-field underline-color="#2196f3" type="password" v-model="validateForm.verify" prop="password"></mu-text-field>
                                    <div class="verify">
<!--                                      <img v-if="verify_img_show" @click="get_verify" :src="verify_img" alt="">-->
<!--                                      <div v-if="!verify_img_show">-->
                                        <mu-button v-if="!count_down_show" style="margin: 0;"  @click="get_verify_num" color="primary">获取验证码</mu-button>
                                        <span v-if="count_down_show">{{ count_down }}</span>
<!--                                      </div>-->
                                    </div>
                                </div>
                                <template v-slot:label>
                                    <div style="display: flex; align-items: flex-end; ">
                                        <i class="iconfont icon-yanzhengma" style="color: #486EEF; "></i>
                                        <p style="margin-left: 9px; line-height: 22px; color: #486EEF;">验证码</p>
                                    </div>
                                </template>
                            </mu-form-item>

                            <mu-form-item style="margin-bottom: 0px; margin-top: 10px;">
                                <div class="submit_button">
                                    <div style="display: flex; justify-content: flex-end;">
                                      <p style="width: 50px;" v-if="!password_show" @click="look_for_password_info">忘记密码</p>
                                    </div>
                                    <mu-button v-if="login1" style="margin: 0; height: 44px;" color="primary" @click="submit">登录</mu-button>
                                    <mu-button v-if="login2" style="margin: 0; height: 44px;" color="primary" @click="submit_ce">注册</mu-button>
                                    <mu-button v-if="login3" style="margin: 0; height: 44px;" color="primary" @click="confirm">确认</mu-button>
                                  <div class="submit_button_span" v-if="!password_show" >
                                        <div style="width: 130px; display: flex; justify-content: center;" @click="register">
                                          <span>还没有账号？</span>
                                          <p>立即注册</p>
                                        </div>
                                    </div>
                                    <div class="submit_button_span" v-if="password_show">
                                      <p @click="back_login">回到登录</p>
                                    </div>
                                </div>
                            </mu-form-item>
                        </mu-form>
                    </mu-container>
                </div>
            </div>
        </div>

      <noSharing></noSharing>

    </div>
</template>

<script>
    import noSharing from "@/components/noSharing";

    export default {
        data() {
            return{
                tuijianren:false,
                logo: null,
                logo_url: null,
                invite_code: '',
                phone: [
                    { validate: (val) => !!val, message: '必须填写手机号'},
                    { validate: (val) => val.length >= 3, message: '用户名长度大于3'},
                    { validate: (val) => /^1[34578]\d{9}$/ims.test(val), message: '手机号不正确'}
                ],
                pass: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                    { validate: (val) => val.length >= 6 && val.length <= 18, message: '密码长度大于6小于10'}
                ],
                pass_two: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                    { validate: (val) => val.length >= 6 && val.length <= 18, message: '密码长度大于6小于10'},
                ],
                error_text1: null,
                verify: null,
                validateForm: {
                    phone: null,
                    pass: null,
                    pass_two: null,
                    verify: null,
                    isAgree: false,
                    invite_code: null
                },
                password_show: false,
                nav_list: [
                  {
                    id:1,
                    name: '首页',
                    link: '/'
                  },
                  {
                    id: 2,
                    name: '我的订单',
                    link: '/order/my_order'
                  },
                ],
                service_show: false,
                verify_img: null,
                login1: true,
                login2: false,
                login3: false,
                // 图形验证码
                // verify_img_show: true,
                // 短信验证码
                count_down_show: false,
                setInterval: null,
                count_down: 300,
              yanzhengmaBox:false,
            }
        },
        created() {

            // 获取logo
            this.get_logo()
            // 获取导航
            // this.get_nav()
            // 获取图形验证码
            // this.get_verify()


        },
        methods: {

            // 跳转我的订单
            tokens(e) {
              if(e.id == 2) {
                if(sessionStorage.getItem('token')) {
                  this.$router.push({
                    path: '/order/my_order'
                  })
                }else{
                  this.$router.push({
                    path: '/login'
                  })
                }
              }else if(e.id == 1) {
                this.$router.push({
                  path: '/index_home'
                })
              }
            },
            // 联系客服
            service() {
              this.service_show= true
            },
            service_open() {
              this.service_show= false
            },
            // 登录接口
            user_login(y) {
              y.openid = localStorage.getItem('openid')
              console.log(y.openid)
              this.$post(localStorage.getItem('http') + 'user/login',y)
                .then(res=> {
                  if(res.code == 1) {
                    sessionStorage.setItem('token',res.data.token)
                    sessionStorage.setItem('phone',res.data.phone)

                    this.$router.push('/center')
                    this.$toast.success(res.msg);
                  }else{
                    this.$toast.error(res.msg);
                    // this.get_verify()
                  }
                })
            },
            // 登录
            submit () {
              this.$refs.form.validate().then((result) => {
                // console.log('form valid: ', result)
                if(result) {
                  this.user_login(this.validateForm)
                }
              });
            },
            // 手机号去重
            check_phone() {
              this.$post(localStorage.getItem('http') + 'user/check_phone',{
                phone: this.validateForm.phone
              })
                .then(res=> {
                  // console.log(res)
                  if(res.code == 1) {
                    this.user_reg(this.validateForm)
                  }else{
                    this.$toast.error(res.msg);
                  }
                })
            },
            // 注册接口
            user_reg(y) {

              var invite_openid = localStorage.getItem('invite_openid');
              if(invite_openid){
                this.$post(localStorage.getItem('http') + 'user/get_invite_code_by_openid', {
                  invite_openid:invite_openid
                })
                    .then(res=> {
                      if (res.code == 1){
                        y.invite_code = res.data.invite_code;
                      }else{
                        console.log(res);
                      }
                      y.openid = localStorage.getItem('openid')
                      this.$post(localStorage.getItem('http') + 'user/reg',y)
                          .then(res=> {
                            if(res.code == 1) {
                              this.back_login()
                              this.$toast.success(res.msg);
                            }else{
                              this.$toast.error(res.msg);
                            }
                          })

                    })
              }



            },
            // 注册
            submit_ce() {
              this.$refs.form.validate().then((result) => {
                // console.log('form valid: ', result)
                if(result) {
                  // console.log(this.error_text1)
                  if(this.validateForm.pass != this.validateForm.pass_two) {
                    this.error_text1= '两次密码不一致'
                  }else{
                    this.check_phone()
                  }
                }
              });
            },
            // 忘记密码接口
            edit_pass(y) {
              this.$post(localStorage.getItem('http') + 'user/edit_pass',y)
                .then(res=> {
                  // console.log(res)
                  if(res.code == 1) {
                    this.back_login()
                    this.$toast.success(res.msg)
                  }else{
                    this.$toast.error(res.msg)
                  }
                })
            },
            // 忘记密码确认
            confirm() {
              this.$refs.form.validate().then((result) => {
                  console.log('form valid: ', result)
                  if(result) {
                    if(this.validateForm.pass != this.validateForm.pass_two) {
                      this.error_text1= '两次密码不一致'
                    }else{
                      this.edit_pass(this.validateForm)
                    }
                  }
              });
            },
            // 倒计时
            down() {
              this.count_down_show= true
              if(this.count_down== 300) {
                this.setInterval = setInterval(() => {
                  // console.log(this.count_down-=1)
                  let num= this.count_down-=1
                  if(num == 0) {
                    this.count_down_show= false
                    this.count_down= 300
                    clearInterval(this.setInterval)
                  }
                },1000)
              }else{
                this.count_down = 300
                this.setInterval = setInterval(() => {
                  // console.log(this.count_down-=1)
                  let num= this.count_down-=1
                  if(num == 0) {
                    this.count_down_show= false
                    this.count_down= 300
                    clearInterval(this.setInterval)
                  }
                },1000)
              }
            },
            // 获取验证码
            get_verify_num() {
              if(this.validateForm.phone != null) {
                this.$post(localStorage.getItem('http') + 'user/get_forget_verify',{
                  phone: this.validateForm.phone
                })
                    .then((res)=> {
                      console.log(res)
                      if(res.code == 1) {
                        this.down();
                        this.$toast.success(res.msg);
                      }else {
                        this.$toast.error(res.msg);
                      }
                    })
              }else{
                this.$toast.error('请输入手机号');
              }

            },
            // 获取图形验证码
            // get_verify() {
            //   this.verify_img= localStorage.getItem('http') + 'user/get_verify?'+ Math.random();
            // },
            // 注册
            register() {
              // this.get_verify()
              this.$refs['form'].clear();
              this.login1= false
              this.login2= true
              this.login3= false
              this.tuijianren = false
              this.validateForm= {
                  phone: null,
                  pass: null,
                  pass_two: null,
                  verify: null,
                  isAgree: false,
                  invite_code:null
              }
              this.password_show= true
              this.yanzhengmaBox= false
              this.verify = null;
            },
            // 忘记密码
            look_for_password_info() {
              this.$refs['form'].clear();
              this.login1= false
              this.login2= false
              this.login3= true
              this.verify_img_show= false
              this.validateForm= {
                  phone: null,
                  pass: null,
                  pass_two: null,
                  verify: null,
                  isAgree: false,
                  invite_code:null
              }
              this.password_show= true
              this.yanzhengmaBox= true
              this.verify=[
                { validate: (val) => !!val, message: '必须填写验证码'}
              ]
            },
            // 回到登录
            back_login() {
              // this.get_verify()
              this.password_show= false
              this.$refs['form'].clear();
              this.login1= true
              this.login2= false
              this.login3= false
              // this.verify_img_show= true
              this.tuijianren= false
              this.validateForm= {
                  phone: null,
                  pass: null,
                  pass_two: null,
                  verify: null,
                  isAgree: false,
                  invite_code:null
              }
              this.yanzhengmaBox= false
              this.verify = null;
            },
            get_logo() {
                this.$post(localStorage.getItem('http') + 'setting/get_detail')
                    .then((res)=> {
                        // console.log(res)

                        this.logo_url= res.data.logo_url

                        this.logo= res.data.black_logo_url

                    })
            },
            // 侧边栏登录
            login() {
                this.backgronds()
            },
            // 获取导航
            // get_nav() {
            //   this.$post(localStorage.getItem('http') + 'nav/get_top_nav')
            //       .then(res=> {
            //         // console.log(res.data)
            //
            //         res.data.forEach(item=> {
            //           item.link= localStorage.getItem('http') + item.link
            //         })
            //
            //         this.nav_list= res.data
            //       })
            // },
            // 展开
            open() {
                this.$refs.nav_background.style.width= '100%'
                this.$refs.nav.style.width= '260px'
                this.$refs.nav.style.paddingLeft= '26px'
                this.$refs.nav.style.paddingRight= '26px'
                this.$refs.imgs.style.display= 'block'
                setTimeout(()=> {
                    this.$refs.off_nav.style.display= 'block'
                },200)
            },
            // 关闭
            backgronds() {
                this.$refs.nav_background.style.width= '0'
                this.$refs.nav.style.width= '0'
                this.$refs.nav.style.paddingLeft= '0'
                this.$refs.nav.style.paddingRight= '0'
                this.$refs.imgs.style.display= 'none'
                this.$refs.off_nav.style.display= 'none'

            }
        },
        components: {
          noSharing
        }
    }
</script>

<style lang="less" scoped>
    .login_background{
        width: 100%;
        height: 100vh;
        background: url('../assets/login/login_background.png')no-repeat;
        background-size: 100% 100%;

        .header{
            position: relative;

            .service{
              width: 100%;
              height: 100vh;
              position: absolute;
              top: 0;
              background: rgba(0, 0, 0, 0.75);
              z-index: 3147483649;
              display: flex;
              justify-content: center;
              align-items: center;
              p{
                font-size: 20px;
                color: white;
              }
            }
            .nav_background{
                width: 0;
                height: 100vh;
                position: fixed;
                display: flex;
                left: 0;
                top: 0;
                z-index: 200;
                .backgronds{
                    width: calc(100% - 260px);
                    height: 100vh;
                    background: rgba(0,0,0,.5);
                    transition: all .2s ease-in-out;
                }
                .nav{
                    width: 0;
                    height: 100vh;
                    padding: 16px 0;
                    background: #000000;
                    transition: all .2s ease-in-out;
                    img{
                        display: none;
                        width: 92px;
                        height: 25px;
                        object-fit: cover;
                        margin-bottom: 12px;
                    }
                    .off_nav{
                        display: none;
                        li{
                            font-size: 16px;
                            line-height: 24px;
                            padding: 12px 0;
                            border-bottom: 1px solid #2D2D2F;
                            a{
                                color: white;
                            }
                        }
                    }
                    .off_nav li:nth-child(1){
                        border-top: 1px solid #2D2D2F;
                    }
                }
            }
        }

        .header /deep/ .mu-appbar-title{
            display: flex;
            padding-top: 10px;
            img{
                width: 130px;
                height: 35px;
                object-fit: cover;
            }
        }
        .mu-appbar{
            background: transparent!important;
        }
        .header /deep/ .mu-elevation-4{
            box-shadow: none;
        }

        .form{
            padding: 0 35px;
            /deep/.mu-form-item-content{
              min-height: 30px;
              /deep/.mu-text-field-input{
                height: 30px;
              }
            }
            /deep/.mu-form-item__has-label{
              min-height: 58px;
            }
            .login_input{
                width: 100%;
                margin-top: 8%;
                padding-bottom: 25px;
                background: url("../assets/login/login_input.png")no-repeat;
                background-size: 100% 100%;
                .login_form{
                    background: white;
                    border-radius: 20px;
                    padding: 20px 23.5px;
                    /deep/ .ver_code{
                        width: 100%;
                        position: relative;
                        align-items: center;
                        // 验证码
                        .verify{
                          position: absolute;
                          right: 0;
                          top: 0;
                          display: flex;
                          img{
                            width: 100px;
                            height: 30px;
                          }
                          .mu-button{
                            width: 100px;
                            height: 26px;
                            font-size: 12px;
                          }
                        }
                    }
                    .submit_button{
                        width: 100%;
                        p{
                          text-align: right;
                          color: #486EEF;
                          margin-bottom: 20px;
                        }
                        .mu-button{

                        }
                        .submit_button_span{
                            display: flex;
                            justify-content: center;
                            margin-top: 15.5px;
                            span{
                              color: #4962EE;
                              opacity: 0.5;
                            }
                            p{
                              color: #4962EE;
                              margin-bottom: 0;
                            }
                        }
                    }
                    .mu-button{
                        width: 100%;
                        height: 37px;
                        border-radius: 27px;
                        /deep/ .mu-button-wrapper{
                            color: white;
                        }
                    }
                    .mu-form-item{
                        margin-bottom: 2px;
                    }
                    /deep/ .mu-input__error .mu-input-line{
                        color: #f44336;
                    }
                    /deep/ .mu-form-item__error /deep/ .mu-form-item-label{
                        i{
                            color: #f44336!important;
                        }
                        p{
                            color: #f44336!important;
                        }
                    }
                }
            }
        }


    }




</style>