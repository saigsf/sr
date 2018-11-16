var express = require('express');
var router = express.Router();
var mysql = require('../mysql/index');
var util = require('../util/index')
var response = require('../util/response')

/* GET carmaker listing. */
router.get('/pageQuery', function (req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress
  console.log(ip)
  // 获取请求参数
  var params = req.query

  // 定义查询字段
  const fields = ['id', 'name', 'remark', 'operator', 'operatorIp', 'createTime', 'updateTime']
  // 定义查询语句
  const where = ["status LIKE '%" + 1 + "%'"]
  var table = 'carmaker'

  var total = 0

  mysql.count(table, (err, vals, fields) => {
    total = vals[0].total
  })
  mysql.pageQuery(params, table, fields, where, (err, vals, fields) => {
    //do something  
    
    if (vals) {
      var data = {
        list: vals,
        total: total
      }
      response.success(res, '数据获取成功', data)
    } else if (err) {
      response.error(res, '数据获取失败', null)
    }
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
