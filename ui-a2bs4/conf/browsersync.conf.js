const conf = require('./gulp.conf');

var proxyMiddleware = require('http-proxy-middleware');
var proxyURL = 'http://localhost:8080';

var api = proxyMiddleware('/api', {target: proxyURL});
var auth = proxyMiddleware('/auth', {target: proxyURL});
var authenticate = proxyMiddleware('/signin/authenticate', {target: proxyURL});
var signOut = proxyMiddleware('/signout', {target: proxyURL});
var liveFeed = proxyMiddleware('/livefeed', {target: proxyURL, ws: true});
module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [api, auth, authenticate, signOut, liveFeed]
    },
    open: false
  };
};
