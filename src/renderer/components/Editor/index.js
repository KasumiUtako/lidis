// Libs
import RedisSock from '@/lib/redisSock'

// Components
import ItemList from '@/components/ItemList/index.vue'

// Vuex
import { mapState } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock(address)
const redisGetter = redisSock.Getter

export default {
  name: 'editor',

  components: { ItemList },

  data () {
    return {
      activeValue: '',
      activeValue2: '',
      keys: {
        hash: ['key'],
        set: ['members'],
        list: ['index', 'item'],
        zset: ['score', 'member']
      }
    }
  },

  computed: {
    ...mapState(['activeKey']),
    type () {
      return this.activeKey.type
    },
    value () {
      if (this.activeKey.type !== 'string') {
        return this.activeValue[this.activeValue2]
      }
      return this.activeValue
    }
  },

  watch: {
    activeKey () {
      this.loadValue()
    }
  },

  methods: {
    async loadValue () {
      let { type, value } = this.activeKey
      let result = await redisGetter.getValue(type, value)
      this.activeValue = result
      if (type !== 'hash') {
        this.activeValue2 = 0
      } else {
        this.activeValue2 = Object.keys(result)[0]
      }
    }
  }
}
