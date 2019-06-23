import React,{Component} from 'react'
import {UserLogin} from '@/request'
import {hashHistory} from 'react-router'
import Cookie from '@/utils/cookie'
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';

class Login extends Component {
  state = {
    account: '',
    password: '',
  }
  handleSubmit = () => {
    UserLogin(this.state.account,this.state.password).then(res => {
      if(res.data.code == 200){
        // 保存用户信息7天
        Cookie.set('PA_userMessage',JSON.stringify(res.data.data),7);
        hashHistory.push('/')
      }
    });
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        <InputItem onChange={(val)=> this.setState({account:val})} type='text' placeholder="用户名"></InputItem>
        <WhiteSpace/>
        <InputItem onChange={(val)=> this.setState({password:val})} type='password' placeholder="密码"></InputItem>
        <WhiteSpace/>
        <Button type="primary" onClick={this.handleSubmit}>登录</Button>
      </WingBlank>
    );
  }
}

export default Login;
