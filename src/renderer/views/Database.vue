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

      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="setCurrentKey(item)">
        <md-table-cell md-label="键(Key)">{{ item.key }}</md-table-cell>
        <md-table-cell md-label="类型">{{ item.type }}</md-table-cell>
      </md-table-row>
    </md-table>

    <form novalidate class="md-layout-item md-size-40 md-small-size-100" @submit.prevent="newKeyFormSubmit">
      <md-card>

        <md-card-header>
          <div class="md-title">新建键值对</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <md-field>
                <label for="key">新键名</label>
                <md-input name="key" id="key" v-model="form.key" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-radio
                v-for="(type, idx) in supportTypes"
                v-model="form.type"
                :value="type"
                :key="idx"
              >
                {{type}}
              </md-radio>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">提交</md-button>
        </md-card-actions>

      </md-card>
    </form>

    <div>{{JSON.stringify(current)}}</div>

    <md-button class="md-icon-button md-raised button-theme">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ItemState } from '@/store/modules/redisState';

const namespace = 'redis';

@Component
export default class Database extends Vue {
  search: string = '';
  searched = [];
  form = {
    key: '',
    type: ''
  };

  get fakeList() {
    return this.keys.map(({ key, type }) => ({ key, type }));
  }

  @Getter('supportTypes', { namespace })
  supportTypes: string[];

  @Getter('keys', { namespace })
  keys: ItemState[];

  @Getter('current', { namespace })
  current: {};

  @Action('getItemsByKey', { namespace })
  getItemsByKey: any;

  @Action('setCurrentKey', { namespace })
  setCurrentKey: any;

  @Action('newKey', { namespace })
  newKey: any;

  public searchOnTable() {
    this.getItemsByKey(this.search || '*');
  }
  public newKeyFormSubmit() {
    this.newKey(this.form);
  }

  public created() {
    this.getItemsByKey(this.search || '*');
  }
}
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.button-theme {
  position: absolute;
  right: 0;
  bottom: 10px;
}
</style>