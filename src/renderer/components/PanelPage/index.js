// Libs
import RedisSock from '@/lib/redisSock'

// Components
import ItemList from '@/components/ItemList/index.vue'
import Modal from '@/components/Modal/index.vue'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock(address)
const redisGetter = redisSock.Getter

export default {
  name: 'panel-page',

  components: { ItemList, Modal },

  data () {
    return {
      keys: []
    }
  },

  computed: mapState(['activeKey', 'activeValue']),

  watch: {
    activeKey (newVal) {
      this.loadValue()
    }
  },

  methods: {
    ...mapMutations({
      'setActiveKey': types.SET_ACTIVE_KEY,
      'setActiveValue': types.SET_ACTIVE_VALUE
    }),

    async loadValue () {
      const { type, value } = this.activeKey
      const res = await redisGetter.getValue(type, value)
      this.setActiveValue(res)
    }

  }
}
