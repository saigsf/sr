var express = require('express');
var router = express.Router();
var query = require("../mysql/index");

/* GET users listing. */
router.get('/getList', function (req, res, next) {
  // console.log(req.query)
  var page = req.query.page ? req.query.page : 1
  var size = req.query.size ? req.query.size : 10
  var order = req.query.order ? req.query.order : 'uid'
  var sort = req.query.sort ? req.query.sort : 'ASC'
  var username = req.query.username ? req.query.username : ''
  var fields = ['uid', 'username', 'roles']

  var sql = ""
  var SELECT_BASE = "select " + fields.join(',') + " from users "
  var ORDER_BASE = "order by " + order + " " + sort + " " // 排序
  var LIMIT_BASE = "limit " + (page - 1) * size + "," + size + " " // 分页
  var WHERE_BASE = "WHERE username LIKE '%" + username + "%' "

  sql = SELECT_BASE + WHERE_BASE + ORDER_BASE + LIMIT_BASE

  console.log(sql)
  query(sql, (err, vals, fields) => {
    //do something  
    res.json({
      status: 0,
      message: '数据获取成功',
      data: vals
    });
  });
});
/* 修改用户信息. */
router.get('/update', function (req, res, next) {
  var username = req.query.username ? req.query.username : ''
  var roles = req.query.roles ? req.query.roles : ''
  var uid = req.query.uid ? req.query.uid : ''
  var sql = "UPDATE users SET username='" + username + "',roles='" + roles + "' WHERE uid=" + uid
  query(sql, (err, vals, fields) => {
    //do something  
    res.json({
      status: 0,
      message: '数据修改成功',
      data: []
    });
  });
});
/* 删除用户 */
router.get('/deleteById', function (req, res, next) {
  var uid = req.query.uid
  var sql = "delete from users where uid in (" + uid + ")"
  query(sql, (err, vals, fields) => {
    //do something  
    res.json({
      status: 0,
      message: '数据删除成功',
      data: vals
    });
  });
});
/* 添加用户. */
router.post('/add', function (req, res, next) {
  console.log(req.body);
  var username = req.body.username
  var roles = req.body.roles
  var sql = "INSERT INTO `users` (`username`, `password`, `roles`) VALUES ('" + username + "', '123456', '" + roles + "')"
  query(sql, (err, vals, fields) => {
    //do something  
    res.json({
      status: 0,
      message: '数据添加成功',
      data: vals
    });
  });
});

module.exports = router;