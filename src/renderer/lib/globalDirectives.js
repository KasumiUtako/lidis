import { directive as onClickaway } from 'vue-clickaway'

export default {
  install (Vue) {
    Vue.directive('click-outside', onClickaway)
  }
}
