const path= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    mode:'development',
    entry: path.resolve(__dirname, './assets/js/src.js'),
    output: {
        path:path.resolve(__dirname, 'dist'),
        filename: 'bundle[contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer:{
        static:{
            directory: path.resolve(__dirname,'dist')
        },
        devtool:'source-map',
        port:3000,
        open:true,
        hot: true,
        compress:true,
        historyApiFallback:true,
     },
    module: {
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
                ,
            },
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env'],
                },
               },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Bookland',
            filename:'index.html',
            template: 'template.html',
        }),
        new BundleAnalyzerPlugin(),
    ],
}