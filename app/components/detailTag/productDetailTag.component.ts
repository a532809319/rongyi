

class ProductDetailTagComponent implements angular.IComponentOptions{
    
    tagValue:string;
    tagType:string;
    controller=ProductDetailTagComponent;
    controllerAs = "vm"; 
    
    // template = function(){
    //     return '<p class="padding-left padding-top">' +
    //             '<img ng-src="{{vm.getImageUrl()}}" class="productdetail-tagimg">' +
    //             '<span class="productdetail-tagtext">{{vm.tagValue}}</span>'+
    //             '</p>' ;
    // };
    
    templateUrl = function(){
        return "./components/detailTag/productDetailTag.html";
    };

    bindings: {[binding: string]: string; } = { 
        tagValue: "@",
        tagDesc: "@",
        tagType: "@"
    }; 
    

    postLink = function(element,attrs){ 
        console.log("hello boy!");
        
    };
    constructor(){
        console.log("创建ProductDetailTagComponent ");
     
    };

    getIsDesc(){
        var typ = this.tagType;
        return (typ === "true") ? true : false;
    }

  getImageUrl(){
        var value=this.tagValue;
        var imgurl:string="";
        
        if(value == "年龄"){
                imgurl = "nianji.png"
            }
            else if(value == "实名认证"){
                imgurl = "shiming.png"
            }
            else if(value == "手机运营商"){
                imgurl = "yunyingshang.png"
            }
            else if(value == "芝麻信用"){
                imgurl = "zhima.png"
            }
            else if(value == "工作信息"){
                imgurl = "gongzuo.png"
            }
            else if(value == "基本信息"){
                imgurl = "jiben.png"
            }
            else if(value == "信用卡验证"){
                imgurl = "xinyongka.png"
            }
            else if(value == "央行征信验证"){
                imgurl = "zhengxin.png"
            }
            else if(value == "电商账号验证"){
                imgurl = "dianshang.png"
            }
            else if(value == "支持提前还款"){
                imgurl = "huankuan.png"
            }
            else{
                imgurl = "gongzuo.png"
            }
        return "./../img/detail/"+imgurl;
    }

}

export {ProductDetailTagComponent};