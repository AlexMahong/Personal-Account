import './config'
import Axios from 'axios';

export const UserLogin = ($account,$password) => Axios.post('/user/login',{account:$account,password: $password})

// 添加分类
export const AddTypes = ($userID,$type,$remarks) => Axios.post('/types',{
  createBy: $userID,
  type: $type,
  remarks: $remarks
})
// 修改分类
export const EditTypes = ($id,$userID,$type,$remarks) => Axios.put('/types',{
  id: $id,
  createBy: $userID,
  type: $type,
  remarks: $remarks
})
// 删除分类
export const DelTypes = ($id) => Axios.delete('/types?id='+$id);
// 获取分类列表
export const GetTypesByUser = ($createBy) => Axios.get('/types?createBy='+$createBy)

// 添加条目
export const AddRecord = ($param) => Axios.post('/records',$param)

// 查询条目
export const GetRecords = ($param) => Axios.post('/records/search',$param)

// 删除条目
export const DelRecord = ($id) => Axios.delete('/records?id='+$id);

// 月度统计
export const StatisticByMonth = ($date) => Axios.post('/statistics/month',{date: $date})