// Libs
import * as Redis from 'ioredis'
import RedisGetter from '@/lib/redisGetter'

// Components
import Modal from '@/components/Modal/index.vue'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

const address = localStorage.getItem('address')
const redis = new Redis(address)
const redisGetter = new RedisGetter(redis)

// TODO: abstract
// Create a readable stream (object mode)
const stream = redis.scanStream()
const keys = []
stream.on('data', async function (resultKeys) {
  // `resultKeys` is an array of strings representing key names
  for (var i = 0; i < resultKeys.length; i++) {
    keys.push({
      type: await redis.type(resultKeys[i]),
      value: resultKeys[i]
    })
  }
})

export default {
  name: 'panel-page',

  components: { Modal },

  data () {
    return {
      keys: [],
      newKey: '',
      inserting: false
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

    insertKey () {
      // redis
      redis.set(this.newKey, '')
      // client
      this.keys.push(this.newKey)
      this.newKey = ''
      this.inserting = false
    },

    async loadValue () {
      const { type, value } = this.activeKey
      const res = await redisGetter.getValue(type, value)
      this.setActiveValue(res)
    },

    saveContent (ev) {
      this.setActiveValue(ev.target.value)
      redis.set(this.activeKey, this.activeValue)
    }
  },

  created () {
    stream.on('end', _ => { this.keys = keys })
  }
}
