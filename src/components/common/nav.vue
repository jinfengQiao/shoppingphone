<template>
    <header style="position: fixed;
    z-index: 1999;
    width: 100%;
    left: 0;
    top: 0;">
        <mu-appbar style="width: 100%;" color="whites">
            <img :src="logo" alt="" @click="jumpGuanwang">
<!--            <mu-button icon slot="right" @click="open">-->
<!--                <mu-icon color="#000000" value="menu"></mu-icon>-->
<!--            </mu-button>-->
        </mu-appbar>
        <div class="nav_background" ref="nav_background" >
            <div class="nav" ref="nav">
                <img :src="logo_url" alt="" ref="imgs">
                <ul class="off_nav" ref="off_nav" >mu-appbar-right
                    <li v-for="i in nav_list" :key="i.id">
                        <a style="width: 100%; display: block;" @click="tokens(i)" >{{ i.name }}</a>
                    </li>
                    <li @click="service">
                      <a>联系客服</a>
                    </li>
                    <li>
                      <a style="width: 100%; display: block;"  href="">权鹏官网</a>
                    </li>
                    <li>
                        <router-link style="width: 100%; display: block;"  to='login'>登录注册</router-link>
                    </li>
                </ul>
            </div>
            <div class="backgronds" @click="backgronds">

            </div>
        </div>
        <div v-if="service_show" class="service" @click="service_open">
          <p>客服热线：400-1025-199</p>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return{
                logo: null,
                logo_url: null,
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
            }
        },
        created() {
            // 获取logo
            this.get_logo()
            // 获取导航
            // this.get_nav()
        },
        methods: {
          // 跳转我的订单
          tokens(e) {
            if(e.id == 2) {
              if(localStorage.getItem('token')) {
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
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
          },
          service_open() {
            this.service_show= false
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='';//出现滚动条
            document.removeEventListener("touchmove",mo,false);
          },
          // 获取导航
          // get_nav() {
          //   this.$post(localStorage.getItem('http') + 'nav/get_top_nav')
          //     .then(res=> {
          //       // console.log(res.data)
          //
          //       res.data.forEach(item=> {
          //         item.link= localStorage.getItem('http') + item.link
          //       })
          //
          //       this.nav_list= res.data
          //     })
          // },
          // 获取logo
          get_logo() {
              this.$post(localStorage.getItem('http') + 'setting/get_detail')
                  .then((res)=> {
                      // console.log(res)

                      this.logo_url= res.data.logo_url

                      this.logo= res.data.black_logo_url

                  })
          },
          // 登录
          login() {
              this.$router.push({
                  path: '/login'
              })
          },
          // 展开
          // open() {
          //     this.$refs.nav_background.style.width= '100%'
          //     this.$refs.nav.style.width= '260px'
          //     this.$refs.nav.style.paddingLeft= '26px'
          //     this.$refs.nav.style.paddingRight= '26px'
          //     this.$refs.imgs.style.display= 'block'
          //     setTimeout(()=> {
          //         this.$refs.off_nav.style.display= 'block'
          //     },200)
          //     var mo=function(e){e.preventDefault();};
          //     document.body.style.overflow='hidden';
          //     document.addEventListener("touchmove",mo,false);//禁止页面滑动
          // },
          // 关闭
          backgronds() {
              this.$refs.nav_background.style.width= '0'
              this.$refs.nav.style.width= '0'
              this.$refs.nav.style.paddingLeft= '0'
              this.$refs.nav.style.paddingRight= '0'
              this.$refs.imgs.style.display= 'none'
              this.$refs.off_nav.style.display= 'none'
              var mo=function(e){e.preventDefault();};
              document.body.style.overflow='';//出现滚动条
              document.removeEventListener("touchmove",mo,false);
          },
          jumpGuanwang(){
            window.location.href='https://wap.tjqpjt.com/'
          }
        }
    }
</script>

<style lang="less" scoped>
    header{
        position: relative;
    }
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




    header /deep/ .mu-appbar-title{
        display: flex;
        img{
            width: 92px;
            height: 25px;
        }
    }
    .mu-appbar{
        background: white!important;
    }
    header /deep/ .mu-elevation-4{
        box-shadow: none;
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




</style>