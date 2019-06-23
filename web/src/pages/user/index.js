import React,{Component} from 'react'
import Nav from '@/components/Navbar'
import {List} from 'antd-mobile'
import {StatisticByMonth} from '@/request'
import {hashHistory} from 'react-router'
import Pie from '@/components/Pie'
const Item = List.Item

export default class Mine extends Component {
  state = {
    thisMonth: {},
    pieData: []
  }
  componentWillMount(){
    StatisticByMonth(new Date()).then(res=>{
      if(res.data.code == 200){
        this.setState({
          thisMonth: res.data.data,
          pieData: res.data.data.out.data.map(item=>{
            return [item.type, item.sum];
          })
        })
      }
    })
  }
  render(){
    const renderPie = this.state.pieData.length==0 ? '' : <Pie title="本月支出" data={this.state.pieData}/>
    return (
      <div className="mine">
        {<Nav title="我的" />}
        <List>
          <div>本月支出:{this.state.thisMonth.out?this.state.thisMonth.out.total:''}</div>
          <div>本月收入:{this.state.thisMonth.in?this.state.thisMonth.in.total:''}</div>
          <Item arrow="horizontal" onClick={() => {hashHistory.push('/types')}}>分类管理</Item>
          <Item arrow="horizontal" onClick={() => {}}>每月统计</Item>
          <Item arrow="horizontal" onClick={() => {}}>年度统计</Item>
        </List>
        {renderPie}
      </div>
    )
  }
}