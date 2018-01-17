<template>
  <table class="table list">
    <thead>
      <tr>
        <slot name="keys"
              :item="item"
              v-for="item in keys">
        </slot>
      </tr>
    </thead>
    <tbody>
      <slot name="list"
            :index="index"
            :item="item"
            v-for="(item, index) in list">
      </slot>
    </tbody>
  </table>
</template>

<script>
// Vuex
export default {
  name: 'panel-page',

  props: {
    keys: {
      type: Array,
      default: _ => []
    },
    list: {
      type: [String, Array, Object],
      default: _ => []
    }
  }
}
</script>
