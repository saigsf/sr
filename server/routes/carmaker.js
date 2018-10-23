var express = require('express');
var router = express.Router();
var mysql = require('../mysql/index');
var util = require('../util/index')
var response = require('../util/response')

/* GET carmaker listing. */
router.get('/pageQuery', function (req, res, next) {
  console.log(req.headers.host)
  var page = req.query.page ? req.query.page : 1
  var size = req.query.size ? req.query.size : 10
  var order = req.query.order ? req.query.order : 'id'
  var sort = req.query.sort ? req.query.sort : 'ASC'
  var name = req.query.name ? req.query.name : ''
  const fields = ['id', 'name', 'remark', 'operator', 'operatorIp', 'createTime', 'updateTime']
  const where = ["status LIKE '%" + 1 + "%'"]


  var SELECT_BASE = "select " + fields.join(',') + " from carmaker "
  var ORDER_BASE = "order by " + order + " " + sort + " " // 排序
  var LIMIT_BASE = "limit " + (page - 1) * size + "," + size + " " // 分页
  var WHERE_BASE = "WHERE " + where.join(' and ') + " "
  var sql = SELECT_BASE + WHERE_BASE + ORDER_BASE + LIMIT_BASE

  var total = 0

  mysql.count('carmaker', (err, vals, fields) => {
    total = vals
  })
  mysql.query(sql, (err, vals, fields) => {
    //do something  
    var data = {
      list: vals,
      total: total
    }
    response.success(res, '数据获取成功', data)
  });
});

/* add carmaker */
router.post('/save', function (req, res, next) {
  var name = req.body.name ? req.body.name : ''
  var remark = req.body.remark ? req.body.remark : ''
  var operator = 'admin'
  var operatorIp = '127.0.0.1'
  var status = 1
  var createTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
  var updateTime = util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
  const fields = ['name', 'remark', 'operator', 'operatorIp', 'status', 'createTime', 'updateTime']
  var sql = "insert into carmaker(" + fields.join(",") + ") values('"+name+"','"+remark+"','"+operator+"','"+operatorIp+"','"+status+"','"+createTime+"','"+updateTime+"')"
  
  mysql.query(sql, (err, vals, fields) => {
    //do something  
    if (err) { 
      response.error(res, '添加车企失败', err)
    } else if (vals) {
      response.success(res, '添加车企成功', vals)
    }
  });
})

/* update carmaker */
router.post('/update', function (req, res, next) {
  var reqData = {
    id: req.body.id ? req.body.id : '',
    name: req.body.name ? req.body.name : '',
    remark: req.body.remark ? req.body.remark : '',
    operator: 'admin',
    operatorIp: '127.0.0.1',
    updateTime: util.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())
  }
  var fields = ['name', 'remark', 'operator', 'operatorIp', 'updateTime']

  fields.forEach((item, i, arr) => {
    arr[i] = item + "='" + reqData[item] + "'"
  });
  
  // id 不能为空 通过id查询数据库
  if (reqData.id == '') {
    response.error(res, 'id不能为空', 'id=null')
  }

  var WHERE_BASE = "where id=" + reqData.id + " and " + "status=1"
  var SELECT_BASE = "select id from carmaker "
  var UPDATE_BACE = "update carmaker "
  var SET_BASE = "set " + fields.join(',') + " "
  var sql = SELECT_BASE + WHERE_BASE

  mysql.query(sql, (err, vals, fields) => {
    //do something  
    if (err) { 
      response.error(res, '查询失败', err)
    } else if (vals) {
      if (vals.length == 0) {
        response.error(res, '数据不存在', vals)
      } else {
        sql = UPDATE_BACE + SET_BASE + WHERE_BASE
        mysql.query(sql, (err, vals, fields) => {
          if (err) {
            response.error(res, '更新失败', err)
          } else if (vals) {
            response.success(res, '更新成功', vals)
          }
        })
      }
    }
  });
})

/* delete carmaker */
router.post('/delete', function (req, res, next) {
  var ids = req.body.ids ? req.body.ids : ''
  var idArr = ids.split(',')
  var sql = ''
  // console.log(idArr)
  idArr.forEach(id => {
    var flag = false
    sql = "select id from carmaker where id=" + id + " and " + "status=1"
    mysql.query(sql, (err, vals, fields) => {
      if (err) {
        response.error(res, '删除失败', err)
      } else if (vals) {
        if (vals.length == 0) {
          response.error(res, 'id不存在', vals)
        } else {
          sql = "update carmaker set status=0 where id=" + id
          mysql.query(sql, (err, vals, fields) => {
            if (err) {
              response.error(res, '删除失败', err)
            } else if (vals) {
              response.success(res, '删除成功', vals)
            }
          })
        }
      }
    })
  });
})

module.exports = router;
