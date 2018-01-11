// Vuex
export default {
  name: 'panel-page',

  props: {
    keys: {
      type: Array,
      default: _ => []
    },
    list: {
      type: [String, Array, Object],
      default: _ => []
    }
  }
}
