<template>
  <div>
    <div class = 'chart'>
      <!-- import font awesome for legend icons -->
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <chart-pie :data = 'chartData' :config = 'chartConfig'></chart-pie>
    </div>

    <pre class="language-html"><code>
&lt;template&gt;
  &lt;div class='chart'&gt;
    &lt;!-- import font awesome for legend icons --&gt;
    &lt;link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'&gt;
    &lt;chart-pie :data='chartData' :config='chartConfig'&gt;&lt;/chart-pie&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import { ChartPie } from 'vue-d2b'

  export default {
    data () {
      return {
        chartData: [
          {label: 'arc 1', value: 23},
          {label: 'arc 2', value: 31},
          {label: 'arc 3', value: 80},
          {label: 'arc 4', value: 8}
        ],

        chartConfig (chart) {
          chart.donutRatio(0.5)
        }
      }
    },

    components: {
      ChartPie
    }
  }
&lt;/script&gt;

&lt;style scoped&gt;
  .chart{
    width: 100%;
    height: 500px;
  }
&lt;/style&gt;</code></pre>
  </div>
</template>

<script>
  import { ChartPie } from '../src/'

  export default {
    data () {
      return {
        chartData: [
          {label: 'arc 1', value: 23},
          {label: 'arc 2', value: 31},
          {label: 'arc 3', value: 80},
          {label: 'arc 4', value: 8}
        ],

        chartConfig (chart) {
          chart.donutRatio(0.5)
        }
      }
    },

    components: {
      ChartPie
    }
  }
</script>

<style scoped>
  .chart{
    height: 100vw;
    max-height: 500px;
    margin-top: 40px;
  }
</style>
