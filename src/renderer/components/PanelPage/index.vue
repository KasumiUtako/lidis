<template>
  <div class="panel">
    <aside>
      <!-- search-bar -->
      <!-- control-panel -->
      <header class="aside-head">
        <div>Keys</div>
        <span @click="inserting = !inserting" class="icon">
          <span class="oi" data-glyph="plus"></span>
        </span>
      </header>
      <div v-if="inserting">
        <input class="input" v-model="newKey" @keydown.enter="insertKey" type="text" placeholder="Key Name" />
      </div>
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
    </aside>
    <main>
      <textarea class="textarea" ref="editor" contenteditable="true" :value="activeValue" @change="saveContent">

      </textarea>
    <modal></modal>
      
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
    @include full($right: calc(100vw - #{$aside-width}));
    background-color: #fff;

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
      padding: $padding-default;
    }
  }
  main {
    @include full($left: $aside-width);
    background-color: pink;
  }
</style>
<script src="./index.js">
</script>
