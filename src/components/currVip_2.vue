<template>
  <div class="bg" :style="height">
    <div class="tab">
      <ul>
        <li v-for="(n,index) in tabList" :key="index" :class="{cur:index==isActive}" @click="listGo(index)">{{n}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "currVip",
  data(){
    return{
      height:{
        width: '',
        height:'',
      },
      tabList:[
        '入门VIP','贵宾VIP','至尊VIP'
      ],
      isActive:false,
    }
  },
  methods:{
    get_height(){
      this.height.height = window.innerHeight+'px'
    },
    listGo(index){
      // console.log(index)
      this.isActive = index;
    }
  },
  created() {
    this.get_height();
  },
}
</script>

<style lang="less" scoped>
.bg{
  float: left;
  width: 100%;
  background-color: #f3f4f6;
}
.tab{
  z-index: 2;
  position: fixed;
  top: 0;
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


</style>