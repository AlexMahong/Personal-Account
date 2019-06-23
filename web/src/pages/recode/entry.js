import React from 'react'
import { List, InputItem, Picker, DatePicker, Toast, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookie from '@/utils/cookie'
import {GetTypesByUser,AddRecord} from '@/request'

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Entry extends React.Component {
  state = {
    money: 0,
    type: ['食'],
    transaction: ['out'],
    transactionTime: new Date(),
    notes: '',
    typePickerVisible: false,
    types: [],  //分类列表
  }
  componentWillMount(){
    const userMessage = JSON.parse(Cookie.get('PA_userMessage'))
    // 获取分类
    GetTypesByUser(userMessage.id).then(res=>{
      this.setState({
        types: res.data.data
      })
    })
  }
  submit(){
    let userMessage = JSON.parse(Cookie.get('PA_userMessage'));
    console.log(this.state.transactionTime);
    const params = {
      userID: userMessage.id,
      money: this.state.money,
      type: this.state.transaction[0]=='out' ? this.state.type[0] : '',
      transaction: this.state.transaction[0],
      transactionTime: this.state.transactionTime,
      notes: this.state.notes?this.state.notes:''
    }
    AddRecord(params).then(res=>{
      Toast.info(res.data.message)
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const typesItems = this.state.types.map((item)=>{
      return {label: item.type,value: item.type}
    })
    const transactionItems = [
      {label: '支出', value: 'out'},
      {label: '收入', value: 'in'},
    ]
    return (
      <List>
        <InputItem onChange={(val)=> this.setState({money:Number(val)})} type='money' placeholder="请输入金额" moneyKeyboardWrapProps={moneyKeyboardWrapProps}
        >金额</InputItem>
        <Picker data={transactionItems} value={this.state.transaction} cols={1} onOk={v=>this.setState({transaction:v})} onChange={v=>this.setState({transaction:v})}>
          <List.Item arrow="horizontal">收支</List.Item>
        </Picker>
        {
          this.state.transaction[0] === 'out' ? <Picker data={typesItems} value={this.state.type} cols={1} onOk={v=>this.setState({type:v})} onChange={v=>this.setState({type:v})}>
          <List.Item arrow="horizontal">分类</List.Item>
        </Picker> : ''
        }
        <DatePicker mode="date" value={this.state.transactionTime} onChange={(v)=>{this.setState({transactionTime:v})}}>
          <List.Item arrow="horizontal">时间</List.Item>
        </DatePicker>
        <InputItem onChange={(val)=> this.setState({notes:val})}>备注</InputItem>
        <List.Item> 
          <div
            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
            onClick={() => this.submit()}
          >
            提交
          </div>
        </List.Item>
      </List>
    );
  }
}

export default createForm()(Entry);