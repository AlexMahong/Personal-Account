const router = require('koa-router')();
const Statistics = require('../database/statistics.sql');

router.post('/statistics/month',async(ctx,next)=>{
  var returnData = {
    in: {
      total: 0,
      data: []
    },
    out: {
      total: 0,
      data: []
    }
  };
  await Statistics.month({date: `'${new Date(ctx.request.body.date).toLocaleString()}'`}).then(res => {
    res.forEach(item=>{
      // 遍历数组返回需要数据
      if(item.transaction == 'in'){
        returnData.in.total += item.sum;
        returnData.in.data.push(item);
      }else{
        returnData.out.total += item.sum;
        returnData.out.data.push(item)
      }
    })
  })
  ctx.body = {
    code: 200,
    data: returnData,
    message: ''
  }
})


module.exports = router