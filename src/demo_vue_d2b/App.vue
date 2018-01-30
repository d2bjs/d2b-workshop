<template>
  <div id="app">
    <div class="chart">
      <chart-axis
        v-if="chocolateData"
        :data="chartData"
      >
      </chart-axis>
    </div>
  </div>
</template>

<script>
  import { csv, nest, mean, ascending, histogram, scaleLinear } from 'd3'
  import { ChartAxis } from 'vue-d2b'
  import { svgLine, svgScatter, svgBar } from 'd2b'

  const histScale = scaleLinear().domain([40, 100])

  export default {
    data () {
      return {
        chocolateData: null,
        chocolateNest: nest().key(d => d.cocoa_percent),
        lineGenerators: [svgLine(), svgScatter()],
        barGenerators: [svgBar().padding(-0.5)],
        histogram: histogram().value(d => d.cocoa_percent).domain(histScale.domain()).thresholds(histScale.ticks(20))
      }
    },

    created () {
      csv('src/data/chocolate_data.csv', data => {
        data.forEach(function (d) {
          d.rating = parseFloat(d.rating)
          d.cocoa_percent = parseFloat(d.cocoa_percent)
        })

        this.chocolateData = data
      })
    },

    components: {
      ChartAxis
    },

    computed: {
      chartData () {
        if (!this.chocolateData) return

        return {
          sets: [
            {
              generators: this.lineGenerators,
              graphs: [{
                label: 'Rating vs Cocoa Percent',
                values: this.chocolateNest.entries(this.chocolateData)
                  .map(d => {
                    return {
                      x: +d.key,
                      y: mean(d.values, d => d.rating)
                    }
                  })
                  .sort((a, b) => {
                    return ascending(a.x, b.x)
                  })
              }]
            },
            {
              generators: this.barGenerators,
              yType: 'y2',
              graphs: [{
                label: 'Bars Per Cocoa Percent',
                values: this.histogram(this.chocolateData)
                  .map(d => {
                    return {
                      x: (d.x0 + d.x1) / 2,
                      y: d.length
                    }
                  })
                  .sort((a, b) => {
                    return ascending(a.x, b.x)
                  })
              }]
            }
          ]
        }
      }
    }
  }
</script>
