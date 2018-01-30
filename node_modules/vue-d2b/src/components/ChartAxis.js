import { chartAxis } from 'd2b'
import generatorMixin from '../mixins/generatorMixin'

export default {
  mixins: [generatorMixin],
  props: {
    generator: {
      default: () => chartAxis()
    }
  },
  data () {
    return { name: 'axis-chart' }
  }
}
