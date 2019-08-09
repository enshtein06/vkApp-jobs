const proxy = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:5001/",
      changeOrigin: true,
      secure: false,
      xfwd: true
    })
  );
};
