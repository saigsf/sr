const isDev = Object.is(process.env.NODE_ENV, 'development')
// console.log(isDev)
// development---开发模式192.168.0.222:8080
// production---生产模式222.91.98.78:9998
module.exports = {
  baseURl: (isDev ? 'http://222.91.98.78:9998/shengruiweb' : 'http://127.0.0.1:9998/shengruiweb')
}
