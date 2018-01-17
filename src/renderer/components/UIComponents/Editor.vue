<template>
  <div style="display: flex">
    <section>
      <item-list v-if="type && type != 'string'" :keys="keys[type]" :list="activeValue">
        <th slot="keys"
            slot-scope="{ item }"
            :key="item">
          {{ item }}
        </th>
        <tr @click="activeValue2 = index"
            slot="list"
            slot-scope="{ index, item }"
            :style ="{ color: index === activeValue2 ? 'red' : '' }"
            :key="index">
          <template v-if="type === 'list' || type === 'zset'">
            <td>{{ index }}</td>
            <td>{{ item }}</td>
          </template>
          <template v-if="type === 'hash'">
            <td>{{ index }}</td>
          </template>
          <template v-if="type === 'set'">
            <td>{{ item }}</td>
          </template>
        </tr>
      </item-list>
    </section>
    <textarea class="textarea" ref="editor" contenteditable="true" :value="value"></textarea>
  </div>
</template>

<script>
// Libs
import RedisSock from '@/lib/redisSock'

// Vuex
import { mapState } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock.getInstance(address)
const redisGetter = redisSock.Getter

export default {
  name: 'editor',

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
</script>
