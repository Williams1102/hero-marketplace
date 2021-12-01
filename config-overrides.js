function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = function override(config, env) {
  config.output = {
    ...config.output, // copy all settings
    filename: "static/js/" + makeid(6) + ".[hash:6].[name].js",
    chunkFilename: "static/js/" + makeid(6) + ".[hash:6].[name].chunk.js",
  };

  //CSS Overrides
  config.plugins[5].options.filename =
    "static/css/" + makeid(6) + ".[hash:6].[name].css";
  config.plugins[5].options.chunkFilename =
    "static/css/" + makeid(6) + ".[hash:6].[name].css";

  //Media and Assets Overrides
  config.module.rules[1].oneOf[0].options.name =
    "static/media/" + makeid(6) + ".[hash:6].[name].[ext]";
  config.module.rules[1].oneOf[1].options.name =
    "static/media/" + makeid(6) + ".[hash:6].[name].[ext]";
  config.module.rules[1].oneOf[8].options.name =
    "static/media/" + makeid(6) + ".[hash:6].[name].[ext]";

  return config;
};
