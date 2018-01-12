// Libs
import RedisSock from '@/lib/redisSock'

// Components
import ItemList from '@/components/ItemList/index.vue'
import Modal from '@/components/Modal/index.vue'
import Editor from '@/components/Editor/index.vue'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock.getInstance(address)
const redisGetter = redisSock.Getter

export default {
  name: 'panel-page',

  components: { ItemList, Modal, Editor },

  data () {
    return {
      keys: [
        'type',
        'name'
      ],
      list: []
    }
  },

  computed: mapState(['activeKey']),

  async mounted () {
    this.list = await redisGetter.getAllItem()
  },

  methods: {
    ...mapMutations({
      'setActiveKey': types.SET_ACTIVE_KEY
    })
  }
}
