// Libs
import RedisSock from '@/lib/redisSock'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock(address)
const redisGetter = redisSock.Getter

export default {
  name: 'panel-page',

  data () {
    return {
      keys: []
    }
  },

  computed: mapState(['activeKey', 'activeValue']),

  methods: {
    ...mapMutations({
      'setActiveKey': types.SET_ACTIVE_KEY,
      'setActiveValue': types.SET_ACTIVE_VALUE
    })
  },

  async created () {
    const keys = await redisGetter.getAllItem()
    this.keys = keys
  }
}
