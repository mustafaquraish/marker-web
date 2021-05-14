const path = require("path");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '',  
  outputDir: path.resolve(__dirname, "../marker_web/gui"),
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Marker";
        return args;
      })
  }
}
