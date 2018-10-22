var express = require('express');
var router = express.Router();
var query = require("../mysql/index");

/* GET carmaker listing. */
router.get('/pageQuery', function (req, res, next) {
  // console.log(req.query)
  var page = req.query.page ? req.query.page : 1
  var size = req.query.size ? req.query.size : 10
  var order = req.query.order ? req.query.order : 'id'
  var sort = req.query.sort ? req.query.sort : 'ASC'
  var name = req.query.name ? req.query.name : ''
  const fields = ['id', 'name', 'remark', 'operator', 'operatorIp', 'createTime', 'updateTime']
  const where = ["status LIKE '%" + 1 + "%'"]

  var sql = ""
  var SELECT_BASE = "select " + fields.join(',') + " from carmaker "
  var ORDER_BASE = "order by " + order + " " + sort + " " // 排序
  var LIMIT_BASE = "limit " + (page - 1) * size + "," + size + " " // 分页
  var WHERE_BASE = "WHERE " + where.join(' and ') + " "

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

/* add carmaker */
router.post('/save', function (req, res, next) {
  console.log(req.body)
  var name = req.body.name ? req.body.name : ''
  var remark = req.body.remark ? req.body.remark : ''
  const fields = ['name', 'remark', 'operator', 'operatorIp', 'status', 'createTime', 'updateTime']
  var INSERT_BASE = "insert into carmaker(" + fields.join(",") + ") values(value1,value2)"
  res.json({
    status: 0,
    message: '数据获取成功',
    data: []
  });

})

module.exports = router;