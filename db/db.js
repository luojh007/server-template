var mysql = require('mysql');  //调用MySQL模块
const Sequelize = require('sequelize');
const config = require('./config')
//创建一个connection
var connection = mysql.createConnection(config);
//创建一个connection
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect]  succeed!');
});
//执行SQL语句
module.exports = function (sql) {
  return new Promise(function (res, rej) {
    connection.query(sql, function (err, rows, fields) {
      if (err) {
        rej('[query] - :' + err);
      }
      res(rows)
    })   
  })
}
//关闭connection
