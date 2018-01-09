// Libs
const Redis = require('ioredis')

const address = localStorage.getItem('address')
const redis = new Redis(address)

// Create a readable stream (object mode)
var stream = redis.scanStream()
var keys = []
stream.on('data', function (resultKeys) {
  // `resultKeys` is an array of strings representing key names
  for (var i = 0; i < resultKeys.length; i++) {
    keys.push(resultKeys[i])
  }
})
stream.on('end', function () {
  console.log('done with the keys: ', keys)
})

export default {
  name: 'panel-page',

  data () {
    return {
      keys: [],
      content: '',
      newKey: '',
      activeKey: '',
      inserting: false
    }
  },

  watch: {
    activeKey (newVal) {
      console.log(newVal)
      this.loadValue()
    }
  },

  methods: {
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
      this.content = res
    },

    saveContent () {
      redis.set(this.activeKey, this.content)
    }
  },

  created () {
    stream.on('end', _ => { this.keys = keys })
  }
}
