// Libs
import * as Redis from 'ioredis'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

const address = localStorage.getItem('address')
const redis = new Redis(address)

// TODO: abstract
// Create a readable stream (object mode)
var stream = redis.scanStream()
var keys = []
stream.on('data', function (resultKeys) {
  // `resultKeys` is an array of strings representing key names
  for (var i = 0; i < resultKeys.length; i++) {
    keys.push(resultKeys[i])
  }
})

export default {
  name: 'panel-page',

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
      const res = await redis.get(this.activeKey)
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
