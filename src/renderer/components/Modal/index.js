// Libs
import RedisSock from '@/lib/redisSock'

// Vuex
// import { types } from '@/store/types'
// import { mapState, mapMutations } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock.getInstance(address)
const redisSetter = redisSock.Setter

export default {
  name: 'modal',

  data () {
    return {
      newKey: '',
      selectType: 'string'
    }
  },

  methods: {
    cancel () {
      // close modal
    },
    addKey () {
      // emit list update
      redisSetter.setValue(this.selectType, this.newKey)
    }
  }
}
