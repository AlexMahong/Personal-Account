const query = require('./index')
// 注册
let register = function({userName,account,password,tel,email}){
  return query(`INSERT INTO user (userName,account,password,tel,email) VALUES ('${userName}','${account}','${password}','${tel}','${email}')`)
}
// 登录
let login = function({account}){
  return query(`SELECT * FROM user WHERE account='${account}'`);
}

module.exports = {register,login}