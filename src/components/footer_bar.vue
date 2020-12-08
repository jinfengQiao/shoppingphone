<template>
  <div class="footerBox">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <ul>
      <li
          v-for="(i,index) in list"
          :key="index"
          @click="addClassName(i.path)"
          :to="i.path"
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
    props:['tabName'],
    data() {
      return{
        num:true,
        list:[
          {
            img: require("../assets/footer/index_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/index_icon.png"), //点击之后要显示的图标
            name: "首页",
            path: "/index_home"
          },
          {
            img: require("../assets/footer/busin_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/busin_icon.png"), //点击之后要显示的图标
            name: "商学院",
            path: "/buSchool"
          },
          {
            img: require("../assets/footer/card_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/card_icon.png"), //点击之后要显示的图标
            name: "咨询卡",
            path: "/consul"
          },
          {
            img: require("../assets/footer/class_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/class_icon.png"), //点击之后要显示的图标
            name: "分类",
            path: "/order/all_service"
          },
          {
            img: require("../assets/footer/my_icon1.png"),  //原始显示的图标
            active: require("../assets/footer/my_icon.png"), //点击之后要显示的图标
            name: "我的",
            path: "/center"
          },

        ],
      }
    },
    created() {

    },
    methods: {
      addClassName: function(path) {
        this.$router.replace(path);
      },
    }
}
</script>

<style lang="less" scoped>
.footerBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  z-index: 9999;
  background: #FFFFFF;
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  ul{
    float: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    li{
      width: 60px;
      height: 62px;
      //line-height: 62px;
      text-align: center;
      cursor: pointer;
      img{
        margin-top: 10px;
        width: 26px;
        height: 26px;
      }
      span{
        float: left;
        width: 100%;
        margin-top: -4px;
        font-size: 13px;
        font-family: PingFang SC;
        color: #AAAAAA;
        text-align: center;
      }
    }
  }
}
.Active{
  color: #1672F9!important;
}
</style>