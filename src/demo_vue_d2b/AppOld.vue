<template>
  <div id="app">
    <div class="chart">
      <chart-axis
        v-if="chocolateData"
        :data="lineData"
        :config="lineConfig"
      >
      </chart-axis>

      <!-- <chart-axis
        v-if="chocolateData"
        :data="bubbleData"
        :config="bubbleConfig"
      >
      </chart-axis> -->
    </div>
  </div>
</template>

<script>
  import { csv, nest, scaleOrdinal, schemeCategory10 } from 'd3'
  import { ChartAxis } from 'vue-d2b'
  import { svgBubblePack, svgLine, svgScatter } from 'd2b'

  const color = scaleOrdinal(schemeCategory10)

  const pack = svgBubblePack()
    .pchildren(d => d.values)
    .psize(d => d.rating ? 0.1 : null)
    .px(d => d.cocoa_percent)
    .py(d => d.rating)
    .pkey(d => d.key || d.name)
    .pindicator(d => d.key || d.name)
    .pcolor(d => color(d.key || d.broad_bean_origin))

  export default {
    data () {
      return {
        chocolateData: null,
        chocolateNest: nest().key(d => d.broad_bean_origin),
        lineGenerators: [svgLine]
        bubbleGenerators: [pack],
        bubbleConfig (chart) {
          chart.chartFrame().legendEnabled(false)
          chart.graphColor(null)
        },
      }
    },

    created () {
      csv('src/data/chocolate_data.csv', data => {
        data.forEach(function (d) {
          d.rating = parseInt(d.rating)
          d.cocoa_percent = parseInt(d.cocoa_percent)
        })

        this.chocolateData = data
      })
    },

    components: {
      ChartAxis
    },

    computed: {
      bubbleData () {
        if (!this.chocolateData) return

        this.chocolateNest.entries(this.chocolateData)

        return {
          sets: [{
            generators: this.bubbleGenerators,
            graphs: [{
              values: this.chocolateNest.entries(this.chocolateData)
            }]
          }]
        }
      }
    }
  }
</script>
