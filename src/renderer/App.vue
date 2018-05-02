<template>
  <div class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">{{title}}</span>
          </div>
          
            <!-- <md-autocomplete
              v-if="isDatabaseView"
              class="search"
              v-model="selectedEmployee"
              :md-options="[]"
              md-layout="box">
              <label>Search...</label>
            </md-autocomplete> -->

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list @click="menuVisible = false">
          <md-list-item to="/db">
            <md-icon>storage</md-icon>
            <span class="md-list-item-text">我的数据库</span>
          </md-list-item>
          <md-list-item to="/config">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">数据库连接设置</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.search {
  max-width: 640px;
}
</style>
<script lang="ts">
import Vue from 'vue';

import { Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class App extends Vue {
  menuVisible: boolean = false;

  // 数据库昵称
  @Getter('databaseName') databaseName: string;

  // isDBRouter
  get isDatabaseView() {
    return this.$route.path === '/db';
  }

  get title() {
    return `Liøis - "${this.databaseName}"`;
  }

  public created() {
    this.$store.dispatch('redis/connectRedis');
  }
}
</script>
