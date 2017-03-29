var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: {

        HelloTest: ['./app/hello/hello.module.ts'],
        FirstModule: ['./app/modulefirst/first.module.ts'],

        ProductModule: ['./app/moduleproduct/product.module.ts'],

        LoginRegistModule: ['./app/moduleloginregist/loginregist.module.ts'],

        PersonCenterModule: ['./app/modulepersonal/person.center.module.ts'],

        HomeSearchModule: ['./app/modulehome/search/home.search.module.ts'],

        ProductCompleteInforModule: ['./app/moduleproduct/product.completeinfor.module.ts'],

        CreditLoanModule: ['./app/modulecreditloan/creditloan.module.ts'],
        ZhuceModule: ['./app/moduleregisterchannel/zhuce.module.ts'],
    },

    output: {
        filename: "./www/js/[name].bundle.js"
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