const isDev = Object.is(process.env.NODE_ENV, 'development')
// console.log(isDev)
// development---开发模式
// production---生产模式
module.exports = {
  baseURl: (isDev ? 'http://192.168.0.222:8080/shengruiweb' : 'http://192.168.0.222:8080/shengruiweb')
}
