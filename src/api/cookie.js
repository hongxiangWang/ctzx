//取Cookie的值
function GetCookie(name) {

}
//写入到Cookie
//name:cookie名称  value:cookie值
function SetCookie(name, value) {

}

function getCookieVal(offset) {
  let endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1) endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}
module.exports =  {
  getCookie:function(name){
    let arg = name + "=";
    let alen = arg.length;
    let clen = document.cookie.length;
    let i = 0;
    while (i < clen) {
      let j = i + alen;
      if (document.cookie.substring(i, j) == arg)
        return getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
    }
    return null;
  },
  setCookie:(name, value)=>{
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + 60 * 2000);//过期时间 2分钟
    //document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    document.cookie = name + "=" + escape(value) ;
  }
}
