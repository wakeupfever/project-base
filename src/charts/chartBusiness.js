import { ChartSource } from '@/charts/chartSource.js'
export const colorAll = [
  '#9673E8',
  '#90C4E1',
  '#00C4E1',
  '#F0C97A',
  '#FF997A',
  '#FDC97A',
  '#83bff6',
  '#3673E8',
  '#DFC97A',
  '#FFC977',
  '#F9C97A',
  '#83bef6',
  '#00C97A',
  '#FF999A',
  '#99C97A',
  '#DFC37A',
  '#11C977',
  '#15C97A'
]
export class ChartScreen extends ChartSource {
  constructor() {
    super()
  }

  /**
   * @description 饼图 左侧图 右侧图例
   * @param {*} chartElement
   * @param {*} [opt={}]
   * @param {*} [config={}]
   * @return {*}
   * @memberof ChartScreen
   */
  circularDiagramChart(chartElement, opt = {}, config = {}) {
    const myChart = this.echarts.init(chartElement, null, { devicePixelRatio: 2.5 })
    const {
      xList = ['目标验收', '已验收', '正在建设', '待验收'],
      yList = [150, 32, 201, 434, 290, 230, 220]
    } = opt
    const total = yList.reduce((a, b) => a + b, 0)
    const title = this.updateTitle(config)
    const data = yList.map((item, index) => ({
      value: item,
      name: xList[index]
    }))

    const color = Array.from({ length: xList.length }, (_, i) =>
      this.hex2Rgba('#347FDF', 1 - i / xList.length)
    )
    const series = [
      {
        name: '年度项目统计',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['180px', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
    const option = {
      title: {
        ...title,
        show: true,
        text: total, // 当前写死
        subtext: '总数', // 当前写死
        top: 'center',
        left: '175px',
        // left: 'center',
        textStyle: {
          fontSize: '40',
          fontWeight: 'bold'
        },
        subtextStyle: {
          fontSize: '20'
        },
        textAlign: 'center'
      },
      color,
      tooltip: {
        trigger: 'item'
      },
      legend: {
        right: '40px',
        top: 'center',
        icon: 'roundRect',
        width: 200,
        itemHeight: 16,
        itemWidth: 16,
        itemGap: 25,
        // textStyle: {
        //   color: '#999',
        //   fontSize: '18px',
        //   fontWeight: 600
        // },
        textStyle: {
          rich: {
            name: {
              fontSize: 18,
              color: '#306199',
              width: 100
            },
            value: {
              fontSize: 16,
              color: '#306199'
            }
          }
        },
        formatter: name => {
          const target = data.find(item => item.name === name)?.value
          const arr = ['{name|' + name + '}', '{value|      ' + target + '}']
          return arr.join('')
        }
      },

      series
    }

    return this.setChart(myChart, option)
  }

  // 通用折线图配置
  singleLineChart(chartElement, opt = {}, config = {}) {
    const myChart = this.echarts.init(chartElement, null, { devicePixelRatio: 2.5 })
    const {
      xList = ['15时', '16时', '17时', '18时', '19时', '20时', '21时'],
      yList = [
        { name: '类型一', color: colorAll[0], data: [150, 32, 201, 434, 290, 230, 220] },
        { name: '类型二', color: colorAll[1], data: [120, 112, 101, 234, 290, 530, 220] },
        { name: '类型三', color: colorAll[2], data: [10, 112, 151, 204, 240, 430, 220] }
      ]
    } = opt
    // const color = yList[0]?.color ?? '#2193AC'

    const legend = this.updateLegend(config)
    const title = this.updateTitle(config)
    const grid = this.updateGrid(config)
    const xAxis = this.updateXAxis(config)
    const yAxis = this.updateYAxis(config)
    const tooltip = this.updateTooltip(config)
    const series = yList.map(o => {
      const seriesConfig = this.updateSeries(o, config)
      return {
        ...seriesConfig,
        symbolSize: 3,
        focus: 'series',
        emphasis: {
          scale: 4,
          itemStyle: {
            borderColor: '#2267c04d',
            borderWidth: 12
          }
        },
        data: o.data
      }
    })
    const option = {
      title,
      tooltip,
      legend,
      grid,
      xAxis: [
        {
          ...xAxis,
          data: xList
        }
      ],
      yAxis: [
        {
          ...yAxis
        }
      ],

      series
      // dataZoom: [this.updateDateZoom(color, config)]
    }

    return this.setChart(myChart, option)
  }

  singleBarChart(chartElement, opt = {}, config = {}) {
    const myChart = this.echarts.init(chartElement, null, { devicePixelRatio: 2.5 })
    const {
      xList = ['15时', '16时', '17时', '18时', '19时', '20时', '21时'],
      yList = [
        { name: '类型一', color: '#83bff6', data: [620, 732, 701, 734, 1090, 1130, 1120] },
        { name: '类型二', color: '#3673E8', data: [120, 132, 101, 134, 290, 230, 220] },
        { name: '类型三', color: '#00C4E1', data: [60, 72, 71, 74, 190, 130, 110] },
        { name: '类型四', color: '#FFC97A', data: [62, 82, 91, 84, 109, 110, 120] }
      ]
    } = opt
    const legend = this.updateLegend(config)
    const title = this.updateTitle(config)
    const grid = this.updateGrid(config)
    const xAxis = this.updateXAxis(config)
    const yAxis = this.updateYAxis(config)
    const tooltip = this.updateTooltip(config)
    // const series = yList.map(o => {
    //   return {
    //     name: o.name,
    //     type: 'bar',
    //     barWidth: 10,
    //     stack: 'A',
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: o.data
    //   }
    // })
    const series = yList.map(o => {
      const seriesConfig = this.updateSeries(o, config)
      return {
        ...seriesConfig,
        type: 'bar',
        barWidth: 24,
        stack: 'A',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          barBorderRadius: [6, 6, 6, 6]
        },
        data: o.data
      }
    })
    const option = {
      title,
      tooltip,
      legend,
      grid,
      xAxis: [
        {
          ...xAxis,
          data: xList
        }
      ],
      yAxis: [
        {
          ...yAxis
        }
      ],
      series
    }

    return this.setChart(myChart, option)
  }
}

export default new ChartScreen()
