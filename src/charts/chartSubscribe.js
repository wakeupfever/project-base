import { ChartSource } from '@/charts/chartSource.js'
import { debounce } from 'lodash'

export class ChartSubscribe extends ChartSource {
  constructor() {
    super()
    this.resizeObserver = null
  }
  subscribeResize(currentChart, dom) {
    this.resizeObserver = new ResizeObserver(
      debounce(() => {
        currentChart.resize()
      }, 60)
    )
    this.resizeObserver.observe(dom)
  }
  subscribeResizeDestroy() {
    this.resizeObserver?.disconnect()
  }
}

export default new ChartSubscribe()
