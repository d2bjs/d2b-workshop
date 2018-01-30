import { chartPie } from 'd2b'
import generatorMixin from '../mixins/generatorMixin'

export default {
  mixins: [generatorMixin],
  props: {
    generator: {
      default: () => chartPie()
    }
  },
  data () {
    return { name: 'pie-chart' }
  }
}
