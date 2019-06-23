import {hashHistory} from 'react-router'
import {UserLogin} from '@/request'
import Cookie from './cookie'

const IsLogin = () => {
  let userMessage = Cookie.get('PA_userMessage');
  if(userMessage){
    Cookie.set('PA_userMessage',userMessage,7);
  }else {
    hashHistory.push('/login')
  }
  
}

export default IsLogin;