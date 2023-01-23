const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://nutrition-api.esha.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "/" },
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.VUE_APP_API_KEY,
          Accept: "application/json",
        },
      },
    },
  },
});
