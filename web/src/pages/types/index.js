import React,{Component} from 'react'
import moment from 'moment'
import Cookie from '@/utils/cookie'
import Nav from '@/components/Navbar'
import { hashHistory } from "react-router";
import { List, InputItem, SwipeAction, Badge, WingBlank, WhiteSpace, Button, Icon, Modal, Toast } from 'antd-mobile'
import {GetTypesByUser,AddTypes,DelTypes,EditTypes} from '@/request'

const Item = List.Item;
const Brief = Item.Brief;

export default class Record extends Component {
  state = {
    types: [],
    modalVisiable: false,
    type: '',
    remarks: '',
  }
  getData(){
    const userMessage = JSON.parse(Cookie.get('PA_userMessage'))
    GetTypesByUser(userMessage.id).then(res=>{
      if(res.data.code == 200){
        this.setState({
          types: res.data.data
        })
      }
    })
  }
  componentWillMount(){
    this.getData();
  }
  handleDelete = (id)=>{
    DelTypes(id).then(res=>{
      this.getData();
    })
  }
  onClose = key => () => {
    this.state.type !== ''?this.addType():Toast.info('请输入分类名称!',2)
    this.setState({
      [key]: false,
    });
  }
  addType = () => {
    const userMessage = JSON.parse(Cookie.get('PA_userMessage'));
    AddTypes(userMessage.id,this.state.type,this.state.remarks).then(res=>{
      if(res.data.code == 200){
        this.getData();
      }
    })
  }
  render(){
    const listItems = this.state.types.map((item,index)=>
      <SwipeAction
        key={index}
        style={{ backgroundColor: 'gray' }}
        autoClose
        right={[
          {
            text: '删除',
            onPress: () => this.handleDelete(item.id),
            style: { backgroundColor: '#F4333C', color: 'white' },
          },
        ]}
      >
        <Item
          extra={item.remarks}
          multipleLine
        >
          <Badge text={item.type.slice(0,1)} hot />
          <span style={{fontSize:"12px",marginLeft: "5px"}}>{item.type.slice(1)}</span>
          <Brief>{moment(item.createTime).format('YYYY-MM-DD')}</Brief>
        </Item>
      </SwipeAction>
    );
    return (
      <div className="types">
        <WhiteSpace/>
        <WingBlank>
          <Button type="primary" onClick={()=> this.setState({modalVisiable: true})} style={{background: '#3f51b5', width: '80%', height: '35px', lineHeight: '35px', fontSize: '14px', margin: 'auto'}}>新增分类+</Button>
        </WingBlank>
        <WhiteSpace/>
        <List>
          {listItems}
        </List>
        <Modal
          transparent
          visible={this.state.modalVisiable}
          onClose={this.onClose('modalVisiable')}
          title="新增分类"
          footer={[
            { text: 'Cancel', onPress: () => { this.setState({modalVisiable: false}) } },
            { text: 'Ok', onPress: () => { this.onClose('modalVisiable')(); } }]}
        >
          <List>
            <InputItem onChange={(val)=> this.setState({type:val})} placeholder="分类"></InputItem>
            <InputItem onChange={(val)=> this.setState({remarks:val})} placeholder="备注"></InputItem>
          </List>
        </Modal>
      </div>
    )
  }
}