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
            Équipes
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = true">Add</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="element in filteredSearch" :key="element._id" @click="getTeamById(element._id)">
                <v-list-item-content>
                  <v-list-item-title>{{ element.name }}</v-list-item-title>
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
          Ajouter une équipe
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addTeam()">Ajouter</v-btn>
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
  <!--      :nom_attribut="'Équipes'"-->
  <!--      :elementData="teamList"-->
  <!--      :hasPassword="false"-->
  <!--      @add-element="addTeam"-->
  <!--  >-->
  <!--  </AttributeList>-->
</template>

<script>
import {mapActions, mapState} from 'vuex';
import AttributeList from "@/components/attribute-list.vue";
import PasswordForm from "@/components/password-form.vue";

export default {
  name: 'TeamListView',
  components: {PasswordForm, AttributeList},
  data() {
    return {
      search: '',
      dialog: false,
      name: '',
      members: [],
      snackbar: false,
      textSnackbar: '',
    };
  },
  computed: {
    ...mapState(['teamList']),
    filteredSearch() {
      return this.teamList.filter(team => team.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    ...mapActions(['fetchTeams', 'createTeam']),
    async getTeamById(id) {
      // faudra mettre la méthode pour obtenir les détails de l'équipe via l'organisation
      await this.$router.push({name: 'team', params: {teamId: id}});
    },
    async addTeam() {
      const res = await this.createTeam({name: this.name});
      console.log(res);
      this.dialog = false;
      this.snackbar = true;
      if (res.error !== 0) {
        this.textSnackbar = res.data.data;
      } else {
        this.textSnackbar = 'Succès pour la création de l\'équipe'
      }
    }
  },
  async created() {
    const res = await this.fetchTeams();
    if (res.error !== 0) {
      this.snackbar = true;
      this.textSnackbar = res.data.data;
    }
  },
};
</script>
