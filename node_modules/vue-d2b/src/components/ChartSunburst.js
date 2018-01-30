import { chartSunburst } from 'd2b'
import generatorMixin from '../mixins/generatorMixin'

export default {
  mixins: [generatorMixin],
  props: {
    generator: {
      default: () => chartSunburst()
    }
  },
  data () {
    return { name: 'sunburst-chart' }
  }
}
