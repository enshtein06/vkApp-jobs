const proxy = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    proxy("/api", {
      target: "https://vk-jobs-application.herokuapp.com/",
      changeOrigin: true,
      secure: false,
      xfwd: true
    })
  );
};
