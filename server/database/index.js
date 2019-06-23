const mysql = require('mysql')
const config = require('../config')

// 数据库连接池
const pool = mysql.createPool({
  database: config.database.database,
  host: config.database.host,
  user: config.database.user,
  password: config.database.password
})

// 封装数据库连接函数，通过返回promise的方式以便可以方便用.then()来获取数据库返回的数据
// 通过返回promise的方式以便可以方便用.then()来获取数据库返回的数据
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( JSON.parse(JSON.stringify(rows)) )
          }
          connection.release()
        })
      }
    })
  })
}


module.exports = query