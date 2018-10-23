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
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals[0].total, fields);
      });
    }
  });
}

module.exports = {
  query,
  count
};