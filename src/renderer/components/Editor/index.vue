<template>
  <div style="display: flex">
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
    <textarea class="textarea" ref="editor" contenteditable="true" :value="value"></textarea>
  </div>
</template>

<script src="./index.js">
</script>
