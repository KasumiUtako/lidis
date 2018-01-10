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
      <item-list></item-list>
    </aside>
    <main>
      <!-- listItem -->
      <item-list></item-list>
      <section>
        <textarea class="textarea" ref="editor" contenteditable="true" :value="activeValue">
        </textarea>
      </section>
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
