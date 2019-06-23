/*******
 * 饼图组件
 * title: String 标题
 * data: Array  [['Firefox',   45.0],
                {
                  name: 'Chrome',
                  y: 12.8,
                  sliced: true,
                  selected: true  //选中状态
                }]
 ********/ 

import React,{Component} from 'react'
import Highcharts from 'highcharts/highstock';
// 创建渐变色
Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
  return {
      radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
      stops: [
          [0, color],
          [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
      ]
  };
});
// 构建图表
export default class Pie extends Component {
  constructor(props){
    super(props);
  }
  CreatePie = () => {
    var chart = Highcharts.chart('Pie',{
      credits: {
        enabled: false,   //去除版权信息
      },
      title: {
        text: this.props.title
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        pointFormat: '{series.type}: <b>{point.y:.1f}</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  },
                  connectorColor: 'silver'
              }
          }
      },
      series: [{
        type: 'pie',
        data: this.props.data
      }]
    });
  }
  componentDidMount(){
    this.CreatePie();
  }
  render(){
    return (
      <div id="Pie" style={{minWidth:'100%',height:'400px'}}></div>
    )
  }
}