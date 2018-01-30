import { select, selectAll } from 'd3'
import { id } from 'd2b'

export default {
  template: `
    <div :class = '["vue-d2b-container", "vue-d2b-" + name]'></div>
  `,
  props: {
    data: { default: () => {} },
    config: { default: () => () => {} },
    duration: { default: 500 }
  },
  data () {
    return {
      unwatch: null,
      id: id()
    }
  },
  computed: {
    properties () {
      return {
        generator: this.generator,
        data: this.data,
        config: this.config
      }
    }
  },
  destroyed () {
    selectAll('.d2b-tooltip').remove()
    select(window).on(`resize.${this.id}`, null)
  },
  mounted () {
    this.updateDefer()
    select(window).on(`resize.${this.id}`, this.updateDefer)
  },
  methods: {
    unwatcher () {
      if (this.unwatch) this.unwatch()
    },
    watcher () {
      this.unwatcher()
      this.unwatch = this.$watch('properties', this.update, {deep: true})
    },
    update (options = {}) {
      this.unwatcher()
      this.$emit('beforeRender', this.$el, this.generator)

      const data = this.data

      this.config(this.generator)

      const el = select(this.$el)
      const elTransition = options.skipTransition ? el : el.transition().duration(this.duration)

      el.datum(data)

      elTransition.call(this.generator)

      this.$emit('rendered', this.$el, this.generator)
      this.watcher()
    },
    updateNow () {
      this.update({skipTransition: true})
    },
    updateDefer () {
      setTimeout(this.updateNow, 0)
    }
  }
}
