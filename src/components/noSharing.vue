<template>
<div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
export default {
  name: "noSharing",
  created() {
    // 禁止分享
    function onBridgeReady(){
      //WeixinJSBridge.call('showOptionMenu');
      window.WeixinJSBridge.call('hideOptionMenu');  //禁止分享等动作
    }
    if (typeof window.WeixinJSBridge == "undefined"){
      if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    }else{
      onBridgeReady();
    }
  },
}
</script>

<style scoped>

</style>