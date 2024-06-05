<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Add a team
      </v-card-title>
      <v-card-text>
        <v-select
            v-model="selectedTeam"
            :items="addableTeams"
            item-text="name"
            item-value="_id"
            label="Select a team"
        ></v-select>
      </v-card-text>
      <v-card-actions class="sticky-actions">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text :disabled="selectedTeam === null" @click="addTeamToOrg()">Add</v-btn>
      </v-card-actions>
    </v-card>

    <app-snackbar ref="snackbar"></app-snackbar>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppSnackbar from "@/components/snackbar.vue";

export default {
  name: 'AddTeamDialog',
  components: {AppSnackbar},
  data() {
    return {
      dialog: false,
      selectedTeam: null,
    };
  },
  computed: {
    ...mapGetters(['teamList', 'currentOrg']),
    addableTeams() {
      return this.teamList.filter(team => !this.currentOrg.teams.some(orgTeam => orgTeam._id === team._id));
    },
  },
  methods: {
    ...mapActions(['fetchTeams', 'addTeam']),
    async getTeams() {
      const res = await this.fetchTeams();
      console.log("JE GET LES TEAMS", res);
      if (res.error !== 0) {
        this.$refs.snackbar.show(res.data.data);
      }
    },
    async addTeamToOrg() {
      const res = await this.addTeam(this.selectedTeam);
      console.log("JE SUIS LA TEAM", this.selectedTeam);
      if (res.error !== 0) {
        this.$refs.snackbar.show(res.data.data);
      }
      this.selectedTeam = null;
      this.dialog = false;
    },
    show() {
      this.dialog = true;
    },
  },
  watch: {
    dialog(val) {
      if (val) {
        this.getTeams();
      }
    },
  },
};
</script>

<style>
.sticky-actions {
  position: sticky;
  bottom: 0;
  background-color: white;
}
</style>
