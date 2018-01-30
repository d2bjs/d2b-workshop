import { select, csv, scaleTime, extent, nest, mean, format, axisBottom, timeFormat } from 'd3'
import { chartAxis, svgLine, svgArea } from 'd2b'
import { annotationCalloutCircle } from 'd3-svg-annotation'

csv('src/data/seattle_weather.csv', data => {
  data.forEach(d => d.monthDate = d.DATE.slice(-5))

  // get daily mean precip and temperatures values
  const dailyData = nest()
    .key(d => d.monthDate)
    .entries(data.filter(d => d.monthDate !== '02-29'))
    .map(d => {
      return {
        monthDate: new Date(`2017-${d.key}`),
        precipitation: mean(d.values, v => parseFloat(v.PRCP)),
        tempMin: mean(d.values, v => parseFloat(v.TMIN)),
        tempMax: mean(d.values, v => parseFloat(v.TMAX))
      }
    })

  // initialize formatters
  const dayFormat = timeFormat('%B %d'),
        monthFormat = timeFormat('%B'),
        numberFormat = format('.2'),
        tempFormat = d => `${numberFormat(d)} F`,
        precipFormat = d => `${numberFormat(d)} Inches`

  // initialize and configure axis chart
  const axis = chartAxis()
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
    .graphColor(d => d.color)
    .tooltipConfig(tooltip => {
      tooltip.title(rows => dayFormat(rows[0].x))
    })

  // select chart container and set datum
  const chart = select('.chart')
    .datum({
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
              values: dailyData.map(d => {
                return {
                  x: d.monthDate,
                  y: d.precipitation
                }
              }),
              annotations: [
                {
                  x: new Date('2017-11-18'),
                  y: 0.30,
                  type: annotationCalloutCircle,
                  note: { title: 'Peak Rainfall In November' },
                  dx: -100,
                  dy: -40,
                }
              ]
            },
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
              values: dailyData.map(d => {
                return {
                  x: d.monthDate,
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
              values: dailyData.map(d => {
                return {
                  x: d.monthDate,
                  y: d.tempMax
                }
              })
            }
          ]
        }
      ]
    })
    .call(axis)

  window.addEventListener('resize', function(){
    chart.call(axis)
  })
})
