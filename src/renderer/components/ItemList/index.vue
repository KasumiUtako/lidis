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

<script src="./index.js">
</script>
