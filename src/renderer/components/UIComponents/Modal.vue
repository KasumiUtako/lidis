<template>
  <div class="columns">
    <div class="column is-5">
      <label class="label">Key Name:</label>
      <input class="input" v-model="newKey" />
      <label class="label">Type:</label>
      <div class="select">
        <select v-model="selectType">
          <option>string</option>
          <option>hash</option>
          <option>set</option>
          <option>zset</option>
          <option>list</option>
        </select>
      </div>
      <div>
        <label class="label">Fuck:</label>
        <button @click="cancel" class="button is-white">Cancel</button>
        <button @click="addKey" class="button is-primary">Create NewKey</button>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>
