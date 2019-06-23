/******
 * navbar 组件
 * title:String
 * leftContent: any
 * rightContent: any [<Icon key="0" type="search" style={{ marginRight: '16px' }} onClick onClick={()=>console.log('1')} />]
 * ******/

import React from 'react'
import {NavBar,Icon, Popover} from 'antd-mobile'
import { hashHistory } from "react-router";
const Item = Popover.Item;

class Nav extends React.Component{
  state = {
    visible: false,
  }
  onSelect = (opt) => {
    this.setState({
      visible: false,
    });
    if(opt.props.value!=='') hashHistory.push(opt.props.value);
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render(){
    return (
      <NavBar
        mode="dark"
        leftContent={<span onClick={() => hashHistory.push('/') }>home</span>}
        rightContent={
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="/types" icon={<Icon type="ellipsis" />} data-seed="logId">分类管理</Item>),
              (<Item key="5" value="" icon={<Icon type="ellipsis" />} style={{ whiteSpace: 'nowrap' }}>年度统计</Item>),
              (<Item key="6" value="" icon={<Icon type="ellipsis" />}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{height: '100%',padding: '0 15px',marginRight: '-15px',display: 'flex',alignItems: 'center'}}>
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }
        style={{position: 'fixed', top:0, left:0, zIndex:100, width: '100%'}}
      >PA</NavBar>
    )
  }
}
export default Nav;