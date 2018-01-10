<template>
  <table class="table list">
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr
          :key="item.value"
          :style="{
            color: item.value == activeKey ? 'red' : ''
          }"
          v-for="item in keys"
          @click="setActiveKey(item)">
        <td>{{ item.type }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./index.js">
</script>
