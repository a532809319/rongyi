/// <reference path="./../../typings/index.d.ts" />

import {dto as netdto} from "./../dto/request/ProductsReq";
import {ReqHeader, RespHeader} from "./../dto/base/Base";
import {LoginReq} from "./../dto/request/LoginReq";
import {RegistrationReq} from "./../dto/request/RegistrationReq";
import {PasswdResetReq} from "./../dto/request/PasswdResetReq";
import {SmsVcReq} from "./../dto/request/SmsVcReq";
import {BasicSearchReq} from "../dto/request/BasicSearchReq";
import {WechatOpenIdReq} from "../dto/request/WechatOpenIdReq";
import {WechatOpenIdResp} from "../dto/response/WechatOpenIdResp";
import {CommonUtil} from "../models/common.util";
import {OrderReq} from "../dto/request/OrderReq";
import {IntentCookies} from "../models/intent.cookies";
import * as ECConstants from "./../models/constants";
import {SelectedProdsReq} from "./../dto/request/ProductsReq" ;
import {ZmadengReq} from "./../dto/request/ZmadengReq" ;
export namespace easycash {

    export namespace network {


        const HOST: string = ECConstants.Constants.HOST;

        export interface NetRequestCallback {
            onSuccess(json: any);
            onFailure(e: any);
        }
        export class NetRequestCode {
            static SUCCESS: string = "0000";
        }

        export interface INQCashProduct {
            queryCashProduct(req: netdto.request.SelectedProdsReq, callback: NetRequestCallback): void;
        }
        export interface INQAnticashProduct {
            queryAnticashProduct(req: netdto.request.SelectedProdsReq, callback: NetRequestCallback): void;
        }
        export interface INQRecommandProduct {
            queryRecommandProduct(req: netdto.request.RecommendedProdsReq, callback: NetRequestCallback): void;
        }

        export interface INQProductDetails {
            queryProductDetails(req: netdto.request.ProductInfoIReq, productId: String, callback: NetRequestCallback): void;
        }
        export interface INQLogin {
            doLogin(req: LoginReq, callback: NetRequestCallback): void;
        }
        export interface INQRegist {
            doRegist(req: RegistrationReq, callback: NetRequestCallback): void;
        }
        export interface INQPasswordFind {
            doPasswordFind(req: PasswdResetReq, callback: NetRequestCallback): void;
        }
        export interface INQVerfiyCode {
            doRequestVerfiyCode(req: SmsVcReq, mobno: string, callback: NetRequestCallback): void;
        }

        export interface INQWeixinAuthorizon {
            doWeixinAuthorizon(code: string, callback: NetRequestCallback): void;
        }

        export interface INQWeixinOpenId {
            doGetWXOpenId(callback: NetRequestCallback): void;
        }

        export interface INQSearchProduct {
            doSearch(req: BasicSearchReq, callback: NetRequestCallback): void;
        }
        export interface INQProductOrder {
            doOrderCreate(req: OrderReq, userId: string, productId: string, callback: NetRequestCallback): void;
        }

        export class NetRequest implements INQWeixinAuthorizon,INQWeixinOpenId,
            INQCashProduct, INQAnticashProduct, INQProductDetails,
            INQRecommandProduct,INQSearchProduct,
            INQLogin, INQRegist, INQVerfiyCode, INQPasswordFind,
            INQProductOrder {

            static count: number = 0;


            constructor(private $http: angular.IHttpService) {
                NetRequest.count = NetRequest.count + 1;
                console.log("NetRequest is created ,实例个数:" + NetRequest.count);

            }

            private getHttpConfiguration(urlPath: String): angular.IRequestConfig {
                var config: angular.IRequestConfig = {
                    method: 'jsonp',
                    url: HOST + urlPath + "?callback=JSON_CALLBACK",
                    headers: {}
                };

                if (CommonUtil.isWeixinBrowser()) {
                    var ic = IntentCookies.readCookies();
                    if (ic.wxid) {
                        config.headers["X-WeChat-OpenId"] = ic.wxid;
                    }
                }
                return config;
            }

            private postHttpConfiguration(urlPath: String): angular.IRequestConfig {
                var config: angular.IRequestConfig = {
                    method: "post",
                    url: HOST + urlPath,
                    headers: {}
                };

                if (CommonUtil.isWeixinBrowser()) {
                    var ic = IntentCookies.readCookies();
                    if (ic.wxid) {
                        config.headers["X-WeChat-OpenId"] = ic.wxid;
                    }
                }
                return config;
            }

            buildRequestHeader(): ReqHeader {

                var reqHeader = new ReqHeader();

                reqHeader.channel = "";
                reqHeader.deviceInfo = "Wechat";
                reqHeader.deviceIp = "";
                reqHeader.inputCharset = "utf-8";
                reqHeader.requestDate = "20160905";
                reqHeader.requestTime = "115001";
                reqHeader.service = "100005";
                reqHeader.requestId = "e5806547-ed72-49a4-b7ee-f5e2d1806fea";


                return reqHeader;
            }

            private doHttpRequest(config: angular.IRequestConfig, callback: NetRequestCallback) {
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
            }

            //微信授权
            doWeixinAuthorizon(code: string, callback: NetRequestCallback) {
                var openIdUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5f52672571705506&secret=51ea7bdf86de5f283f9569b89d9662e9&code=" + code + "&grant_type=authorization_code";
                var config = {
                    url: openIdUrl,
                    method: "POST"
                };
                this.doHttpRequest(config, callback);
            }

            //精选类产品
            queryCashProduct(req: netdto.request.SelectedProdsReq, callback: NetRequestCallback) {
                const urlPath = "/api/prod/cashselected";
                console.log("------------------能调用起来吗?--");
                var json = angular.toJson(req);

                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {"param": json};
                this.doHttpRequest(config, callback);
            }

            //非精选类产品
            queryAnticashProduct(req: netdto.request.SelectedProdsReq, callback: NetRequestCallback) {
                const urlPath = "api/prod/noncashselected";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {"param": json};
                this.doHttpRequest(config, callback);
            }

            //产品推荐
            queryRecommandProduct(req: netdto.request.RecommendedProdsReq, callback: NetRequestCallback) {
                const urlPath = "/api/prod/recommended";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {"param": json};
                this.doHttpRequest(config, callback);
            }

            //产品详情
            queryProductDetails(req: netdto.request.ProductInfoIReq, productId: String, callback: NetRequestCallback) {
                const urlPath = "/api/prod/detail/" + productId;
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {"param": json};
                this.doHttpRequest(config, callback);
            }

            //用户登录
            doLogin(req: LoginReq, callback: NetRequestCallback) {
                const urlPath = "/api/login";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.postHttpConfiguration(urlPath);
                config.params = {
                    "username": req.body.mobNo,
                    "password": req.body.userPasswd,
                    "code": CommonUtil.parseWeixinAuthcode()
                };

                config.data = json;

                this.doHttpRequest(config, callback);
            }

            //用户注册
            doRegist(req: RegistrationReq, callback: NetRequestCallback) {
                const urlPath = "/auth/user";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.postHttpConfiguration(urlPath);

                config.data = json;
                config.params = {
                    "code": CommonUtil.parseWeixinAuthcode()
                };

                this.doHttpRequest(config, callback);

            }

            //用户密码找回
            doPasswordFind(req: PasswdResetReq, callback: NetRequestCallback) {
                const urlPath = "/auth/m/" + req.body.mobNo + "/password";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.postHttpConfiguration(urlPath);

                config.data = json;
                this.doHttpRequest(config, callback);

            }

            //短信验证码获取
            doRequestVerfiyCode(req: SmsVcReq, mobno: string, callback: NetRequestCallback) {
                const urlPath = "/api/sms/vc/" + mobno;
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.postHttpConfiguration(urlPath);
                config.data = json;
                this.doHttpRequest(config, callback);
            }


            //产品按照条件搜索
            doSearch(req: BasicSearchReq, callback: NetRequestCallback): void {
                // const urlPath="/api/prod/search";
                const urlPath = "/api/prod/searchby";
                var json = angular.toJson(req);
                console.log("------easycash,req-------");
                console.log(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "param": json
                };
                this.doHttpRequest(config, callback);
            }

            //搜索页面，按照产品类型筛选产品
            doSearchType(req: BasicSearchReq, callback: NetRequestCallback): void {
                const urlPath = "/api/prod/type";
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "param": json
                };
                this.doHttpRequest(config, callback);
            }

            doOrderCreate(req: OrderReq, userId: string, productId: string, callback: NetRequestCallback): void {
                const urlPath = "/api/order/" + userId + "/" + productId;
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.postHttpConfiguration(urlPath);
                config.data = json;

                this.doHttpRequest(config, callback);
            }

            doGetWXOpenId(callback: NetRequestCallback): void {
                var wxAuthCode = CommonUtil.parseWeixinAuthcode();

                if (wxAuthCode == null) {
                    return;
                }
                var req: WechatOpenIdReq = new WechatOpenIdReq();
                req.header = this.buildRequestHeader();

                const urlPath = "/auth/wechat/openid/" + wxAuthCode;
                var json = angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "params": json
                };

                this.doHttpRequest(config, {
                    onFailure(e){
                        if (callback != null) {
                            callback.onFailure(e);
                        }
                    },
                    onSuccess(json){
                        if (json) {
                            var resp: WechatOpenIdResp = json;
                            var respHeader = resp.header;
                            console.log("---获取WXOpenId " + angular.toJson(resp));
                            if (easycash.network.NetRequestCode.SUCCESS === respHeader.respCode) {
                                var body = resp.body;
                                //保存微信WXOPENID
                                var wxopenid = CommonUtil.parseWXOpenId(body.wechatOpenid);
                                if (wxopenid) {
                                    var ic = IntentCookies.readCookies();
                                    ic.wxid = body.wechatOpenid;
                                    IntentCookies.writeCookies(ic);
                                }

                                console.log("成功获取WXOpenId为 " + body.wechatOpenid);
                            }
                        }

                        if (callback != null) {
                            callback.onSuccess(json);
                        }
                    }
                });
            }

            doGetProductsByTag(tagId: string, req: SelectedProdsReq, callback: NetRequestCallback) {
                const urlPath="/api/prod/tag/"+tagId;
                var json=angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "param":json
                };
                this.doHttpRequest(config,callback);
            }

            //版本更新信息和轮播图
            doGetUpgradeInfoAndAdsImages(req:AppStartUpInfoReq ,callback:NetRequestCallback){

                const urlPath="/api/app/startup";
                var json=angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "param":json
                };
                this.doHttpRequest(config,callback);

            }
            doGetZmadeng(req:ZmadengReq ,callback:NetRequestCallback){
                const urlPath="/api/bulletin/top";

                var json=angular.toJson(req);
                var config: angular.IRequestConfig = this.getHttpConfiguration(urlPath);
                config.params = {
                    "param":json
                };
                this.doHttpRequest(config,callback);
            }
        }
    }
}

export import NetRequestCallback = easycash.network.NetRequestCallback;
export import NetRequest = easycash.network.NetRequest;
export import NetRequestCode = easycash.network.NetRequestCode;

export import INQAnticashProduct = easycash.network.INQAnticashProduct;
export import INQCashProduct = easycash.network.INQCashProduct;
export import INQLogin = easycash.network.INQLogin;
export import INQPasswordFind = easycash.network.INQPasswordFind;
export import INQProductDetails = easycash.network.INQProductDetails;
export import INQRecommandProduct = easycash.network.INQRecommandProduct;
export import INQRegist = easycash.network.INQRegist;
export import INQVerfiyCode = easycash.network.INQVerfiyCode;
export import INQWeixinAuthorizon=easycash.network.INQWeixinAuthorizon;
export import INQSearchProduct=easycash.network.INQSearchProduct;
export import INQWeixinOpenId=easycash.network.INQWeixinOpenId;
import {AppStartUpInfoReq} from "../dto/request/AppStartUpInfoReq";







