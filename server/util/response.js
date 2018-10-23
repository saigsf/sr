var response = {}

var success = function (res, msg, data) {
  return res.json({
    code: 1,
    data: data,
    msg: msg
  })
}

var error = function (res, msg, error) {
  return res.json({
    code: 0,
    error: error,
    msg: msg
  })
}

response = {
  success,
  error
}
module.exports = response
