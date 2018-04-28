<template>
  <div class="md-layout">
    <md-table class="md-layout-item md-size-40" v-model="fakeList" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">数据库</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="输入Key进行搜索" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No keys found"
        :md-description="`No keys found for this '${search}' query. Try a different search term or create a new user.`">
        <md-button class="md-primary md-raised" @click="newKey">创建新Key</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="键(Key)">{{ item.key }}</md-table-cell>
        <md-table-cell md-label="类型">{{ item.type }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

const namespace = 'redis';

@Component
export default class Database extends Vue {
  search: string = '';
  searched = [];

  get fakeList() {
    return this.keys.map(({ key, type }) => ({ key, type }));
  }

  @Getter('keys', { namespace })
  keys: Object[];

  @Action('getItemsByKey', { namespace })
  getItemsByKey: any;

  public searchOnTable() {
    this.getItemsByKey(this.search || '*');
  }
  public newKey() {}

  public created() {
    this.getItemsByKey(this.search || '*');
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>