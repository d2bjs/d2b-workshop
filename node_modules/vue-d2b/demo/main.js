// This file will build the demo

import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from './Demo'
import DemoAxis from './DemoAxis'
import DemoPie from './DemoPie'
import DemoSankey from './DemoSankey'
import DemoSunburst from './DemoSunburst'
import DemoGenerator from './DemoGenerator'
import Prism from 'prismjs'

import './styles.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'axis', path: '/', alias: '/axis', component: DemoAxis },
    { name: 'pie', path: '/pie', component: DemoPie },
    { name: 'sankey', path: '/sankey', component: DemoSankey },
    { name: 'sunburst', path: '/sunburst', component: DemoSunburst },
    { name: 'generator', path: '/generator', component: DemoGenerator }
  ]
})

Vue.mixin({
  mounted () {
    Prism.highlightAll()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Demo/>',
  components: { Demo },
  router
})
