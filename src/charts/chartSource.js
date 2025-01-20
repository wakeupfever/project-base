// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, PictorialBarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

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
// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  PictorialBarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export class ChartSource {
  constructor() {
    this.echarts = echarts
  }
  updateDateZoom(config, color) {
    const { dataZoom } = config ?? {}
    const result = {
      type: 'slider',
      show: true,
      height: 9,
      bottom: 10,
      borderColor: 'transparent',
      backgroundColor: this.hex2Rgba(color),
      // handleColor: '#aab6c6',
      handleSize: 20,
      handleStyle: {
        borderColor: '#aab6c6',
        shadowBlur: 1,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowColor: this.hex2Rgba(color),
        color: '#92B8C8'
      },
      moveHandleStyle: {
        opacity: 0
      },
      showDetail: false,
      // start: 0,
      // end: 100,
      start: 50,
      end: 85,
      ...dataZoom
    }
    return result
  }

  updateLegend({ legend = { legend: {} } }) {
    const result = {
      show: false,
      right: '0',
      top: 0,
      textStyle: {
        fontWeight: 400,
        fontSize: '14px',
        fontFamily: 'Microsoft YaHei, Microsoft YaHei',
        color: '#C6D1DB'
      },
      ...legend
    }
    return result
  }

  updateGraphic({ graphic = { graphic: {} } }) {
    const result = {
      type: 'image',
      style: {
        image: '../assets/images/user.png', // 图片路径
        width: 50, // 图片宽度
        height: 50, // 图片高度
        x: 'center', // 图片位置，这里使用百分比或具体像素值
        y: 'top' // 图片位置，同上
        // 可能需要调整这些值来确保图片与标题对齐
      },
      left: 'center', // 也可以在这里设置 x 的具体位置
      top: 10, // 调整 top 值来确保图片在标题下方或所需位置
      // 如果需要，可以添加 zlevel 或 z 来控制图层顺序
      ...graphic
    }
    return result
  }

  updateTitle({ title = { title: {} } }) {
    const result = {
      text: '',
      top: '0',
      left: '0',
      // y: '44',
      textStyle: {
        fontWeight: 400,
        fontSize: '14px',
        fontFamily: 'Microsoft YaHei, Microsoft YaHei',
        color: '#fff'
      },

      ...title
    }
    return result
  }

  updateGrid({ grid } = { grid: {} }) {
    const result = {
      top: '10%',
      left: 10,
      right: 10,
      bottom: '12%',
      containLabel: true,
      ...grid
    }
    return result
  }

  updateXAxis({ xAxis } = { xAxis: {} }) {
    const result = {
      // type: 'category',
      // // boundaryGap: 0,
      // axisTick: {
      //   show: false
      // },
      // axisLabel: {
      //   fontSize: '12',
      //   fontFamily: 'Source Han Sans SC-Regular, Source Han Sans SC',
      //   color: 'rgba(216,240,255,0.8)'
      // },
      // axisLine: {
      //   lineStyle: {
      //     color: '#395E6D',
      //     width: 1
      //   }
      // },

      // show: false,
      type: 'category',
      boundaryGap: true,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: '#BFC0C1'
        }
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: '#7288A1',
          fontSize: 12
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'red'
        }
      },
      axisTick: {
        show: true,
        inside: true
      },

      ...xAxis
    }
    return result
  }

  updateYAxis({ yAxis, series } = { yAxis: {}, series: {} }, yList = []) {
    const allData = yList.reduce((p, c) => p.concat(c.data), [])
    const markLineData = series?.markLine?.data?.map(t => Number(t?.yAxis)) ?? []
    const yAxisMax = Math.max(...[...allData, ...markLineData])
    const yAxisMin = Math.min(...[...allData, ...markLineData])
    // const yAxisRang = Math.abs(yAxisMax) - Math.abs(yAxisMin)
    const yAxisRang = Math.abs(Math.ceil(yAxisMax) - Math.floor(yAxisMin))
    const step = 4
    // debugger
    // 向上取整最大值+4/1
    let max = 100
    let min = 0
    if (![Infinity, NaN].includes(yAxisRang)) {
      max = Math.ceil(yAxisMax + Math.ceil(yAxisRang / step))
      // 向下取整最小值-4/1
      min = Math.floor(yAxisMin - Math.ceil(yAxisRang / step))
    }
    console.log(max, min)
    const result = {
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(176, 215, 255, 0.20)',
          type: 'line',
          width: 1,
          dashArray: [5, 10]
        }
      },
      fontSize: 12,
      axisLabel: {
        fontFamily: 'Source Han Sans SC-Regular, Source Han Sans SC',
        color: '#7288A1'
      },
      type: 'value',
      minInterval: 1,
      // max,
      // min,
      // scale: true, // 开启自适应
      ...yAxis
    }
    if (Number.isNaN(result.max)) {
      delete result.max
    }
    if (Number.isNaN(result.min)) {
      delete result.min
    }
    return result
  }

  updateTooltip({ tooltip } = { tooltip: {} }) {
    const result = {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          type: 'line',
          width: 1,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          color: '#D9DDF2'
        }
      },
      borderColor: '#347FDF',
      textStyle: {
        color: '#306199',
        fontSize: 12
      },
      backgroundColor: '#fff',
      formatter: res => {
        if (res) {
          const html = res.map(
            item =>
              `<div style='display: flex; align-items: center;'>
              <p style="color: #306199; margin-right: 10px">${item.axisValueLabel}</p>
              <p style="color: #306199">${item.value}</p>
            </div>`
          )
          const label = `<p style='margin-right: 20px; color: #306199'>${res[0].seriesName}</p>`
          return label + html.join('\n')
        } else {
          return 0
        }
      },
      ...tooltip
    }
    return result
  }

  updateSeries(item, { series } = { series: {} }) {
    const result = {
      name: item.name,
      // symbol:
      //   'image://data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAABJ1JREFUWEedmN9Pm1UYx7/nvC1QcF33jqLYZj+EBcXgQiJIvKCJiSSakEAyTQheVSEuJl7tdlf+B0uICowLo3IhyZaocVNvmAmpcoFM02SRTXTtxmgorFIqbd/zmFN8S2nPad+ul+/z6/M+P877nDI84c+8Ql5XI/x5NxqLLiyksgb2d8MsUa9bVo+BOUNBztBLhCBDCUCZE8aQshhiEIgmJ1jMSQxHIOYcdRsCA0TwOnFaqlOA4ogkwyxazbYqiPk5eY0MhggI1gtQri84omhEJPkOS6l8aUFkGRgwXK0E9cIVstOEBRWMEqTtU+oQHMP1BnKir4OpAJHlYBmM18qE1w3PWa8I+BrItAF2skiubhlrtYBUMEdAOq9Q4+NmjFdryvMnReeLphg87madBiNPedCsxZLbWawtbRg343tI6qAYEEtMsAVbfgTkmWkK5Rl6dcYjp63R4FM0WOuNbfl6Cje/ue+6odPPMyzuvMdWpLwIIkvCMwirjGQZRs5aYa+bOp1COIEhYP9EBnNrH7L9IkjbVRoSAt2qQG89Z4097aH+eiGcwNhZKYKcnKGLqgYNtVv9PSaNPSmEbffTAza1ul3ZyHavFECqjevkC9blBn44GaVAbk4ItBw8SeeBREZ/PqaybO2zP4wp1QuJDOYKlq3TFIKiSV9pEz19fqHsm2ebBfraCG5+6DqdAxYfcuzl1UDX/uQfxfd4xSQJC98XLPwzdEF1jOt6o8VFeOOUUFZLwvwYN5BTiO88Ztd+iBm3KgwJKwelmaZxweAvV3j3eeuSx6BA+fM+v8DpY6Rtm+g2Q3S7JFX/az7K4Jev7rnmyw2FQPQgI7MUVh1iuv5485SFZpe+fR+kGZYeVYJs7eO3+TXXXAUIEKsKostIqF3A79FnRAeia1hhg7TO0jAIHeWkuh45c4zwsl/dI9LH8ibHX7uVDRtLs8Xr68Z1bWl0U/N6kAa7jlujqiLospLOMXx3v7Is0sftLf7lrQ2+rChNpIAtNzBuYahcweeGZ+xc/rLBUPFxk7rdPsI5nxzhgzKt/8OwusWVEyPluvHNCXxdAJFf3R0PLqrefPSMNRJooZC+NYFmFyEnmBZA2uomRsp8GXxcLKTuLJFZebszf6mBo7h3VINSybIWkt/+zaeUhxkQS06whcOvr9zQgQsqR11eEXgtKD7QlagW2HKCX/15k/+u0pOnavJ9dnCO2D9dVqT8/AnR+Wq7CNcLo2tQ6ZMRUolJVjhXjoAU7i2arEjlQLMwQwExYjagp1YW0jnElzb4/J0Uj+t0BbBg33sqd9YZGuDAQLVAL5no6PLl+1ub0FOaIYuQSedY/NctduN2kt+t5kMAkeQEi9g66i2+ypJU7tzrFp6WBt4knz9MY7tWpqScExKbk+yLUl3tAlFtY3MSTKcjIbz/YkGuh45ApJLpoEz1QHGOqDeNxXKIimZVOTU/oW6DY4BY/fde259cki2GiL2xq+I4uoRLQ98s9boFeusBkgAErJgZrKiy4Lg0KnK53wLoKCxSimWqcIuzEIMbMXMXd2sBVJ2aeuou/7Cx9U1g32ng8hj/AeNz9OyYytAxAAAAAElFTkSuQmCC',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: '0',
      itemStyle: {
        color: item.color
        // borderColor: this.hex2Rgba(item.color),
        // borderWidth: 1
      },
      lineStyle: {
        width: 4,
        shadowColor: 'rgba(34, 103, 192, 0.4)',
        shadowOffsetY: 10,
        shadowBlur: 6,
        color: '#2267C0'
      },
      emphasis: {
        focus: 'series'
      },
      ...series
    }
    return result
  }

  updateVisualMap({ visualMap } = { visualMap: {} }) {
    const result = {
      top: 0,
      right: 30,
      orient: 'horizontal',
      // pieces,
      outOfRange: {
        color: '#999'
      },
      textStyle: {
        fontWeight: 400,
        fontSize: '14px',
        fontFamily: 'Microsoft YaHei, Microsoft YaHei',
        color: '#C6D1DB'
      },
      ...visualMap
    }
    return result
  }

  setChart(myChart, opt) {
    const option = {
      grid: { top: '0', left: '0', right: '0', bottom: '0' },
      ...opt
    }
    myChart.setOption(option)
    return myChart
  }

  setMove(chart, len = 0) {
    return setInterval(() => {
      if (len === chart.getOption().xAxis[0].data.length) {
        len = 0
      }
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: len
      })
      len++
      // 这个地方就是这个轮播的一个事件的这个东西的了
    }, 3000)
  }
  pieMove(chart) {
    let i = 0
    const leng = chart.getOption().series[0].data.length
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i })
    return setInterval(function () {
      i++
      if (i == leng) {
        i = 0
      }
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: i == 0 ? leng - 1 : i - 1
      })
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i == leng ? 0 : i })
    }, 1500)
  }
  hex2Rgba(hex, alpha = 0) {
    const rgba = hex.match(/[A-Za-z0-9]{2}/g).map(v => Number(`0x${v}`))
    rgba.push(alpha)
    return `rgba(${rgba})`
  }
}
