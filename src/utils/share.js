import Vue from 'vue'
import wx from 'weixin-js-sdk';

export function wxShare(title,desc,link,imgUrl){
    this.$post(localStorage.getItem('http') + 'wechat/get_jssdk_config',{
        url: link
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

        var openid = localStorage.getItem("openid");
        // alert(openid);
        if(link.indexOf("?") >= 0 ) { //判断url地址中是否包含link字符串
            link = replaceParamVal(link,'openid',openid);
        }else{
            link = link + "?openid=" + openid;
        }
        // alert(link);



            wx.updateAppMessageShareData({
                title: "权鹏商城 - " + title, // 分享标题
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
}

function replaceParamVal(url,paramName,replaceVal) {
    var oUrl = url.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl;
    if (re){
        nUrl = oUrl.replace(re,paramName+'='+replaceVal);
    }else{
        nUrl = oUrl + "&" + paramName + '=' + replaceVal;
    }

    return nUrl;
}