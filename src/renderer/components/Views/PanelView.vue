<template>
  <div class="panel">
    <aside>
      <header class="aside-head">
        <div>Keys</div>
        <span class="icon">
          <span class="oi" data-glyph="plus"></span>
        </span>
      </header>
      <!-- ListItem -->
      <item-list :keys="keys" :list="list">
        <th slot="keys"
            slot-scope="{ item }"
            :key="item">
            {{ item }}
        </th>
        <tr slot="list"
            slot-scope="{ item }"
            @click="setActiveKey(item)"
            :style ="{ color: item.value === activeKey.value ? 'red' : '' }"
            :key="item.value">
          <td>{{ item.type }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </item-list>
    </aside>
    <main>
      <!-- <modal></modal> -->
      <editor></editor>
    </main>
  </div>
</template>

<style lang="scss">
  @mixin full($top: 0, $bottom: 0, $left: 0, $right: 0) {
    position: absolute;
    top: $top; bottom: $bottom; left: $left; right: $right;
  }

  .panel {
    width: 100vw;
    height: 100vh;
  }

  $aside-width: 300px;
  $padding-default: 12px 10px;
  aside {
    @include full($right: calc(100vw - #{$aside-width} - 17px));
    background-color: #333333;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $padding-default;
      color: #999;
      border-bottom: 1px solid #ccc;
    }

    .list {
      width: 100%;
      color: #fff;
      padding: $padding-default;
    }
  }

  main {
    @include full($left: $aside-width);
    background-color: pink;
  }
</style>

<script>
// Libs
import RedisSock from '@/lib/redisSock'

// Vuex
import { types } from '@/store/types'
import { mapState, mapMutations } from 'vuex'

// Redis
const address = localStorage.getItem('address')
const redisSock = RedisSock.getInstance(address)
const redisGetter = redisSock.Getter

export default {
  name: 'panel-page',

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
</script>
