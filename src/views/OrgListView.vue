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
            <v-btn color="primary" @click="$refs.addDialog.show()">Add</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="org in filteredSearch" :key="org._id" @click="changeCurrentOrg(org._id)">
                <v-list-item-content>
                  <v-list-item-title>{{ org.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <add-org-dialog
        title="Add an organization"
        @add-event="addOrg"
        ref="addDialog"
    ></add-org-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import AddOrgDialog from "@/components/add-org-dialog.vue";

export default {
  name: 'OrgListView',
  components: {AddOrgDialog},
  data() {
    return {
      search: '',
      dialog: false,
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
    ...mapActions(['fetchOrgs', 'createOrg', 'fetchOrgById']),
    ...mapMutations(['pushNotifMessage']),
    ...mapGetters(['orgSecret']),
    /*
    * L'évenement émis par le composant AddDialog add-event envoie name et password
    * {name: this.name, secret: this.password});
    * ça envoie un payload qui est attribué à la méthode addOrg
    *         @add-event="addOrg"
    * Obligé d'émit parce que les props sont en read only
     */
    async addOrg({name, secret}) {
      const res = await this.createOrg({name, secret});
      this.dialog = false;

      if (res.error !== 0) {
        this.pushNotifMessage('Error:' + res.data.data);
      } else {
        this.pushNotifMessage('Success for org creation');
        this.$refs.addDialog.dialog = false;
      }
    },
    async changeCurrentOrg(orgId) {
      this.fetchOrgById(orgId).then(() => {
        if (!this.orgSecret) {
          this.$router.push('/auth').catch(() => {});
        } else {
          this.$router.push('/org').catch(() => {});
        }
      });
    },
  },
  async created() {
    const res = await this.fetchOrgs();
    if (res.error !== 0) {
      this.pushNotifMessage('Error:' + res.data.data);
    }
  },
}
</script>
