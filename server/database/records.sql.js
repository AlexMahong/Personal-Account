const query = require('./index');

// 增
let add = function({userID,money,transaction,type,transactionTime,notes}){
  let createTime = new Date();
  // let createTime = new Date().toLocaleString();
  // transactionTime = new Date(transactionTime).toLocaleString();
  return query(`INSERT INTO records (createTime,money,transaction,type,transactionTime,notes,userID) VALUES ('${createTime}',${money},'${transaction}','${type}','${transactionTime}','${notes}',${userID})`)
}

// 删
let del = function({id}){
  return query(`DELETE FROM records WHERE id=${id}`)
}

// 改
let edit = function({id,money,transaction,type,transactionTime,notes}){
  let sql = `UPDATE records SET money=${money},transaction='${transaction}',type='${type}',transactionTime='${transactionTime}',notes='${notes}' WHERE id=${id}`;
  return query(sql);
}

// 查
// 查询条件 userID,transaction,transactionTime,type,page,pagesize
let get = function(options){
  var optionString = '';
  Object.keys(options).forEach((key,index)=>{
    if(key !== 'page' && key!== 'pagesize'){
      optionString += key + "='" + options[key] + "'"
      if(index < Object.keys(options).length - 3){
        optionString += ','
      }
    }
  })
  console.log(optionString)
  return query(`SELECT * FROM records WHERE ${optionString} ORDER BY transactionTime DESC,money DESC LIMIT ${(options.page-1)*options.pagesize},${options.pagesize}`)
}

module.exports = {add,del,edit,get}