const router = require('koa-router')();
const User = require('../database/user.sql');

// 注册
router.post('/user/register', async(ctx,next)=>{
  if(ctx.request.body.userName && ctx.request.body.account && ctx.request.body.password){
    await User.register(ctx.request.body).then(res=>{
      ctx.body = {
        code: '200',
        data: [],
        message: '注册成功'
      }
    })
  }else {
    ctx.body = {
      code: 201,
      data: [],
      message: '参数错误'
    }
  }
})

// 登录
router.post('/user/login',async(ctx,next)=>{
  await User.login(ctx.request.body).then(res=>{
    // 判断密码
    if(res[0].password == ctx.request.body.password){
      ctx.body = {
        code: 200,
        data: res[0],
        message: '登录成功'
      }
    }else {
      ctx.body= {
        code: 202,
        data: [],
        message: '账号或密码错误'
      }
    }

  })
})

module.exports = router