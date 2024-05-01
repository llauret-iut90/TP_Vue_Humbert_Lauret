<template>
  <v-container style="max-height: 100vh; overflow-y: auto;">
    <v-container>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
      ></v-text-field>
    </v-container>
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
              <v-list-item v-for="org in filteredSearch" :key="org._id" :to="'/org/' + org._id">
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
          Ajouter une organisation
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Fermer</v-btn>
          <v-btn color="blue darken-1" text @click="addOrg()">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <app-snackbar ref="snackbar"></app-snackbar>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import AppSnackbar from "@/components/snackbar.vue";

export default {
  name: 'OrgListView',
  components: {AppSnackbar},
  data() {
    return {
      search: '',
      dialog: false,
      name: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      filteredSearch: function (state) {
        return state.org.orgList.filter(org => org.name.toLowerCase().includes(this.search.toLowerCase()));
      },
    }),
  },
  methods: {
    ...mapActions(['fetchOrgs', 'createOrg']),
    async addOrg() {
      const res = await this.createOrg({name: this.name, secret: this.password});
      this.dialog = false;

      if (res.error !== 0) {
        this.$refs.snackbar.show(res.data.data);
      } else {
        this.$refs.snackbar.show('Success for org creation');
      }
    }
  },
  async created() {
    const res = await this.fetchOrgs();
    if (res.error !== 0) {
      this.$refs.snackbar.show(res.data.data);
    }
  },
}
</script>
