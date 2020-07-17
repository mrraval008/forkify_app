const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
        entry:'./src/js/index.js',  // from where i need to read index file
        output:{
            path:path.resolve(__dirname,'dist'),
            filename:'js/bundle.js' // where i need to pul bundled file
        },
        devServer:{
            contentBase: './dist'  // from where server should read files
        },
        plugins:[              // it will pick content from src/index.html and put it in dist/index.html
            new HtmlWebpackPlugin({
                filename:'index.html',
                template: './src/index.html'
            })
        ]
}