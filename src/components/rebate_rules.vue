<template>
<div class="rebate_rules_b" :style="height">
  <img src="http://quanpeng.oss-cn-zhangjiakou.aliyuncs.com/of/img/1614663614/bcd1d7cf18bb70bef8d21a2d93248992.png" alt="">

</div>
</template>

<script>
export default {
  name: "rebate_rules",
  data(){
    return{
      height:{
        width:'',
        height:''
      }
    }
  },
  methods:{
    get_h(){
      this.height.height = window.innerHeight +'px'
    }
  },
  created(){
    this.get_h();
  }
}
</script>

<style scoped lang="less">
.rebate_rules_b{
  width: 100%;
  img{
    width: 100%;
    object-fit: cover;
  }
}
</style>