<template>
  <div>
    <div class = 'chart'>
      <!-- import font awesome for breadcrumb icons -->
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <chart-sunburst :data = 'chartData'></chart-sunburst>

      <pre class="language-html"><code>
&lt;template&gt;
  &lt;div class='chart'&gt;
    &lt;chart-sunburst :data='chartData'&gt;&lt;/chart-sunburst&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import { ChartSunburst } from 'vue-d2b'

  export default {
    data () {
      return {
        chartData: {
          label: 'root',
          children: [
            {
              label: 'child 1',
              children: [
                {
                  label: 'child 1-1',
                  size: 10
                },
                {
                  label: 'child 1-2',
                  children: [
                    {
                      label: 'child 1-2-1',
                      size: 5
                    },
                    {
                      label: 'child 1-3-1',
                      size: 8
                    }
                  ]
                },
                {
                  label: 'child 1-3',
                  children: [
                    {
                      label: 'child 1-3-1',
                      children: [
                        {
                          label: 'child 1-3-1-1',
                          size: 2
                        },
                        {
                          label: 'child 1-3-1-2',
                          size: 5
                        }
                      ]
                    },
                    {
                      label: 'child 1-3-2',
                      size: 8
                    }
                  ]
                }
              ]
            },
            {
              label: 'child 2',
              size: 25
            }
          ]
        }
      }
    },

    components: {
      ChartSunburst
    }
  }
&lt;/script&gt;

&lt;style&gt;
  .chart{
    width: 100%;
    height: 500px;
  }

  /* media query to force hide breadcrumbs when the screen is too small */
  @media screen and (max-width: 500px) {
    .d2b-breadcrumbs-frame {
      display: none;
      width: 0px !important;
    }
  }
&lt;/style&gt;</code></pre>
    </div>
  </div>
</template>

<script>
  import chartData from './sunburstData'
  import { ChartSunburst } from '../src/'

  export default {
    components: {
      ChartSunburst
    },

    data () {
      return {
        chartData
      }
    }
  }
</script>

<style>
  .chart{
    height: 100vw;
    max-height: 500px;
    margin-top: 40px;
  }

  @media screen and (max-width: 500px) {
    .d2b-breadcrumbs-frame {
      display: none;
      width: 0px !important;
    }
  }
</style>
