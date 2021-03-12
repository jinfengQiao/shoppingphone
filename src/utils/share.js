// import Vue from 'vue'
// import wx from 'weixin-js-sdk';

// export function wxShare(title,desc,link,imgUrl,goods_id,goods_type){
export function wxShare(title,desc,link,imgUrl){
    // console.log('这是titlt'+title)
    // console.log('这是goods_id'+goods_id)
    // console.log('这是goods_type'+goods_type)
    // var that = this
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
        if(link.indexOf("?") >= 0 ) { //判断url地址中是否包含link字符串
            link = replaceParamVal(link,'openid',openid);
            console.log("有参数")
        }else{
            link = link + "?openid=" + openid;
            console.log("无参数")
        }
            wx.updateAppMessageShareData({
                // title: "权鹏商城 - " + title, // 分享标题
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // console.log('这是成功拿到的goods_id'+goods_id)
                    // console.log('这是成功拿到的goods_type'+goods_type)
                    // that.$post(localStorage.getItem('http') + 'user_score/add', {
                    //     token: localStorage.getItem('token'),
                    //     source:3,
                    //     goods_id:goods_id,
                    //     goods_type:goods_type
                    // }).then(res => {
                    //     console.log(res)
                    //     if(res.code == 1){
                    //         console.log('增加了')
                    //     }
                    // })
                }
            });

            wx.updateTimelineShareData({
                // title: "权鹏商城 - " + title, // 分享标题
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function () {
                // 设置成功
                //     console.log("timeline ok");
                //     that.$post(localStorage.getItem('http') + 'user_score/add', {
                //         token: localStorage.getItem('token'),
                //         source:3,
                //         goods_id:goods_id,
                //         goods_type:goods_type
                //     }).then(res => {
                //         console.log(res)
                //         if(res.code == 1){
                //             console.log('增加了')
                //         }
                //     })
                }
            })
        });
    });
}

function replaceParamVal(url,paramName,replaceVal) {
    var oUrl = url.toString();
    var re = eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl;


    console.log("参数名" + paramName);
    console.log("openid:" + replaceVal);
    if (re.test(oUrl)){
        console.log("存在openid：" + replaceVal);
        nUrl = oUrl.replace(re,paramName+'='+replaceVal);
    }else{
        console.log("不存在openid");
        nUrl = oUrl + "&" + paramName + '=' + replaceVal;
    }

    console.log("组合后的：" + oUrl)
    return nUrl;
}
