
<script>
export default {
name: "share",
  data(){
    return{
      integrityurl:'',
      resume:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。'
    }
  },
  methods:{
    share(title,desc,link,imgUrl){
      this.$post(localStorage.getItem('http') + 'wechat/get_jssdk_config',{
        url: this.integrityurl
      }).then(res=> {
        var wx = this.$wx;
        wx.config(res.data);
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList: res.data.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              console.log(res);
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
          // if(this.link){Request.QueryString["a1"]
          //
          // }
          // link = link + "?openid=";
          // link = link + "&openid=";

          wx.updateAppMessageShareData({
            title: "权鹏集团 - " + title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 设置成功
              // console.log("message ok");
            }
          });

          wx.updateTimelineShareData({
            title: "权鹏商城 - " + title, // 分享标题
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
    var openid = localStorage.getItem("openid");
    // alert(openid);

    this.integrityurl = window.location.href;
    var link = this.integrityurl;
    //判断用户是否登录
    //拼接user_id到地址上
    if(link.indexOf("?") >= 0 ) { //判断url地址中是否包含link字符串
      // alert("是拼接的");
      link = link + "&openid=" + openid;
    }else{
      // alert("没有拼接");
      link = link + "?openid=" + openid;
    }


    this.share(this.title,this.resume,link,this.logo);
  }
}
</script>

<style scoped>

</style>