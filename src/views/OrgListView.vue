<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Organisations
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = true">Add</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="org in orgList" :key="org._id" :to="'/org/' + org._id">
                <v-list-item-content>
                  <v-list-item-title>{{ org.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Add Organisation
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addOrg()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'OrgListView',
  data() {
    return {
      dialog: false,
      name: '',
      password: '',
      snackbar: false,
      textSnackbar: '',
    };
  },
  computed: {
    ...mapState(['orgList']),
  },
  methods: {
    ...mapActions(['fetchOrgs', 'createOrg']),
    async addOrg() {
      const res = await this.createOrg({name: this.name, secret: this.password});
      this.dialog = false;
      this.snackbar = true;
      if (res.error !== 0) {
        this.textSnackbar = res.data.data;
      } else {
        this.textSnackbar = 'Succès pour la création de l\'organisation'
      }
    }
  },
  async created() {
    const res = await this.fetchOrgs();
    if (res.error !== 0) {
      this.snackbar = true;
      this.textSnackbar = res.data.data;
    }
  },
};
</script>
