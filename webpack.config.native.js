var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: {
       ProductSearchPage:['./app/nativepage/product.search.page.ts'],
       ProductDetailPage:['./app/nativepage/product.detail.page.ts'],
       ProductListPage:['./app/nativepage/product.list.page.ts'],
       ProductRecommandPage:["./app/nativepage/product.recommand.page.ts"],
       ProductTagPage:["./app/nativepage/product.tag.page.ts"],
       ProductLowerAmountPage:["./app/nativepage/product.loweramount.page.ts"],
       PersonCenterPage:['./app/nativepage/person.center.page.ts'],
       LoginPage:['./app/nativepage/login.page.ts'],
       RegisterPage:['./app/nativepage/register.page.ts'],
       ProductHomePage:['./app/modulehomev3/module.home.ts'],
    },

    output: {
        filename: "./www/native/js/[name].bundle.js"
    },

    module: {
        loaders: [
            { test: /.ts(x?)$/, loader: 'ts-loader?configFileName=tsconfig.json' },
            { test: /\.html$/, loader: "html-loader?minimize=false" }
        ]
    },
    resolve: {
        extensions: ['', '.js', ".ts", '.html']
    },
    plugins: [


        new HtmlWebpackPlugin({
            filename: './www/html/hello.tester.html',
            template: __dirname + '/app/hello/hello.tester.html',
            inject: false,
        }),

    ]
};
