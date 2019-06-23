import React from 'react'
import {Tabs, WingBlank, WhiteSpace, Badge} from 'antd-mobile';
import {StatisticByMonth} from '@/request'
import Entry from '@/pages/recode/entry'
import Records from '@/pages/recode/records'
import Pie from '@/components/Pie'

const tabs = [
  {title: '添加'},
  {title: '统计'},
];

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.tabClickHandle = this.tabClickHandle.bind(this);
  }

  state = {
    thisMonth: {},
    pieData: []
  };

  componentWillMount() {
    // 获取月度统计
    this.getStatisticByMonth();
  }

  // 获取月度统计
  getStatisticByMonth() {
    StatisticByMonth(new Date()).then(res => {
      if (res.data.code == 200) {
        this.setState({
          thisMonth: res.data.data,
          pieData: res.data.data.out.data.map(item => {
            return [item.type, item.sum];
          })
        })
      }
    })
  }

  // tabs 切换回调，点击统计时重新获取数据
  tabClickHandle({title}) {
    if (title === '统计') {
      this.getStatisticByMonth();
    }
  }

  render() {
    const renderPie = this.state.pieData.length == 0 ? '' : <Pie title="支出分布" data={this.state.pieData}/>
    return (
      <Tabs tabs={tabs}
            initialPage={0}
            onTabClick={this.tabClickHandle}
      >
        <div>
          {<Entry/>}
        </div>
        <div>
          <WhiteSpace/>
          <div className="homepage-statistic">
            <div className="item in">
              <span className="text">+</span>
              <span className="money">{this.state.thisMonth.in ? this.state.thisMonth.in.total : ''}</span>
              ￥
            </div>
            <WhiteSpace/>
            <div className="item out">
              <span className="text">-</span>
              <span className="money">{this.state.thisMonth.out ? this.state.thisMonth.out.total : ''}</span>
              ￥
            </div>
          </div>
          <WhiteSpace/>
          {renderPie}
          <WhiteSpace/>
          {<Records/>}
        </div>
      </Tabs>
    )
  }
}

export default Record;