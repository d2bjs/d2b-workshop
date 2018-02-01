<template>
  <div id="app">

    <b>Select your tendency:</b>
    <br>
    <label for="mean">Mean</label>
    <input type="radio" id="mean" name="tendency" value="mean" v-model="tendency"/>
    <br>
    <label for="median">Median</label>
    <input type="radio" id="median" name="tendency" value="median" v-model="tendency"/>

    <chart-axis
      v-if="data"
      :data="chartData"
      :config="chartConfig"
      class="chart"
    >
    </chart-axis>

  </div>
</template>

<script>
  import { select, csv, scaleTime, extent, nest, mean, median, format, axisBottom, timeFormat } from 'd3'
  import { svgLine, svgArea } from 'd2b'
  import { annotationCalloutCircle, annotationXYThreshold } from 'd3-svg-annotation'
  import { max } from 'underscore'
  import { ChartAxis } from 'vue-d2b'

  export default {
    data () {
      return {
        data: null,
        tendency: 'mean',
        chartConfig (chart) {
          const monthFormat = timeFormat('%B'),
                dayFormat = timeFormat('%B %d')

          chart
            .x((d, values) => {
              return {
                axis: axisBottom().tickFormat(monthFormat),
                scale: scaleTime().domain(extent(values))
              }
            })
            .y({
              label: 'Average Precipitation (Inches)',
              linearPadding: [0, 0.25]
            })
            .y2({
              label: 'Average Temperature (F)',
              linearPadding: [0, 0.25]
            })
            .tooltipConfig(tooltip => {
              tooltip.title(rows => dayFormat(rows[0].x))
            })
            .graphColor(d => d.color)
        }
      }
    },

    created () {
      csv('src/data/seattle_weather.csv', data => {
        data.forEach(d => d.date = d.DATE.slice(-5))
        this.data = data
      })
    },

    components: {
      ChartAxis
    },

    computed: {
      tendencyMethod () {
        return this.tendency === 'median' ? median : mean
      },

      // compute daily mean precip and temperatures values
      dailyData () {
        return nest()
          .key(d => d.date)
          .entries(this.data.filter(d => d.date !== '02-29'))
          .map(d => {
            return {
              date: new Date(`2017-${d.key}`),
              precipitation: this.tendencyMethod(d.values, v => parseFloat(v.PRCP)),
              tempMin: this.tendencyMethod(d.values, v => parseFloat(v.TMIN)),
              tempMax: this.tendencyMethod(d.values, v => parseFloat(v.TMAX))
            }
          })
      },

      // compute the chart data
      chartData () {
        const numberFormat = format('.2'),
              tempFormat = d => `${numberFormat(d)} F`,
              precipFormat = d => `${numberFormat(d)} Inches`,
              maxPrecipitation = max(this.dailyData, d => d.precipitation)

        return {
          annotations: [
            {
              x: new Date('2017-12-01'),
              y: Infinity,
              y2: Infinity,
              z: 'back',
              color: 'rgb(162, 204, 250)',
              type: annotationXYThreshold,
              note: { title: 'Winter' },
              dx: 10,
              dy: 10,
              disable: ['connector']
            },
            {
              x: new Date('2017-03-01'),
              y: Infinity,
              y2: Infinity,
              z: 'back',
              color: 'rgb(117, 249, 76)',
              type: annotationXYThreshold,
              note: { title: 'Spring' },
              dx: 10,
              dy: 10,
              disable: ['connector']
            },
            {
              x: new Date('2017-06-01'),
              y: Infinity,
              y2: Infinity,
              z: 'back',
              color: 'rgb(239, 238, 14)',
              type: annotationXYThreshold,
              note: { title: 'Summer' },
              dx: 10,
              dy: 10,
              disable: ['connector']
            },
            {
              x: new Date('2017-09-01'),
              y: Infinity,
              y2: Infinity,
              z: 'back',
              color: 'rgb(218, 143, 128)',
              type: annotationXYThreshold,
              note: { title: 'Fall' },
              dx: 10,
              dy: 10,
              disable: ['connector']
            },
          ],
          sets: [
            {
              generators: [svgArea(), svgLine()],
              graphs: [
                {
                  label: 'Precipitation',
                  color: '#7FDBFF',
                  tooltipConfig: tooltip => {
                    tooltip.row(row => precipFormat(row.y))
                  },
                  values: this.dailyData.map(d => {
                    return {
                      x: d.date,
                      y: d.precipitation
                    }
                  }),
                  annotations: [
                    {
                      x: maxPrecipitation.date,
                      y: maxPrecipitation.precipitation,
                      type: annotationCalloutCircle,
                      note: { title: 'Peak Rainfall In November' },
                      dx: -60,
                      dy: 0,
                      subject: {
                        radius: 30
                      }
                    }
                  ]
                }
              ]
            },
            {
              generators: [svgLine()],
              yType: 'y2',
              graphs: [
                {
                  label: 'Minimum Temperature',
                  yType: 'y2',
                  color: '#0074D9',
                  tooltipConfig: tooltip => {
                    tooltip.row(row => tempFormat(row.y))
                  },
                  values: this.dailyData.map(d => {
                    return {
                      x: d.date,
                      y: d.tempMin
                    }
                  })
                },
                {
                  label: 'Maximum Temperature',
                  yType: 'y2',
                  color: '#FF4136',
                  tooltipConfig: tooltip => {
                    tooltip.row(row => tempFormat(row.y))
                  },
                  values: this.dailyData.map(d => {
                    return {
                      x: d.date,
                      y: d.tempMax
                    }
                  })
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>
