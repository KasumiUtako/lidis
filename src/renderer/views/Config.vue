<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                <div class="md-title">数据库连接设置</div>
                </md-card-header>

                <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="host">主机地址</label>
                        <md-input name="host" id="host" v-model="form.host" :disabled="sending" />
                        <span class="md-error">The first name is required</span>
                        <span class="md-error">Invalid first name</span>
                    </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="port">端口号</label>
                        <md-input type="number" name="port" id="port" v-model="form.port" :disabled="sending" />
                        <span class="md-error">The last name is required</span>
                        <span class="md-error">Invalid last name</span>
                    </md-field>
                    </div>
                </div>

                <md-field>
                    <label for="password">密码</label>
                    <md-input type="password" name="password" id="password" v-model="form.password" autocomplete="password" :disabled="sending" />
                    <span class="md-error">The password is required</span>
                    <span class="md-error">Invalid email</span>
                </md-field>

                <md-field>
                    <label for="name">数据库匿称</label>
                    <md-input type="name" name="name" id="name" v-model="form.name" :disabled="sending" />
                    <span class="md-error">The email is required</span>
                    <span class="md-error">Invalid email</span>
                </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">更新</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { ConnectionConfig } from '@/store/state';

const namespace = 'redis';

type ValidateClass = {
  'md-invalid': boolean;
};

@Component
export default class ConfigView extends Vue {
  form: ConnectionConfig;

  sending: boolean = false;
  userSaved: boolean = false;
  lastUser: string = 'fake-user';

  @Getter('databaseConfig') databaseConfig: ConnectionConfig;
  @Mutation('updateDatabaseConfig') updateDatabaseConfig: any; // 处理这里的mutation类型

  public getValidationClass(fieldName: string): ValidateClass {
    return {
      'md-invalid': true
    };
  }

  public validateUser() {
    this.updateDatabaseConfig(this.form);
  }

  public created() {
    this.form = { ...this.databaseConfig };
  }
}
</script>
