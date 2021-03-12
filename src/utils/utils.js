
export default{
    getUrlKey:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var url = window.location.href;
        if (url.indexOf("?") == -1){
            return null;
        }
        var r = url.substr(url.indexOf("?") + 1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
}
