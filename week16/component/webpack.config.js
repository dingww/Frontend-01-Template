const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            '@babel/plugin-transform-react-jsx', 
                            {
                                pragma: "create"
                            }
                        ]]
                    }
                },
            },
            // {
            //     test: /\.view/,
            //     use:{
            //         loader: require.resolve("./myLoader.js")
            //     }
            // }
        ]
    },
    mode: 'development',
    optimization: {
        minimize: false
    }

};