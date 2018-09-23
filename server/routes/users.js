var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getList', function(req, res, next) {
  res.json({
    status: '',
    message: '',
    data: []
  });
});
/* 修改用户信息. */
router.get('/update', function(req, res, next) {
  res.send('respond with a resource');
});
/* 删除用户 */
router.get('/delete', function(req, res, next) {
  res.send('respond with a resource');
});
/* 添加用户. */
router.get('/add', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
