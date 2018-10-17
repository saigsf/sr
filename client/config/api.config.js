const isPro = Object.is(process.env.NODE_ENV === 'production')

module.exports = {
  baseURl: isPro ? 'http://192.168.0.101:8080' : ''
}
