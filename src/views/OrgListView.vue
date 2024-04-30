<template>
  <v-container style="max-height: 100vh; overflow-y: auto;">
    <password-form :clicked="true"></password-form>
    <div>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
      ></v-text-field>
    </div>
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
              <v-list-item v-for="org in this.filteredSearch" :key="org._id" @click="getOrgById(org._id)">
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
  <!--  <AttributeList-->
  <!--      :nom_attribut="'Organisations'"-->
  <!--      :elementData="orgList"-->
  <!--      :hasPassword="true"-->
  <!--      @add-element="addOrg"-->
  <!--  >-->
  <!--  </AttributeList>-->
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import AttributeList from "@/components/attribute-list.vue";
import PasswordForm from "@/components/password-form.vue";

export default {
  name: 'OrgListView',
  components: {PasswordForm, AttributeList},
  data() {
    return {
      search: '',
      dialog: false,
      name: '',
      password: '',
      snackbar: false,
      textSnackbar: '',
    };
  },
  computed: {
    ...mapState(['orgList', 'orgSecret']),
    filteredSearch() {
      return this.orgList.filter(org => org.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    ...mapActions(['fetchOrgs', 'createOrg', 'fetchOrgById']),
    ...mapMutations(['setOrgSecret', 'setCurrentOrg']),
    async getOrgById(orgId) {
      await this.fetchOrgById(orgId);
      await this.$router.push({name: 'org', params: {orgId}});
    },
    async addOrg() {
      const res = await this.createOrg({name: this.name, secret: this.password});
      this.dialog = false;
      this.snackbar = true;
      if (res.error !== 0) {
        this.textSnackbar = res.data.data;
      } else {
        this.textSnackbar = 'Succès pour la création de l\'organisation'
        this.setOrgSecret(this.password)
      }
    }
  },
  async created() {
    const res = await this.fetchOrgs();
    console.log(res);
    if (res.error !== 0) {
      this.snackbar = true;
      this.textSnackbar = res.data.data;
    }
  },
}
</script>
