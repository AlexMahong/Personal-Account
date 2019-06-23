const query = require('./index')

// 月统计信息
let month = function({date}){
  return query(`SELECT type,transaction,SUM(money) AS sum FROM records WHERE YEAR(records.transactionTime)=YEAR(${date}) AND MONTH(records.transactionTime)=MONTH(${date}) GROUP BY type,transaction`)
}

module.exports = {month}