!function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(64)},function(t,e){"use strict";var o;!function(t){t.IS_DEBUG_MODE=!1,t.IS_NATIVE=!0,t.IS_BUILD_ANDROID=!1;var e="https://www.casheasy.cn",o="http://192.168.2.145:6100";t.HOST=t.IS_DEBUG_MODE?o:e,t.SORT_DESC="DESC",t.SORT_ASC="ASC",t.PAGE_SIZE=10,t.PAGE_INDEX=0,t.MSG_LOADING="<div><p><ion-spinner icon='ios-small'></ion-spinner></p>请稍候<div>"}(o=e.Constants||(e.Constants={}))},function(t,e){"use strict";var o;!function(t){var e;!function(t){var e=function(){function t(){}return t}();t.BaseReq=e;var o=function(){function t(){}return t}();t.BaseResp=o;var n=function(){function t(){}return t}();t.ReqHeader=n;var r=function(){function t(){}return t}();t.RespHeader=r}(e=t.base||(t.base={}))}(o=e.dto||(e.dto={})),e.BaseReq=o.base.BaseReq,e.BaseResp=o.base.BaseResp,e.ReqHeader=o.base.ReqHeader,e.RespHeader=o.base.RespHeader},function(t,e,o){"use strict";var n=o(14);e.key_intent_product_detail="A",e.key_intent_product_loweramount="B",e.key_intent_product_tag="C";var r=function(){function t(){this.param={}}return t.writeIntent=function(t,e){var o=angular.toJson(e);console.log("-----------------------------setItem:"+t+"/"+o),n.RYStorage.setItem(t,o)},t.readIntent=function(t){var e=n.RYStorage.getItem(t);return console.log("-----------------------------getItem:"+t+"/"+e),angular.fromJson(e)},t.writeCookies=function(t){this.clearCookies();var e="CK=";document.cookie=e+angular.toJson(t),console.log("writeCookie---->"+document.cookie)},t.readCookies=function(){var e=null,o=document.cookie;if(console.log("readCookies----->src is "+o),o&&o.length>=3){var n=o.substring(3,o.length);console.log("readCookies----->dest is "+n),null!=n&&"null"!=n&&(e=angular.fromJson(n))}return console.log("readCookies----->"+o+"/"+angular.toJson(e)),null==e?new t:e},t.clearCookies=function(){var t=document.cookie.match(/[^ =;]?(?=\=)/g);if(console.log("clearCookies------>"+angular.toJson(t)),t)for(var e=t.length;e--;)t[e]&&(document.cookie=t[e]+"=0;expires="+new Date(0).toUTCString())},t}();e.IntentCookies=r},function(t,e,o){"use strict";var n,r=o(2),a=o(9),i=o(6),u=o(3),s=o(1);!function(t){var e;!function(e){var o=s.Constants.HOST,n=function(){function t(){}return t.SUCCESS="0000",t}();e.NetRequestCode=n;var c=function(){function e(t){this.$http=t,e.count=e.count+1,console.log("NetRequest is created ,实例个数:"+e.count)}return e.prototype.getHttpConfiguration=function(t){var e={method:"jsonp",url:o+t+"?callback=JSON_CALLBACK",headers:{}};if(i.CommonUtil.isWeixinBrowser()){var n=u.IntentCookies.readCookies();n.wxid&&(e.headers["X-WeChat-OpenId"]=n.wxid)}return e},e.prototype.postHttpConfiguration=function(t){var e={method:"post",url:o+t,headers:{}};if(i.CommonUtil.isWeixinBrowser()){var n=u.IntentCookies.readCookies();n.wxid&&(e.headers["X-WeChat-OpenId"]=n.wxid)}return e},e.prototype.buildRequestHeader=function(){var t=new r.ReqHeader;return t.channel="",t.deviceInfo="Wechat",t.deviceIp="",t.inputCharset="utf-8",t.requestDate="20160905",t.requestTime="115001",t.service="100005",t.requestId="e5806547-ed72-49a4-b7ee-f5e2d1806fea",t},e.prototype.doHttpRequest=function(t,e){this.$http(t).success(function(t,o,n,r){null!=e&&e.onSuccess(t)}).error(function(t,o,n,r){null!=e&&e.onFailure(o)})},e.prototype.doWeixinAuthorizon=function(t,e){var o="https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5f52672571705506&secret=51ea7bdf86de5f283f9569b89d9662e9&code="+t+"&grant_type=authorization_code",n={url:o,method:"POST"};this.doHttpRequest(n,e)},e.prototype.queryCashProduct=function(t,e){var o="/api/prod/cashselected";console.log("------------------能调用起来吗?--");var n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.queryAnticashProduct=function(t,e){var o="api/prod/noncashselected",n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.queryRecommandProduct=function(t,e){var o="/api/prod/recommended",n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.queryProductDetails=function(t,e,o){var n="/api/prod/detail/"+e,r=angular.toJson(t),a=this.getHttpConfiguration(n);a.params={param:r},this.doHttpRequest(a,o)},e.prototype.doLogin=function(t,e){var o="/api/login",n=angular.toJson(t),r=this.postHttpConfiguration(o);r.params={username:t.body.mobNo,password:t.body.userPasswd,code:i.CommonUtil.parseWeixinAuthcode()},r.data=n,this.doHttpRequest(r,e)},e.prototype.doRegist=function(t,e){var o="/auth/user",n=angular.toJson(t),r=this.postHttpConfiguration(o);r.data=n,r.params={code:i.CommonUtil.parseWeixinAuthcode()},this.doHttpRequest(r,e)},e.prototype.doPasswordFind=function(t,e){var o="/auth/m/"+t.body.mobNo+"/password",n=angular.toJson(t),r=this.postHttpConfiguration(o);r.data=n,this.doHttpRequest(r,e)},e.prototype.doRequestVerfiyCode=function(t,e,o){var n="/api/sms/vc/"+e,r=angular.toJson(t),a=this.postHttpConfiguration(n);a.data=r,this.doHttpRequest(a,o)},e.prototype.doSearch=function(t,e){var o="/api/prod/searchby",n=angular.toJson(t);console.log("------easycash,req-------"),console.log(t);var r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.doSearchType=function(t,e){var o="/api/prod/type",n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.doOrderCreate=function(t,e,o,n){var r="/api/order/"+e+"/"+o,a=angular.toJson(t),i=this.postHttpConfiguration(r);i.data=a,this.doHttpRequest(i,n)},e.prototype.doGetWXOpenId=function(e){var o=i.CommonUtil.parseWeixinAuthcode();if(null!=o){var n=new a.WechatOpenIdReq;n.header=this.buildRequestHeader();var r="/auth/wechat/openid/"+o,s=angular.toJson(n),c=this.getHttpConfiguration(r);c.params={params:s},this.doHttpRequest(c,{onFailure:function(t){null!=e&&e.onFailure(t)},onSuccess:function(o){if(o){var n=o,r=n.header;if(console.log("---获取WXOpenId "+angular.toJson(n)),t.network.NetRequestCode.SUCCESS===r.respCode){var a=n.body,s=i.CommonUtil.parseWXOpenId(a.wechatOpenid);if(s){var c=u.IntentCookies.readCookies();c.wxid=a.wechatOpenid,u.IntentCookies.writeCookies(c)}console.log("成功获取WXOpenId为 "+a.wechatOpenid)}}null!=e&&e.onSuccess(o)}})}},e.prototype.doGetProductsByTag=function(t,e,o){var n="/api/prod/tag/"+t,r=angular.toJson(e),a=this.getHttpConfiguration(n);a.params={param:r},this.doHttpRequest(a,o)},e.prototype.doGetUpgradeInfoAndAdsImages=function(t,e){var o="/api/app/startup",n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.prototype.doGetZmadeng=function(t,e){var o="/api/bulletin/top",n=angular.toJson(t),r=this.getHttpConfiguration(o);r.params={param:n},this.doHttpRequest(r,e)},e.count=0,e}();e.NetRequest=c}(e=t.network||(t.network={}))}(n=e.easycash||(e.easycash={})),e.NetRequest=n.network.NetRequest,e.NetRequestCode=n.network.NetRequestCode},function(t,e,o){"use strict";var n,r=o(4),a=o(13),i=o(12),u=o(8),s=o(11);!function(t){t.NetRequestService="NetRequestService",t.RouterParamService="RouterParamService",t.BreaklineFilter="BreaklineFilter",t.NumberDotFilter="NumberDotFilter",t.StarRateFilter="StarRateService",t.AppStatusService="AppStatusService"}(n=e.EasycashServicesName||(e.EasycashServicesName={}));var c=angular.module("easycashServiceModule",["ionic"]).factory(n.NetRequestService,["$http",function(t){return new r.NetRequest(t)}]).factory(n.RouterParamService,function(){return new a.RouterParamService}).factory(n.AppStatusService,function(){return new s.AppStatusService}).filter(n.BreaklineFilter,function(){return i.BreaklineFilter}).filter(n.NumberDotFilter,function(){return(new u.NumberDotFilter).getProductFee});e.EasycashServiceModule=c},function(t,e,o){"use strict";var n=o(1),r=function(){function t(){}return t.isWeixinBrowser=function(){if(n.Constants.IS_DEBUG_MODE)return!0;var t=window.navigator.userAgent.toLowerCase(),e=t.indexOf("micromessenger")!=-1;return console.log("-----isWeixin:"+e),e},t.parseWeixinAuthcode=function(){if(n.Constants.IS_DEBUG_MODE)return"test-wx-auth-code";if(!this.isWeixinBrowser())return null;var t=window.location.search;if(t&&t.indexOf("&")!=-1&&t.indexOf("code=")!=-1){var e=t.indexOf("code=")+5,o=t.lastIndexOf("&"),r=t.substring(e,o);return console.log("微信AuthCode 为 "+r),r}return null},t.parseWXOpenId=function(t){return null==t||t.indexOf("errcode")>-1?null:t},t}();e.CommonUtil=r},function(t,e){"use strict";var o=function(){function t(){}return t.newRouterUrl=function(t){return"/"+t},t.loginPage="loginPage",t.registerPage="registerPage",t.personCenterPage="personCenterPage",t.productListPage="productListPage",t.productSearchPage="productSearchPage",t.productDetailPage="productDetailPage",t.productRecommandPage="productRecommandPage",t.productTagPage="productTagPage",t.productLowerAmountPage="productLowerAmountPage",t}();e.RouterNativeName=o},function(t,e){"use strict";var o=function(){function t(){}return t.prototype.numberDot=function(t,e){var o=null;if("string"==typeof t)try{o=parseFloat(t)}catch(n){o=null}return"number"==typeof t&&(o=t),null!=o?o.toFixed(e):t},t.prototype.getProductFee=function(t){var e=null;if("string"==typeof t)try{e=parseFloat(t)}catch(o){e=null}return"number"==typeof t&&(e=t),null!=e?(100*e).toFixed(2)+"%":t},t}();e.NumberDotFilter=o},function(t,e,o){"use strict";var n,r=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},a=o(2);!function(t){var e;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.BaseReq);t.WechatOpenIdReq=e}(e=t.request||(t.request={}))}(n=e.dto||(e.dto={})),e.WechatOpenIdReq=n.request.WechatOpenIdReq},function(t,e){"use strict";var o=function(){function t(){}return t}();e.JsonParamBase=o},function(t,e){"use strict";var o=function(){function t(){}return t}();e.AppStatusService=o,o.$inject=[]},function(t,e){"use strict";function o(t){return console.log("------------BreaklineFilter "),null==t?"":t.replace("\r\n","<br/>")}e.BreaklineFilter=o},function(t,e){"use strict";var o;!function(t){var e;!function(t){var e=function(){function t(){}return t}();t.RouterParamService=e}(e=t.routerparam||(t.routerparam={}))}(o=e.easycash||(e.easycash={})),e.RouterParamService=o.routerparam.RouterParamService},function(t,e){"use strict";var o=function(){function t(){}return t.clear=function(){window.localStorage.clear()},t.getItem=function(t){return window.localStorage.getItem(t)},t.key=function(t){return window.localStorage.key(t)},t.removeItem=function(t){window.localStorage.removeItem(t)},t.setItem=function(t,e){window.localStorage.setItem(t,e)},t}();e.RYStorage=o},,function(t,e){"use strict";var o=function(){function t(){}return t.ID_98_document_height=98,t.ID_99_page_title=99,t.ID_100_login=100,t.ID_101_login_check=101,t.ID_102_loginout=102,t.ID_103_login_saveinfo=103,t.ID_200_register=200,t.ID_201=201,t.ID_300_product_item_select=300,t.ID_301_product_query=301,t.ID_400_product_search=400,t.ID_401=401,t.ID_500_product_detail_query=500,t.ID_501_product_apply=501,t.ID_502_product_strategy_guide=502,t.ID_600_doc=600,t.ID_601_loan=601,t.ID_602_question=602,t.ID_603_link=603,t.ID_604_settings=604,t.ID_700_tag=700,t}();e.JsonCmdId=o},function(t,e){"use strict";var o="RYNativeCallee",n=function(){function t(){}return t.callNative=function(t,e){var n=window[o];n&&n.callNative(t,angular.toJson(e))},t}();e.JsonNativeSender=n},,function(t,e){"use strict";var o=function(){function t(){}return t.changePutMoneyTimeUnit=function(t){t.periodUnit="0"==t.periodUnit?"日":"月";var e=t.putMoneyTimeUnit,o="";o="0"===e?"分钟":"1"===e?"小时":"日",t.putMoneyTimeUnit=o},t.changeLoanMinute=function(t,e){var o=e.putMoneyTimeUnit,n=parseInt(e.putMoneyTime),r=0;r="0"===o||"分钟"===o?n:"1"===o||"小时"===o?60*n:24*n*60,e.loanMinute=r},t.secMinDayAndSort=function(e,o){if(void 0===o&&(o=""),null==e)return null;for(var n=0;n<e.length;n++)t.changePutMoneyTimeUnit(e[n]);if(null==o||0==o.trim().length)return e;if("loanMinute"==o)for(var n=0;n<e.length;n++)t.changeLoanMinute(o,e[n]);return e.sort(this.sortProduct(o))},t.secMinDay=function(e){for(var o=0;o<e.length;o++)t.changePutMoneyTimeUnit(e[o]);return e},t.sortProduct=function(t){return console.log("---sortProduct---"+t),function(e,o){var n=e[t],r=o[t];return"loanMinute"===t?n-r:"monthRate"===t?n-r:r-n}},t.testSort=function(){var t=[1,3,2,4,5,0];t.sort(function(t,e){return e-t}),console.log("--------------降序排列:"+t)},t}();e.ProductBriefInfoUtil=o},function(t,e,o){"use strict";var n=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},r=o(10),a=function(t){function e(){t.apply(this,arguments)}return n(e,t),e}(r.JsonParamBase);e.JsonParam300=a},function(t,e,o){"use strict";var n,r=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},a=o(2);!function(t){var e;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.dto.base.BaseReq);t.SelectedProdsReq=e;var o=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.dto.base.BaseReq);t.RecommendedProdsReq=o;var n=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.dto.base.BaseReq);t.ProductInfoIReq=n}(e=t.request||(t.request={}))}(n=e.dto||(e.dto={})),e.SelectedProdsReq=n.request.SelectedProdsReq,e.RecommendedProdsReq=n.request.RecommendedProdsReq,e.ProductInfoIReq=n.request.ProductInfoIReq},,function(t,e){"use strict";var o;!function(t){var e;!function(t){var e=function(){function t(){}return t.CASHSELECTED="03",t.INSTALLMENTLOAN="04",t.CREDITCARDREPAY="02",t.TAOBAOCREDIT="01",t.IDENTITYCREDIT="05",t.DREAMCREDIT="08",t.ZHIMACREDIT="09",t.STUDENTCREDIT="06",t.SALARYCREDIT="07",t}();t.ProdTypeValueCode=e}(e=t.entity||(t.entity={}))}(o=e.dto||(e.dto={})),e.ProdTypeValueCode=o.entity.ProdTypeValueCode},function(t,e,o){"use strict";var n=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},r=o(23),a=function(t){function e(){t.apply(this,arguments)}return n(e,t),e.CREDIT_APPLY="lower100",e.TAB1_XE1="lower101",e.TAB1_XE2="lower102",e.TAB1_XE3="lower103",e}(r.ProdTypeValueCode);e.HomeSelectType=a},,function(t,e,o){"use strict";var n,r=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},a=o(2);!function(t){var e;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.BaseReq);t.AppStartUpInfoReq=e}(e=t.request||(t.request={}))}(n=e.dto||(e.dto={})),e.AppStartUpInfoReq=n.request.AppStartUpInfoReq},,function(t,e){"use strict";var o;!function(t){var e;!function(t){var e=function(){function t(){}return t}();t.AppStartUpInfoReqBody=e}(e=t.requestBody||(t.requestBody={}))}(o=e.dto||(e.dto={})),e.AppStartUpInfoReqBody=o.requestBody.AppStartUpInfoReqBody},,,,,function(t,e,o){"use strict";var n=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},r=o(10),a=function(t){function e(){t.apply(this,arguments)}return n(e,t),e}(r.JsonParamBase);e.JsonParam700=a},function(t,e,o){"use strict";var n=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},r=o(7),a=function(t){function e(){t.apply(this,arguments)}return n(e,t),e.homeRecommandCreditPage="homeRecommandCreditPage",e.productLowerAmountLoanPage="productLowerAmountLoanPage",e.productTagListPage="productTagListPage",e.productHomePage="productHomePage",e.registerChannelPage="registerChannelPage",e}(r.RouterNativeName);e.RouterNameService=a},,,,,,,,,,,function(t,e,o){"use strict";var n,r=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},a=o(2);!function(t){var e;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return r(e,t),e}(a.BaseReq);t.ZmadengReq=e}(e=t.request||(t.request={}))}(n=e.dto||(e.dto={})),e.ZmadengReq=n.request.ZmadengReq},,,,function(t,e){"use strict";var o;!function(t){var e;!function(t){var e=function(){function t(){}return t}();t.ZmadengReqBody=e}(e=t.requestBody||(t.requestBody={}))}(o=e.dto||(e.dto={})),e.ZmadengReqBody=o.requestBody.ZmadengReqBody},,,,,,,,,,,,,function(t,e,o){"use strict";var n=o(5),r=o(4),a=o(1),i=o(26),u=o(28),s=o(19),c=o(21),d=o(20),p=o(17),l=o(16),f=o(63),h=o(33),m=o(24),g=o(45),v=o(49),y=function(){function t(e){this.netRequest=e,this.items=[],this.banners=null,this.marqueeItems=null,this.templateUrl=function(){return"./home.component.html"},this.controller=t,this.controllerAs="vm",this.doGetZmadeng(),this.doGetUpgradeInfoAndAdsImages(),this.loadHomeProducts()}return t.prototype.zoumadeng=function(t){var e=document.getElementById("data-box"),o=t,n=angular.element(document.querySelector(".zmd-box-data"))[0].offsetWidth;e.style.width=o*n+"px",e.style.left=o*n+"px";var r=50;setInterval(function(){r-=2,e.style.left=r+"px",r<-o*n&&(r=50)},60)},t.prototype.Tab1=function(){this.forwardProductFeature(1)},t.prototype.Tab2=function(){this.forwardProductFeature(2)},t.prototype.Tab3=function(){this.forwardProductFeature(3)},t.prototype.Tab4=function(){this.forwardProductFeature(4)},t.prototype.Tab5=function(){this.forwardProductFeature(5)},t.prototype.Tab6=function(){this.forwardProductFeature(6)},t.prototype.Tab7=function(){this.forwardProductFeature(7)},t.prototype.Tab8=function(){this.forwardProductFeature(8)},t.prototype.clickTab1XE1=function(){this.forwardProductList(m.HomeSelectType.TAB1_XE1)},t.prototype.clickTab1XE2=function(){this.forwardProductList(m.HomeSelectType.TAB1_XE2)},t.prototype.clickTab1XE3=function(){this.forwardProductList(m.HomeSelectType.TAB1_XE3)},t.prototype.doGetUpgradeInfoAndAdsImages=function(){if(null!=this.netRequest){console.log(this.netRequest);var t=new i.AppStartUpInfoReq;t.header=this.netRequest.buildRequestHeader(),t.body=new u.AppStartUpInfoReqBody,t.body.appName="容易借",t.body.channel="MAIN_DEFAULT",t.body.platform="00";var e=this;this.netRequest.doGetUpgradeInfoAndAdsImages(t,{onFailure:function(t){},onSuccess:function(t){var o=t,n=null==o?null:o.body,r=null==n?null:n.bannerInfos;e.banners=r}})}},t.prototype.loadHomeProducts=function(){if(null!=this.netRequest){var t=this,e=new c.SelectedProdsReq;e.header=this.netRequest.buildRequestHeader(),this.netRequest.queryCashProduct(e,{onFailure:function(t){console.log("---------error:"+t.message)},onSuccess:function(e){console.log("---------success:"+angular.toJson(e));try{var o=e;if(null!=o){var n=o.header;if(r.NetRequestCode.SUCCESS===n.respCode){var a=o.body;null!=a&&null!=a.selectedProds&&(t.items=a.selectedProds,s.ProductBriefInfoUtil.secMinDay(t.items))}}}catch(i){console.log("---------parse error:"+i.message)}console.log("---------"+t.items.length)}}),this.netRequest.doGetWXOpenId(null)}},t.prototype.doGetZmadeng=function(){if(null!=this.netRequest){var t=this,e=new g.ZmadengReq;e.header=this.netRequest.buildRequestHeader();var o=new v.ZmadengReqBody;e.body=o,this.netRequest.doGetZmadeng(e,{onFailure:function(t){},onSuccess:function(e){try{var o=e;if(null!=o){var n=o.header;if(r.NetRequestCode.SUCCESS===n.respCode){var a=o.body;null!=a&&null!=a&&null!=a.msgList&&a.msgList.length>0&&(t.marqueeItems=a.msgList,t.zoumadeng(t.marqueeItems.length))}}}catch(i){console.log("---------parse error:"+i.message)}}})}},t.prototype.forwardProductFeature=function(t){var e=f.HomeFeature.getFeature(t);a.Constants.IS_NATIVE?this.withNativeForwardProductFeature(e):this.withJsForwardProductFeature(e)},t.prototype.withJsForwardProductFeature=function(t){},t.prototype.withNativeForwardProductFeature=function(t){var e=new h.JsonParam700;e.tag=t,p.JsonNativeSender.callNative(l.JsonCmdId.ID_700_tag,e)},t.prototype.forwardProductDetail=function(t){a.Constants.IS_NATIVE?this.withNativeForwardProductDetail(t):this.withJsForwardProductDetail(t)},t.prototype.withNativeForwardProductDetail=function(t){var e=new d.JsonParam300;e.productId=t.productId,p.JsonNativeSender.callNative(l.JsonCmdId.ID_300_product_item_select,e)},t.prototype.withJsForwardProductDetail=function(t){},t.prototype.forwardProductList=function(t){a.Constants.IS_NATIVE?this.withNativeForwardProductList(t):this.withJsForwardProductList(t)},t.prototype.withJsForwardProductList=function(t){},t.prototype.withNativeForwardProductList=function(t){var e=new h.JsonParam700;e.tag=t,p.JsonNativeSender.callNative(l.JsonCmdId.ID_700_tag,e)},t}();e.HomeComponent=y,y.$inject=[n.EasycashServicesName.NetRequestService]},function(t,e){"use strict";var o=function(){function t(){}return t.getFeature=function(e){var o=t.FEATURE_1;return 1==e?o=t.FEATURE_1:2==e?o=t.FEATURE_2:3==e?o=t.FEATURE_3:4==e?o=t.FEATURE_4:5==e?o=t.FEATURE_5:6==e?o=t.FEATURE_6:7==e?o=t.FEATURE_7:8==e&&(o=t.FEATURE_8),o},t.FEATURE_1="19",t.FEATURE_2="12",t.FEATURE_3="6",t.FEATURE_4="2",t.FEATURE_5="09",t.FEATURE_6="02",t.FEATURE_7="1",t.FEATURE_8="18",t}();e.HomeFeature=o},function(t,e,o){"use strict";var n=o(34),r=o(62),a=o(5),i=angular.module(n.RouterNameService.productHomePage,[a.EasycashServiceModule.name,"ionic"]);e.productHomePage=i,i.component("homeComponent",new r.HomeComponent(null))}]);