import React,{Component} from 'react'
import moment from 'moment'
import { List, SwipeAction, Badge, Icon, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import {GetRecords,DelRecord} from '@/request'

const Item = List.Item;
const Brief = Item.Brief;
export default class Record extends Component {
  state = {
    tabledata: [],
  }
  getData(){
    GetRecords({userID:1,page:1,pagesize:20}).then(res=>{
      if(res.data.code == 200){
        this.setState({
          tabledata: res.data.data
        })
      }
    })
  }
  componentWillMount(){
    this.getData();
  }
  handleDelete = (id)=>{
    DelRecord(id).then(res=>{
      this.getData();
    })
  }
  render(){
    const listItems = this.state.tabledata.map((item,index)=>
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
          extra={`${item.transaction=='out'?'-':'+'} ${item.money}`}
          multipleLine
        >
          {item.transaction == 'in'?<Badge text='入' style={{backgroundColor: '#f19736'}} />:<Badge text={item.type.slice(0,1)} hot />}
          
          {item.type.slice(1)}
          <Brief>{moment(item.transactionTime).format('YYYY-MM-DD')}</Brief>
        </Item>
      </SwipeAction>
    );
    return (
      <div className="records">
        <List>
          <p style={{textAlign: 'center', color: '#333', fontSize: '18px', margin: 0, padding: '1em'}}>近期记录</p>
          {listItems}
        </List>
        <WhiteSpace/>
        <WingBlank><Button>...</Button></WingBlank>
        <WhiteSpace/>
      </div>
    )
  }
}