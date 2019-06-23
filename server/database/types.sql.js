// transaction类型sql

const query = require('./index');

// 增
let add = function({createBy,type,remarks}){
  const createTime = new Date().toLocaleString();
  let sql = `INSERT INTO types (type,createBy,createTime,remarks) VALUES ('${type}',${createBy},'${createTime}','${remarks}')`
  return query(sql)
}
// 删
let del = function($id){
  return query(`DELETE FROM types WHERE id=${$id}`)
}

// 改
let edit = function({id,createBy,type,remarks}){
  let sql = `UPDATE types SET createBy=${createBy},type='${type}',remarks='${remarks}' WHERE id=${id}`;
  return query(sql);
}

// 查
let get = function($createBy){
  return query(`SELECT * FROM types WHERE createBy=${$createBy} ORDER BY createTime DESC`)
}

module.exports = {add,del,edit,get}