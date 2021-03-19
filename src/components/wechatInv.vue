<template>
<div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
export default {
  name: "wechatInv",
  methods: {
    share(title,desc,link,imgUrl){
      this.$post(localStorage.getItem('http') + 'wechat/get_jssdk_config',{
        url: this.integrityurl
      }).then(res=> {
        var wx = this.$wx;
        wx.config(res.data);
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList: res.data.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function() {
              // console.log(res);
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });

          wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
              // console.log("message ok");
            }
          });

          wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
              // console.log("timeline ok");
            }
          })


        });


      });
    },
  },
  created() {
    this.share();
  },
}
</script>

<style scoped>

</style>