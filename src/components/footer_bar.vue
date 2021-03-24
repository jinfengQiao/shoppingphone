<template>
  <div class="footerBox">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <ul>
      <li
          v-for="(i,index) in list"
          :key="index"
          @click="addClassName(i.path,index)"
          :to="i.path"
          :class="i.path===$route.path?list[index].currentClass : list[index].class"
      >
        <img :src="i.path===$route.path?list[index].active : list[index].img">
        <span>{{i.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "footer_bar",
    // props:['tabName'],
    data() {
      return{
        num:true,
        list:[
          {
            img: require("../assets/footer/index_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/index_icon.png"), //点击之后要显示的图标
            name: "首页",
            path: "/index_home",
            class:"",
            currentClass:"barCls"
          },
          {
            img: require("../assets/footer/busin_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/busin_icon.png"), //点击之后要显示的图标
            name: "商学院",
            path: "/buSchool",
            class:"",
            currentClass:"barCls"
          },
          {
            img: require("../assets/footer/card_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/card_icon.png"), //点击之后要显示的图标
            name: "咨询卡",
            path: "/consul",
            class:"",
            currentClass:"barCls"
          },
          {
            img: require("../assets/footer/class_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/class_icon.png"), //点击之后要显示的图标
            name: "分类",
            path: "/order/all_service",
            class:"",
            currentClass:"barCls"
          },
          {
            img: require("../assets/footer/my_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/my_icon.png"), //点击之后要显示的图标
            name: "我的",
            path: "/center",
            class:"",
            currentClass:"barCls"
          },
        ],
        isSelect11:0,
      }
    },
    created() {

    },
    methods: {
      addClassName: function(path,index) {
        this.isSelect11 = index;
        this.$router.replace(path);
      },
      goBack(){
        this.$router.replace({path: '/'});
        // console.log('点击了一下')
        //replace替换原路由，作用是避免回退死循环
      }
    },
    mounted(){
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed(){
      window.removeEventListener('popstate', this.goBack, false);
    },
}
</script>

<style lang="less" scoped>
.footerBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  //z-index: 9999;
  z-index: 1999;
  background: #FFFFFF;
  border-top: 1px solid #E7E7E7;
  box-sizing: border-box;
  color: #AAAAAA;
  ul{
    float: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li{
      width: 60px;
      //height: 62px;
      //line-height: 62px;
      text-align: center;
      cursor: pointer;
      img{
        margin-top: 10px;
        width: 22px;
        height: 22px;
      }
      span{
        float: left;
        width: 100%;
        margin-top: -1px;
        font-size: 13px;
        font-family: PingFang SC;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
.barCls{
  color: #1672F9!important;
}
</style>