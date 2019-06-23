const router = require('koa-router')();
const Types = require('../database/types.sql');

// 增
router.post('/types',async(ctx,next)=>{
  console.log(ctx.request.body)
  await Types.add(ctx.request.body).then(res=>{
    ctx.body = {
      code: 200,
      data: [],
      message: '添加成功'
    };
  })
})

// 删
router.delete('/types',async(ctx,next)=>{
  await Types.del(ctx.query.id).then(res=>{
    ctx.body = {
      code: 200,
      data: [],
      message: '删除成功'
    }
  })
})

// 改
router.put('/types', async(ctx,next)=>{
  await Types.edit(ctx.request.body).then(res=>{
    ctx.body = {
      code: 200,
      data: [],
      message: '修改成功'
    }
  })
})

// 查
router.get('/types', async(ctx,next)=>{
  await Types.get(ctx.query.createBy).then(res=>{
    ctx.body = {
      code: 200,
      data: res,
      message: ''
    }
  })
})

module.exports = router