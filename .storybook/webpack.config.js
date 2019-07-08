const path = require('path');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  config.module.rules.push({
    test: /\.less$/,
    use: ['style-loader', {
      loader: "css-loader",
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: process.env.NODE_ENV === 'development'? "[path]___[name]__[local]___[hash:base64:5]" : "[hash:base64:5]",
        sourceMap: process.env.NODE_ENV === 'development',
      }
    }, 'less-loader'],
    include: path.resolve(__dirname, '../'),
  });

  return config;
};