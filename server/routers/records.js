const router = require('koa-router')();
const Records = require('../database/records.sql')

// 增
router.post('/records',async(ctx,next)=>{
  await Records.add(ctx.request.body).then(res => {
    ctx.body = {
      code: 200,
      data: [],
      message: '添加成功'
    }
  })
})

// 删
router.delete('/records',async(ctx,next)=>{
  await Records.del(ctx.request.query).then(res => {
    ctx.body = {
      code: 200,
      data: [],
      message: '删除成功'
    }
  })
})

// 改
router.put('/records',async(ctx,next)=>{
  await Records.edit(ctx.request.body).then(res => {
    console.log(res)
    ctx.body = {
      code: 200,
      data: [],
      message: '修改成功'
    }
  })
})

// 查
router.post('/records/search',async(ctx,next)=>{
  await Records.get(ctx.request.body).then(res => {
    ctx.body = {
      code: 200,
      data: res,
      message: ''
    }
  })
})

module.exports = router