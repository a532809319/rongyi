/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var easycash_network_1 = __webpack_require__(4);
	var easycash_routerparam_1 = __webpack_require__(10);
	var breakline_filter_1 = __webpack_require__(11);
	var number_dot_filter_1 = __webpack_require__(12);
	var app_status_service_1 = __webpack_require__(13);
	var EasycashServicesName;
	(function (EasycashServicesName) {
	    EasycashServicesName.NetRequestService = "NetRequestService";
	    EasycashServicesName.RouterParamService = "RouterParamService";
	    EasycashServicesName.BreaklineFilter = "BreaklineFilter";
	    EasycashServicesName.NumberDotFilter = "NumberDotFilter";
	    EasycashServicesName.StarRateFilter = "StarRateService";
	    EasycashServicesName.AppStatusService = "AppStatusService";
	})(EasycashServicesName = exports.EasycashServicesName || (exports.EasycashServicesName = {}));
	var EasycashServiceModule = angular.module("easycashServiceModule", ['ionic'])
	    .factory(EasycashServicesName.NetRequestService, ['$http', function ($http) {
	        return new easycash_network_1.NetRequest($http);
	    }])
	    .factory(EasycashServicesName.RouterParamService, function () {
	    return new easycash_routerparam_1.RouterParamService();
	})
	    .factory(EasycashServicesName.AppStatusService, function () {
	    return new app_status_service_1.AppStatusService();
	})
	    .filter(EasycashServicesName.BreaklineFilter, function () {
	    return breakline_filter_1.BreaklineFilter;
	})
	    .filter(EasycashServicesName.NumberDotFilter, function () {
	    return new number_dot_filter_1.NumberDotFilter().getProductFee;
	});
	exports.EasycashServiceModule = EasycashServiceModule;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./../../typings/index.d.ts" />
	"use strict";
	var Base_1 = __webpack_require__(5);
	var WechatOpenIdReq_1 = __webpack_require__(6);
	var common_util_1 = __webpack_require__(7);
	var intent_cookies_1 = __webpack_require__(9);
	var ECConstants = __webpack_require__(8);
	var easycash;
	(function (easycash) {
	    var network;
	    (function (network) {
	        var HOST = ECConstants.Constants.HOST;
	        var NetRequestCode = (function () {
	            function NetRequestCode() {
	            }
	            NetRequestCode.SUCCESS = "0000";
	            return NetRequestCode;
	        }());
	        network.NetRequestCode = NetRequestCode;
	        var NetRequest = (function () {
	            function NetRequest($http) {
	                this.$http = $http;
	                NetRequest.count = NetRequest.count + 1;
	                console.log("NetRequest is created ,实例个数:" + NetRequest.count);
	            }
	            NetRequest.prototype.getHttpConfiguration = function (urlPath) {
	                var config = {
	                    method: 'jsonp',
	                    url: HOST + urlPath + "?callback=JSON_CALLBACK",
	                    headers: {}
	                };
	                if (common_util_1.CommonUtil.isWeixinBrowser()) {
	                    var ic = intent_cookies_1.IntentCookies.readCookies();
	                    if (ic.wxid) {
	                        config.headers["X-WeChat-OpenId"] = ic.wxid;
	                    }
	                }
	                return config;
	            };
	            NetRequest.prototype.postHttpConfiguration = function (urlPath) {
	                var config = {
	                    method: "post",
	                    url: HOST + urlPath,
	                    headers: {}
	                };
	                if (common_util_1.CommonUtil.isWeixinBrowser()) {
	                    var ic = intent_cookies_1.IntentCookies.readCookies();
	                    if (ic.wxid) {
	                        config.headers["X-WeChat-OpenId"] = ic.wxid;
	                    }
	                }
	                return config;
	            };
	            NetRequest.prototype.buildRequestHeader = function () {
	                var reqHeader = new Base_1.ReqHeader();
	                reqHeader.channel = "2";
	                reqHeader.deviceInfo = "Wechat";
	                reqHeader.deviceIp = "";
	                reqHeader.inputCharset = "utf-8";
	                reqHeader.requestDate = "20160905";
	                reqHeader.requestTime = "115001";
	                reqHeader.service = "100005";
	                reqHeader.requestId = "e5806547-ed72-49a4-b7ee-f5e2d1806fea";
	                return reqHeader;
	            };
	            NetRequest.prototype.doHttpRequest = function (config, callback) {
	                this.$http(config)
	                    .success(function (data, status, headers, config) {
	                    if (callback != null) {
	                        callback.onSuccess(data);
	                    }
	                })
	                    .error(function (data, status, headers, config) {
	                    if (callback != null) {
	                        callback.onFailure(status);
	                    }
	                });
	            };
	            //微信授权
	            NetRequest.prototype.doWeixinAuthorizon = function (code, callback) {
	                var openIdUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5f52672571705506&secret=51ea7bdf86de5f283f9569b89d9662e9&code=" + code + "&grant_type=authorization_code";
	                var config = {
	                    url: openIdUrl,
	                    method: "POST"
	                };
	                this.doHttpRequest(config, callback);
	            };
	            //精选类产品
	            NetRequest.prototype.queryCashProduct = function (req, callback) {
	                var urlPath = "/api/prod/cashselected";
	                console.log("------------------能调用起来吗?--");
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = { "param": json };
	                this.doHttpRequest(config, callback);
	            };
	            //非精选类产品
	            NetRequest.prototype.queryAnticashProduct = function (req, callback) {
	                var urlPath = "api/prod/noncashselected";
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = { "param": json };
	                this.doHttpRequest(config, callback);
	            };
	            //产品推荐
	            NetRequest.prototype.queryRecommandProduct = function (req, callback) {
	                var urlPath = "/api/prod/recommended";
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = { "param": json };
	                this.doHttpRequest(config, callback);
	            };
	            //产品详情
	            NetRequest.prototype.queryProductDetails = function (req, productId, callback) {
	                var urlPath = "/api/prod/detail/" + productId;
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = { "param": json };
	                this.doHttpRequest(config, callback);
	            };
	            //用户登录
	            NetRequest.prototype.doLogin = function (req, callback) {
	                var urlPath = "/api/login";
	                var json = angular.toJson(req);
	                var config = this.postHttpConfiguration(urlPath);
	                config.params = {
	                    "username": req.body.mobNo,
	                    "password": req.body.userPasswd,
	                    "code": common_util_1.CommonUtil.parseWeixinAuthcode()
	                };
	                config.data = json;
	                this.doHttpRequest(config, callback);
	            };
	            //用户注册
	            NetRequest.prototype.doRegist = function (req, callback) {
	                var urlPath = "/auth/user";
	                var json = angular.toJson(req);
	                var config = this.postHttpConfiguration(urlPath);
	                config.data = json;
	                config.params = {
	                    "code": common_util_1.CommonUtil.parseWeixinAuthcode()
	                };
	                this.doHttpRequest(config, callback);
	            };
	            //用户密码找回
	            NetRequest.prototype.doPasswordFind = function (req, callback) {
	                var urlPath = "/auth/m/" + req.body.mobNo + "/password";
	                var json = angular.toJson(req);
	                var config = this.postHttpConfiguration(urlPath);
	                config.data = json;
	                this.doHttpRequest(config, callback);
	            };
	            //短信验证码获取
	            NetRequest.prototype.doRequestVerfiyCode = function (req, mobno, callback) {
	                var urlPath = "/api/sms/vc/" + mobno;
	                var json = angular.toJson(req);
	                var config = this.postHttpConfiguration(urlPath);
	                config.data = json;
	                this.doHttpRequest(config, callback);
	            };
	            //产品按照条件搜索
	            NetRequest.prototype.doSearch = function (req, callback) {
	                var urlPath = "/api/prod/search";
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = {
	                    "param": json
	                };
	                this.doHttpRequest(config, callback);
	            };
	            NetRequest.prototype.doOrderCreate = function (req, userId, productId, callback) {
	                var urlPath = "/api/order/" + userId + "/" + productId;
	                var json = angular.toJson(req);
	                var config = this.postHttpConfiguration(urlPath);
	                config.data = json;
	                this.doHttpRequest(config, callback);
	            };
	            NetRequest.prototype.doGetWXOpenId = function (callback) {
	                var wxAuthCode = common_util_1.CommonUtil.parseWeixinAuthcode();
	                if (wxAuthCode == null) {
	                    return;
	                }
	                var req = new WechatOpenIdReq_1.WechatOpenIdReq();
	                req.header = this.buildRequestHeader();
	                var urlPath = "/auth/wechat/openid/" + wxAuthCode;
	                var json = angular.toJson(req);
	                var config = this.getHttpConfiguration(urlPath);
	                config.params = {
	                    "params": json
	                };
	                this.doHttpRequest(config, {
	                    onFailure: function (e) {
	                        if (callback != null) {
	                            callback.onFailure(e);
	                        }
	                    },
	                    onSuccess: function (json) {
	                        if (json) {
	                            var resp = json;
	                            var respHeader = resp.header;
	                            console.log("---获取WXOpenId " + angular.toJson(resp));
	                            if (easycash.network.NetRequestCode.SUCCESS === respHeader.respCode) {
	                                var body = resp.body;
	                                //保存微信WXOPENID
	                                var wxopenid = common_util_1.CommonUtil.parseWXOpenId(body.wechatOpenid);
	                                if (wxopenid) {
	                                    var ic = intent_cookies_1.IntentCookies.readCookies();
	                                    ic.wxid = body.wechatOpenid;
	                                    intent_cookies_1.IntentCookies.writeCookies(ic);
	                                }
	                                console.log("成功获取WXOpenId为 " + body.wechatOpenid);
	                            }
	                        }
	                        if (callback != null) {
	                            callback.onSuccess(json);
	                        }
	                    }
	                });
	            };
	            NetRequest.count = 0;
	            return NetRequest;
	        }());
	        network.NetRequest = NetRequest;
	    })(network = easycash.network || (easycash.network = {}));
	})(easycash = exports.easycash || (exports.easycash = {}));
	exports.NetRequest = easycash.network.NetRequest;
	exports.NetRequestCode = easycash.network.NetRequestCode;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var dto;
	(function (dto) {
	    var base;
	    (function (base) {
	        var BaseReq = (function () {
	            function BaseReq() {
	            }
	            return BaseReq;
	        }());
	        base.BaseReq = BaseReq;
	        var BaseResp = (function () {
	            function BaseResp() {
	            }
	            return BaseResp;
	        }());
	        base.BaseResp = BaseResp;
	        var ReqHeader = (function () {
	            function ReqHeader() {
	            }
	            return ReqHeader;
	        }());
	        base.ReqHeader = ReqHeader;
	        var RespHeader = (function () {
	            function RespHeader() {
	            }
	            return RespHeader;
	        }());
	        base.RespHeader = RespHeader;
	    })(base = dto.base || (dto.base = {}));
	})(dto = exports.dto || (exports.dto = {}));
	exports.BaseReq = dto.base.BaseReq;
	exports.BaseResp = dto.base.BaseResp;
	exports.ReqHeader = dto.base.ReqHeader;
	exports.RespHeader = dto.base.RespHeader;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Base_1 = __webpack_require__(5);
	var dto;
	(function (dto) {
	    var request;
	    (function (request) {
	        var WechatOpenIdReq = (function (_super) {
	            __extends(WechatOpenIdReq, _super);
	            function WechatOpenIdReq() {
	                _super.apply(this, arguments);
	            }
	            return WechatOpenIdReq;
	        }(Base_1.BaseReq));
	        request.WechatOpenIdReq = WechatOpenIdReq;
	    })(request = dto.request || (dto.request = {}));
	})(dto = exports.dto || (exports.dto = {}));
	exports.WechatOpenIdReq = dto.request.WechatOpenIdReq;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(8);
	/**
	 * Created by 79078_000 on 2016/9/19.
	 */
	var CommonUtil = (function () {
	    function CommonUtil() {
	    }
	    /*微信内置浏览器*/
	    CommonUtil.isWeixinBrowser = function () {
	        if (constants_1.Constants.IS_DEBUG_MODE) {
	            return true;
	        }
	        var ua = window.navigator.userAgent.toLowerCase();
	        var isWeixin = ua.indexOf('micromessenger') != -1;
	        console.log("-----isWeixin:" + isWeixin);
	        return isWeixin;
	    };
	    CommonUtil.parseWeixinAuthcode = function () {
	        if (constants_1.Constants.IS_DEBUG_MODE) {
	            return "test-wx-auth-code";
	        }
	        if (!this.isWeixinBrowser()) {
	            return null;
	        }
	        var location = window.location.search;
	        if (location && location.indexOf("&") != -1 && location.indexOf("code=") != -1) {
	            var start = location.indexOf("code=") + 5;
	            var end = location.lastIndexOf("&");
	            var code = location.substring(start, end);
	            console.log("微信AuthCode 为 " + code);
	            return code;
	        }
	        return null;
	    };
	    CommonUtil.parseWXOpenId = function (str) {
	        if (str == null || str.indexOf("errcode") > -1) {
	            return null;
	        }
	        return str;
	    };
	    return CommonUtil;
	}());
	exports.CommonUtil = CommonUtil;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var Constants;
	(function (Constants) {
	    Constants.HOST = "https://www.casheasy.cn";
	    //    export const HOST = "http://192.168.2.138:6100";
	    Constants.SORT_DESC = "DESC";
	    Constants.SORT_ASC = "ASC";
	    Constants.PAGE_SIZE = 10;
	    Constants.PAGE_INDEX = 0;
	    Constants.MSG_LOADING = "<div><p><ion-spinner icon='ios-small'></ion-spinner></p>请稍候<div>";
	    Constants.IS_DEBUG_MODE = false;
	    Constants.IS_NATIVE = false;
	})(Constants = exports.Constants || (exports.Constants = {}));


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by 79078_000 on 2016/10/8.
	 */
	exports.key_intent_product_detail = "A";
	var IntentCookies = (function () {
	    function IntentCookies() {
	        //传递的参数
	        this.param = {}; //传递的参数
	    }
	    IntentCookies.writeIntent = function (key, intent) {
	        var c = this.readCookies();
	        c.param[key] = intent;
	        this.writeCookies(c);
	    };
	    IntentCookies.readIntent = function (key) {
	        var c = this.readCookies();
	        return c.param[key];
	    };
	    IntentCookies.writeCookies = function (cookies) {
	        this.clearCookies();
	        var COOKIE_PREFEX = "CK=";
	        document.cookie = COOKIE_PREFEX + angular.toJson(cookies);
	        console.log("writeCookie---->" + document.cookie);
	    };
	    IntentCookies.readCookies = function () {
	        var cookies = null;
	        var str = document.cookie;
	        if (str && str.length >= 3) {
	            var dest = str.substring(3, str.length);
	            console.log("readCookies----->dest is " + dest);
	            if (dest != null && dest != 'null') {
	                cookies = angular.fromJson(dest);
	            }
	        }
	        console.log("readCookies----->" + str + "/" + angular.toJson(cookies));
	        if (cookies == null) {
	            return new IntentCookies();
	        }
	        return cookies;
	    };
	    IntentCookies.clearCookies = function () {
	        var keys = document.cookie.match(/[^ =;]?(?=\=)/g);
	        console.log("clearCookies------>" + angular.toJson(keys));
	        if (keys) {
	            for (var i = keys.length; i--;) {
	                if (keys[i]) {
	                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
	                }
	            }
	        }
	    };
	    return IntentCookies;
	}());
	exports.IntentCookies = IntentCookies;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var easycash;
	(function (easycash) {
	    var routerparam;
	    (function (routerparam) {
	        //路由参数服务
	        var RouterParamService = (function () {
	            function RouterParamService() {
	            }
	            return RouterParamService;
	        }());
	        routerparam.RouterParamService = RouterParamService;
	    })(routerparam = easycash.routerparam || (easycash.routerparam = {}));
	})(easycash = exports.easycash || (exports.easycash = {}));
	exports.RouterParamService = easycash.routerparam.RouterParamService;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function BreaklineFilter(str) {
	    console.log("------------BreaklineFilter ");
	    return str == null ? "" : str.replace("\r\n", "<br/>");
	}
	exports.BreaklineFilter = BreaklineFilter;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by 79078_000 on 2016/9/14.
	 */
	//数字保留几位数字的过滤器
	var NumberDotFilter = (function () {
	    function NumberDotFilter() {
	    }
	    //src : string or number 要处理的数字或数字字符串,fraction 保留的位数
	    NumberDotFilter.prototype.numberDot = function (src, fraction) {
	        var tmpsrc = null;
	        if (typeof (src) === 'string') {
	            try {
	                tmpsrc = parseFloat(src);
	            }
	            catch (e) {
	                tmpsrc = null;
	            }
	        }
	        if (typeof (src) === 'number') {
	            tmpsrc = src;
	        }
	        if (tmpsrc != null) {
	            return tmpsrc.toFixed(fraction);
	        }
	        return src;
	    };
	    NumberDotFilter.prototype.getProductFee = function (src) {
	        var tmpsrc = null;
	        if (typeof (src) === 'string') {
	            try {
	                tmpsrc = parseFloat(src);
	            }
	            catch (e) {
	                tmpsrc = null;
	            }
	        }
	        if (typeof (src) === 'number') {
	            tmpsrc = src;
	        }
	        if (tmpsrc != null) {
	            return (tmpsrc * 100).toFixed(2) + "%";
	        }
	        return src;
	    };
	    return NumberDotFilter;
	}());
	exports.NumberDotFilter = NumberDotFilter;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by 79078_000 on 2016/9/18.
	 */
	var AppStatusService = (function () {
	    function AppStatusService() {
	    }
	    return AppStatusService;
	}());
	exports.AppStatusService = AppStatusService;
	AppStatusService.$inject = [];


/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * <!-- test pass with CryptoJS v3.1.2 -->
	 * <script src="./tripledes.js"></script>
	 * <script src="./mode-ecb.js"></script>
	 *  editor:anhao.zheng
	 *  date:20160906
	*/
	var DESUtil = (function () {
	    function DESUtil() {
	    }
	    /**
	     * Encrypt message by DES in ECB mode and Pkcs7 padding scheme
	     *
	     * NOTE: DES is weak, please use 3DES(Triple DES) or AES
	     *
	     * @param  {String} message
	     * @param  {String} key
	     * @return {String} ciphertext(base64 string)
	     *
	     * @author Sun
	     * @version 2013-5-15
	     *
	     * @see <a href="https://groups.google.com/d/msg/crypto-js/I378fq3esK8/HZ2P2Xtuzk8J">des encrypion: js encrypted value does not match the java encrypted value</a>
	     * In cryptoJS you have to convert the key to hex
	     * and useit as word just like above (otherwise it will be considered as passphrase)
	     *
	     * @see <a href="http://stackoverflow.com/questions/12894722/c-sharp-and-java-des-encryption-value-are-not-identical">C# and Java DES Encryption value are not identical</a>
	     * SunJCE provider uses ECB as the default mode,
	     * and PKCS5Padding as the default padding scheme for DES.(JCA Doc)
	     * This means that in the case of the SunJCE provider,
	     *     Cipher c1 = Cipher.getInstance("DES/ECB/PKCS5Padding");
	     * and
	     *     Cipher c1 = Cipher.getInstance("DES");
	     * are equivalent statements.
	     *
	     * @see <a href="http://stackoverflow.com/questions/10193567/java-security-nosuchalgorithmexception-cannot-find-any-provider-supporting-aes">java.security.NoSuchAlgorithmException: Cannot find any provider supporting AES/ECB/PKCS7PADDING</a>
	     * I will point out that PKCS#5 and PKCS#7 actually specify exactly
	     * the same type of padding (they are the same!),
	     * but it's called #5 when used in this context. :)
	     */
	    DESUtil.encryptByDES = function (message, key) {
	        // For the key, when you pass a string,
	        // it's treated as a passphrase and used to derive an actual key and IV.
	        // Or you can pass a WordArray that represents the actual key.
	        // If you pass the actual key, you must also pass the actual IV.
	        var keyHex = CryptoJS.enc.Utf8.parse(key);
	        // console.log(CryptoJS.enc.Utf8.stringify(keyHex), CryptoJS.enc.Hex.stringify(keyHex));
	        // console.log(CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(key).toString(CryptoJS.enc.Hex)));
	        // CryptoJS use CBC as the default mode, and Pkcs7 as the default padding scheme
	        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
	            mode: CryptoJS.mode.ECB,
	            padding: CryptoJS.pad.Pkcs7
	        });
	        // decrypt encrypt result
	        // var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, {
	        //     mode: CryptoJS.mode.ECB,
	        //     padding: CryptoJS.pad.Pkcs7
	        // });
	        // console.log(decrypted.toString(CryptoJS.enc.Utf8));
	        // when mode is CryptoJS.mode.CBC (default mode), you must set iv param
	        // var iv = 'inputvec';
	        // var ivHex = CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
	        // var encrypted = CryptoJS.DES.encrypt(message, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
	        // var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
	        // console.log('encrypted.toString()  -> base64(ciphertext)  :', encrypted.toString());
	        // console.log('base64(ciphertext)    <- encrypted.toString():', encrypted.ciphertext.toString(CryptoJS.enc.Base64));
	        // console.log('ciphertext.toString() -> ciphertext hex      :', encrypted.ciphertext.toString());
	        return encrypted.toString();
	    };
	    /**
	     * Decrypt ciphertext by DES in ECB mode and Pkcs7 padding scheme
	     *
	     * @param  {String} ciphertext(base64 string)
	     * @param  {String} key
	     * @return {String} plaintext
	     *
	     * @author Sun
	     * @version 2013-5-15
	     */
	    DESUtil.decryptByDES = function (ciphertext, key) {
	        var keyHex = CryptoJS.enc.Utf8.parse(key);
	        // direct decrypt ciphertext
	        var decrypted = CryptoJS.DES.decrypt({
	            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
	        }, keyHex, {
	            mode: CryptoJS.mode.ECB,
	            padding: CryptoJS.pad.Pkcs7
	        });
	        return decrypted.toString(CryptoJS.enc.Utf8);
	    };
	    DESUtil.test = function () {
	        var message = '12345678';
	        var key = 'ABCDEF0123456789';
	        var ciphertext = DESUtil.encryptByDES(message, key);
	        // ciphertext: 8dKft9vkZ4I=
	        console.info('ciphertext:', ciphertext);
	        var plaintext = DESUtil.decryptByDES(ciphertext, key);
	        // plaintext : Message
	        console.info('plaintext :', plaintext);
	    };
	    DESUtil.getPwdKey = function (mobno) {
	        var str = mobno.substr(3, 7);
	        var pwdKey = "c" + str[0] + "a" + str[1] + "s" + str[2] + "h" + str[3];
	        //char[] str = mobno.substring(3, 7).toCharArray();
	        // String pwdKey = String.format("c%sa%ss%sh%s", str[0], str[1], str[2], str[3]);
	        return pwdKey;
	    };
	    return DESUtil;
	}());
	exports.DESUtil = DESUtil;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var ItemPwdText = (function () {
	    function ItemPwdText() {
	    }
	    ItemPwdText.ItemVisiable = {
	        type: 'text',
	        icon: '../img/xianshi.png',
	    };
	    ItemPwdText.ItemInvisiable = {
	        type: 'password',
	        icon: '../img/yinchang.png'
	    };
	    return ItemPwdText;
	}());
	exports.ItemPwdText = ItemPwdText;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	exports.DATA = "DATA";
	function IntentParamModel(param) {
	    return { DATA: param };
	}
	exports.IntentParamModel = IntentParamModel;


/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports) {

	/**
	 * Created by 79078_000 on 2016/10/10.
	 */
	"use strict";
	var RouterNativeName = (function () {
	    function RouterNativeName() {
	    }
	    RouterNativeName.newRouterUrl = function (routername) {
	        return "/" + routername;
	    };
	    RouterNativeName.loginPage = "loginPage";
	    RouterNativeName.registerPage = "registerPage";
	    RouterNativeName.personCenterPage = "personCenterPage";
	    RouterNativeName.productListPage = "productListPage";
	    RouterNativeName.productSearchPage = "productSearchPage";
	    RouterNativeName.productDetailPage = "productDetailPage";
	    return RouterNativeName;
	}());
	exports.RouterNativeName = RouterNativeName;


/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_native_name_1 = __webpack_require__(20);
	var services_module_1 = __webpack_require__(3);
	var regist_controller_1 = __webpack_require__(44);
	var intent_parammodel_1 = __webpack_require__(18);
	function registpageRoute($stateProvider, $urlRouterProvider) {
	    $stateProvider.state(router_native_name_1.RouterNativeName.registerPage, {
	        url: router_native_name_1.RouterNativeName.newRouterUrl(router_native_name_1.RouterNativeName.registerPage),
	        /*不强制IntentRegist参数*/
	        params: intent_parammodel_1.IntentParamModel(null),
	        controller: regist_controller_1.RegistController,
	        controllerAs: 'vm',
	        templateUrl: function () {
	            return "./moduleloginregist/regist.html";
	        }
	    });
	    $urlRouterProvider.otherwise(router_native_name_1.RouterNativeName.registerPage);
	}
	registpageRoute.$inject = ["$stateProvider", "$urlRouterProvider"];
	var registPageModule = angular.module(router_native_name_1.RouterNativeName.registerPage, ['ionic', services_module_1.EasycashServiceModule.name]);
	exports.registPageModule = registPageModule;
	registPageModule.config(registpageRoute);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var services_module_1 = __webpack_require__(3);
	var easycash_network_1 = __webpack_require__(4);
	var RegistrationReq_1 = __webpack_require__(45);
	var RegistrationReqBody_1 = __webpack_require__(46);
	var des_util_1 = __webpack_require__(16);
	var SmsVcReq_1 = __webpack_require__(47);
	var item_pwdtext_1 = __webpack_require__(17);
	var intent_parammodel_1 = __webpack_require__(18);
	var intent_cookies_1 = __webpack_require__(9);
	var common_util_1 = __webpack_require__(7);
	var RegistController = (function () {
	    function RegistController(netRequest, $state, $stateParams) {
	        this.netRequest = netRequest;
	        this.$state = $state;
	        this.$stateParams = $stateParams;
	        this.userPwd = "12345678";
	        this.userName = "15077830090";
	        this.checkAgreement = false;
	        this.isPwdVisiable = false;
	        this.itemPwdText = item_pwdtext_1.ItemPwdText.ItemInvisiable;
	        this.intentRegist = this.$stateParams[intent_parammodel_1.DATA];
	        console.log("------注册参数:" + (this.intentRegist == null) + angular.toJson(this.intentRegist));
	    }
	    RegistController.prototype.doRegist = function (smsbody) {
	        if (!smsbody) {
	            return;
	        }
	        if (!this.verifyCode || (smsbody.verifyCode != this.verifyCode)) {
	            return;
	        }
	        if (!this.userName) {
	            return;
	        }
	        if (!this.userPwd) {
	            return;
	        }
	        if (!this.checkAgreement) {
	            return;
	        }
	        console.log("-------------测试注册");
	        var req = new RegistrationReq_1.RegistrationReq();
	        req.header = this.netRequest.buildRequestHeader();
	        var body = new RegistrationReqBody_1.RegistrationReqBody();
	        body.mobNo = this.userName;
	        body.userPasswd = this.userPwd;
	        body.smsVcDate = smsbody.smsVcDate;
	        body.verifyCode = smsbody.verifyCode;
	        body.smsVcId = smsbody.smsVcId;
	        req.body = body;
	        var key = des_util_1.DESUtil.getPwdKey(req.body.mobNo);
	        var message = req.body.userPasswd;
	        var ciphertext = des_util_1.DESUtil.encryptByDES(message, key);
	        req.body.userPasswd = ciphertext;
	        this.netRequest.doRegist(req, {
	            onSuccess: function (json) {
	                var resp = json;
	                console.log("------------注册?" + angular.toJson(resp));
	                if (resp) {
	                    var header = resp.header;
	                    if (easycash_network_1.NetRequestCode.SUCCESS === header.respCode) {
	                        var body = resp.body;
	                        if (common_util_1.CommonUtil.isWeixinBrowser()) {
	                            var wxopenid = common_util_1.CommonUtil.parseWXOpenId(body.wechatOpenid);
	                            if (wxopenid) {
	                                var ic = intent_cookies_1.IntentCookies.readCookies();
	                                ic.wxid = body.wechatOpenid;
	                                ic.mobno = req.body.mobNo;
	                                intent_cookies_1.IntentCookies.writeCookies(ic);
	                            }
	                        }
	                    }
	                }
	            },
	            onFailure: function (e) {
	                console.log("------------注册失败" + e);
	            }
	        });
	    };
	    RegistController.prototype.doRequestVerifyCode = function () {
	        console.log("--------获取验证码中");
	        var ctrl = this;
	        var req = new SmsVcReq_1.SmsVcReq();
	        req.header = this.netRequest.buildRequestHeader();
	        var mobno = ctrl.userName;
	        this.netRequest.doRequestVerfiyCode(req, mobno, {
	            onSuccess: function (json) {
	                var resp = json;
	                if (resp) {
	                    var header = resp.header;
	                    if (easycash_network_1.NetRequestCode.SUCCESS === header.respCode) {
	                        ctrl.smsbody = resp.body;
	                        console.log("--------------短信验证码:" + angular.toJson(resp.body));
	                    }
	                }
	            },
	            onFailure: function (e) {
	            }
	        });
	    };
	    //切换 密码可见性
	    RegistController.prototype.togglePwdStatus = function () {
	        this.isPwdVisiable = !this.isPwdVisiable;
	        if (this.isPwdVisiable) {
	            this.itemPwdText = item_pwdtext_1.ItemPwdText.ItemVisiable;
	        }
	        else {
	            this.itemPwdText = item_pwdtext_1.ItemPwdText.ItemInvisiable;
	        }
	    };
	    RegistController.prototype.submitRegistInfo = function () {
	        this.doRegist(this.smsbody);
	    };
	    return RegistController;
	}());
	exports.RegistController = RegistController;
	RegistController.$inject = [services_module_1.EasycashServicesName.NetRequestService, "$state", "$stateParams"];


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Base_1 = __webpack_require__(5);
	var dto;
	(function (dto) {
	    var request;
	    (function (request) {
	        var RegistrationReq = (function (_super) {
	            __extends(RegistrationReq, _super);
	            function RegistrationReq() {
	                _super.apply(this, arguments);
	            }
	            return RegistrationReq;
	        }(Base_1.BaseReq));
	        request.RegistrationReq = RegistrationReq;
	    })(request = dto.request || (dto.request = {}));
	})(dto = exports.dto || (exports.dto = {}));
	exports.RegistrationReq = dto.request.RegistrationReq;


/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	var dto;
	(function (dto) {
	    var requestBody;
	    (function (requestBody) {
	        var RegistrationReqBody = (function () {
	            function RegistrationReqBody() {
	            }
	            return RegistrationReqBody;
	        }());
	        requestBody.RegistrationReqBody = RegistrationReqBody;
	    })(requestBody = dto.requestBody || (dto.requestBody = {}));
	})(dto = exports.dto || (exports.dto = {}));
	exports.RegistrationReqBody = dto.requestBody.RegistrationReqBody;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Base_1 = __webpack_require__(5);
	var dto;
	(function (dto) {
	    var request;
	    (function (request) {
	        var SmsVcReq = (function (_super) {
	            __extends(SmsVcReq, _super);
	            function SmsVcReq() {
	                _super.apply(this, arguments);
	            }
	            return SmsVcReq;
	        }(Base_1.BaseReq));
	        request.SmsVcReq = SmsVcReq;
	    })(request = dto.request || (dto.request = {}));
	})(dto = exports.dto || (exports.dto = {}));
	exports.SmsVcReq = dto.request.SmsVcReq;


/***/ }
/******/ ]);
