<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
        <v-card-title class="headline">Entrez le mot de passe</v-card-title>
        <v-card-text>
          <v-text-field v-model="password" type="password" label="Mot de passe"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="validatePassword">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" @click="dialog = true">Un secret ?</v-btn>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  props: {
    clicked: Boolean,
  },
  data() {
    return {
      dialog: false,
      password: '',
    };
  },
  methods: {
    validatePassword() {
      this.$store.commit('setOrgSecret', this.password);
      console.log('Password validated', this.password);
      this.dialog = false;
    },
  },
};
</script>