const path = require('path');
const commonConfig = require("./webpack.common.js")
const { merge } = require('webpack-merge')

module.exports = merge(
    commonConfig,
    {
        mode: 'development',
        devServer: {
            watchFiles: ['src/**', 'assets/**']
        }
    }
)