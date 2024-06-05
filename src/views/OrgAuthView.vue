<template>
  <v-container>
    <v-card>
      <v-card-title>
        Set a password
      </v-card-title>
      <form @submit.prevent="changeSecret">
        <v-card-text>
          <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="submit">Add</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    ...mapActions(['setOrgSecret']),
    ...mapMutations(['pushNotifMessage']),
    changeSecret() {
      this.setOrgSecret(this.password);
      this.pushNotifMessage('Password set');
      this.$router.push('/orgList');
    },
  },
};
</script>
