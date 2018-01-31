import { select, csv, scaleTime, extent, nest, mean, format, axisBottom, timeFormat } from 'd3'
import { chartAxis, svgLine, svgArea } from 'd2b'
import { annotationCalloutCircle } from 'd3-svg-annotation'

csv('src/data/seattle_weather.csv', data => {
  console.log(data)

  const dailyData = getDailyData(data)

  const axisChart = getAxisChart()

  // select chart container, set datum, and apply the axis chart generator
  const chart = select('.chart')
    .datum(getChartData(dailyData))
    .call(axisChart)

  window.addEventListener('resize', function(){
    chart.call(axisChart)
  })
})

function getChartData (data) {
  const numberFormat = format('.2'),
        tempFormat = d => `${numberFormat(d)} F`,
        precipFormat = d => `${numberFormat(d)} Inches`

  return {
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
            values: data.map(d => {
              return {
                x: d.date,
                y: d.precipitation
              }
            }),
            annotations: [
              {
                x: new Date('2017-11-19'),
                y: 0.3,
                type: annotationCalloutCircle,
                note: { title: 'Peak Rainfall In November' },
                dx: -100,
                dy: -40,
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
            values: data.map(d => {
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
            values: data.map(d => {
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

function getAxisChart () {
  const monthFormat = timeFormat('%B'),
        dayFormat = timeFormat('%B %d')

  return chartAxis()
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

function getDailyData (data) {
  // retrieve mm-dd from the DATE column
  data.forEach(d => d.date = d.DATE.slice(-5))

  // get daily mean precip and temperatures values
  return nest()
    .key(d => d.date)
    .entries(data.filter(d => d.date !== '02-29'))
    .map(d => {
      return {
        date: new Date(`2017-${d.key}`),
        precipitation: mean(d.values, v => parseFloat(v.PRCP)),
        tempMin: mean(d.values, v => parseFloat(v.TMIN)),
        tempMax: mean(d.values, v => parseFloat(v.TMAX))
      }
    })
}
