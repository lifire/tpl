const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const config = {
    mode: 'development', // production 生产环境, development 开发环境
    entry: {
        index: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    // 'presets': ['latest']
                    'presets': ['@babel/preset-env']
                },
                // options: {
                //     'presets': ['@babel/preset-env']
                // }
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs-loader'
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: 'html-loader',
            //             options: {
            //                 interpolate: 'require'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            publicPath: '../'
                        }
                    },
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugin: function () {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                // loader: [
                //     'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                //     'image-webpack-loader'
                // ]
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50*1024,
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new uglify(), // 压缩文件

        new htmlWebpackPlugin({
            minify: { //页面压缩
                removeComments: true, //移除注释
                collapseInlineTagWhitespace: true //去除页面里的空格
            },
            filename: 'index.html', //生成文件名称
            template: path.resolve(__dirname, 'src/index.html'), //模板目录
            title: 'lifire',
            chunksSortMode: 'manual',
            chunks: ['index'], // 决定页面里引入哪个js文件，不写的话默认全部引入
            excludeChunks: ['node-modules'],
            hash: true,
            // inject: 'head', //值为true或'body'的时候script标签在body底部，值为'head'的时候script标签在head里
        }),

        new miniCssExtractPlugin({
            filename: 'css/[name].css'
        }),

        // new webpack.HotModuleReplacementPlugin(), //开启热更新

        new webpack.ProvidePlugin({ //引入第三方库
            $: 'jquery'
        })
    ],

    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        host: 'localhost',
        port: 3200,
        // open: true,
        // host: true
    }
}

module.exports = config