module.exports = {
    ...
    module: {
    rules: [
          
    // other loaders
    ...
    {
    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [{
    loader: 'file-loader',
    options: {
    name: '[name].[ext]',
    outputPath: 'fonts/', // where the fonts will go
    publicPath: '../' // override the default path
    }
    }]
    },
    ] // -rules
    } // -module
   } // -module.exports