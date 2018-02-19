module.exports = {
    entry: __dirname + "/src/index",
    target: "web",
    output: {
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        contentBase: __dirname + "/src"
    },
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /(\.scss)$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                loader: "file-loader"
            }
        ]
    }
};
