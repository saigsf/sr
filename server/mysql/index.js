var mysql = require("mysql");
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'blct_shengrui',
  port: 3306
});

/**
 *查询数据
 *
 * @param {*} sql
 * @param {*} callback
 */
var query = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
};
// update table1 set field1=value1 where 范围
var update = function () {

}

/**
 *查询数据库总数
 *
 * @param {*} table
 * @param {*} callback
 */
var count = function (table, callback) {
  var sql = "select count(id) as total from " + table
  query(sql, callback)
}
/**
 * 数据查询
 *
 * @param {Object} params 查询参数
 * @param {String} table 要查询的表
 * @param {Array} fields 查询字段
 * @param {Array} where 查询条件
 */
var pageQuery = function (params, table, fields, where, callback) {
  // 默认查询参数
  var def = {
    page: 1,
    size: 10,
    order: 'id',
    sort: 'ASC'
  }
  // 添加查询条件
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      def[key] = value;
    }
  }
  // 确定查询语句
  var select_base = "select " + fields.join(',') + " from " + table + " "
  var order_base = "order by " + def.order + " " + def.sort + " " // 排序
  var limit_base = "limit " + (def.page - 1) * def.size + "," + def.size + " " // 分页
  var where_base = "WHERE " + where.join(' and ') + " "
  var sql = select_base + where_base + order_base + limit_base

  query(sql, callback)

}

module.exports = {
  query,
  count,
  pageQuery
};