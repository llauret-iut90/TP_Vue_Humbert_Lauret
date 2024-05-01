<template>
  <v-container>
    <v-card>
      <v-card-title>
        Set a password
      </v-card-title>
      <v-card-text>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="changeSecret()">Add</v-btn>
      </v-card-actions>
    </v-card>

    <app-snackbar ref="snackbar"></app-snackbar>
  </v-container>
</template>

<script>
import AppSnackbar from "@/components/snackbar.vue";
import {mapActions} from "vuex";

export default {
  components: {AppSnackbar},
  data() {
    return {
      password: '',
    };
  },
  methods: {
    ...mapActions(['setOrgSecret']),
    changeSecret() {
      this.setOrgSecret(this.password);
      this.$refs.snackbar.show('Password set');
    },
  },
};
</script>
