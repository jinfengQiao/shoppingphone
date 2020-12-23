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
    // function onBridgeReady(){
    //   //WeixinJSBridge.call('showOptionMenu');
    //   window.WeixinJSBridge.call('hideOptionMenu');  //禁止分享等动作
    // }
    // if (typeof window.WeixinJSBridge == "undefined"){
    //   if( document.addEventListener ){
    //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    //   }else if (document.attachEvent){
    //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //   }
    // }else{
    //   onBridgeReady();
    // }
    // wx.hideMenuItems({
    //   menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    // });
    //
    // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //   // 通过下面这个API隐藏右上角按钮
    //   WeixinJSBridge.call('hideOptionMenu');
    // });
    //
    // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //   // 通过下面这个API显示右上角按钮
    //   WeixinJSBridge.call('showOptionMenu');
    // });

    var wx = this.$wx;
    wx.hideOptionMenu();
  },
}
</script>

<style scoped>

</style>