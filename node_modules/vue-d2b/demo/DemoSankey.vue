<template>
  <div>
    <div class = 'chart'>
      <chart-sankey :data = 'chartData' :config = 'chartConfig'></chart-sankey>
    </div>

    <pre class="language-html"><code>
&lt;template&gt;
  &lt;div class='chart'&gt;
    &lt;chart-sankey :data='chartData' :config='chartConfig'&gt;&lt;/chart-sankey&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import { ChartSankey } from 'vue-d2b'

  export default {
    data () {
      return {
        chartData: {
          nodes: [
            {name: 'Node A'},
            {name: 'Node B'},
            {name: 'Node C'},
            {name: 'Node D'},
            {name: 'Node E'}
          ],
          links: [
            {source: 'Node A', target: 'Node E', value: 2},
            {source: 'Node A', target: 'Node C', value: 2},
            {source: 'Node B', target: 'Node C', value: 2},
            {source: 'Node B', target: 'Node D', value: 2},
            {source: 'Node C', target: 'Node D', value: 2},
            {source: 'Node C', target: 'Node E', value: 2},
            {source: 'Node D', target: 'Node E', value: 4}
          ]
        },

        chartConfig (config) {
          config
            .sankey()
            .sankey()
            .nodePadding(100)

          config
            .sankey()
            .nodeDraggableY(true)
        }
      }
    },

    components: {
      ChartSankey
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
  import { ChartSankey } from '../src/'

  export default {
    data () {
      return {
        chartData: {
          nodes: [
            {name: 'Node A'},
            {name: 'Node B'},
            {name: 'Node C'},
            {name: 'Node D'},
            {name: 'Node E'}
          ],
          links: [
            {source: 'Node A', target: 'Node E', value: 2},
            {source: 'Node A', target: 'Node C', value: 2},
            {source: 'Node B', target: 'Node C', value: 2},
            {source: 'Node B', target: 'Node D', value: 2},
            {source: 'Node C', target: 'Node D', value: 2},
            {source: 'Node C', target: 'Node E', value: 2},
            {source: 'Node D', target: 'Node E', value: 4}
          ]
        },

        chartConfig (config) {
          config
            .sankey()
            .sankey()
            .nodePadding(100)

          config
            .sankey()
            .nodeDraggableY(true)
        }
      }
    },

    components: {
      ChartSankey
    }
  }
</script>

<style scoped>
  .chart{
    height: 100vw;
    max-height: 700px;
    margin-top: 40px;
  }
</style>
