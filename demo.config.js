const path = require('path');

module.exports = {
    entry: './src/demo.js',
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'demo')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: [
                            'transform-runtime',
                        ],
                    }
                }
            }
        ]
    },
    plugins: []
};
