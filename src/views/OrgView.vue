<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon left>mdi-office-building</v-icon>
        Organisation : {{ currentOrg.name }}
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.addTeamDialog.show()">Add</v-btn>
      </v-card-title>
      <v-card-subtitle>
        <v-chip color="red" text-color="white">
          ID: {{ currentOrg._id }}
        </v-chip>
      </v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item v-for="team in currentOrg.teams" :key="team._id"
                       @click="changeCurrentTeam(team._id)">
            <v-list-item-content>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item-content>
            <v-btn small color="error" @click.stop="$refs.confirmDeleteDialog.show(); selectedTeamId = team._id;">
              Delete
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <alert-dialog title="Error" close-btn-text="Return to org list"
                  :after-closed-func="() => {this.$router.push('/orgList')}" ref="errorDialog">
      Nothing to show
    </alert-dialog>

    <alert-dialog title="Confirmation" close-btn-text="Are you sure do you want to delete this team?"
                  :after-closed-func="() => {this.deleteTeam()}" ref="confirmDeleteDialog">
    </alert-dialog>

    <add-team-dialog ref="addTeamDialog"></add-team-dialog>

    <app-snackbar ref="snackbar"></app-snackbar>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertDialog from "@/components/alert-dialog.vue";
import AppSnackbar from "@/components/snackbar.vue";
import AddTeamDialog from "@/components/add-team-dialog.vue";

export default {
  name: 'OrgView',
  components: {AddTeamDialog, AppSnackbar, AlertDialog},
  data() {
    return {
      selectedTeamId: '',
    };
  },
  computed: {
    // un getter sinon ce petit con est undefined
    ...mapGetters(['currentOrg']),
  },
  methods: {
    ...mapActions(['removeTeam', 'setCurrentTeamFromId']),
    async changeCurrentTeam(teamId) {
      await this.setCurrentTeamFromId(teamId);
      await this.$router.push('/team');
    },
    async deleteTeam() {
      const res = await this.removeTeam(this.selectedTeamId);
      if (res.error === 0) {
        this.$refs.snackbar.show(`Team with id ${this.selectedTeamId} deleted`);
      } else {
        this.$refs.snackbar.show(`Error deleting team with id ${this.selectedTeamId}`);
      }
    },
  },
  mounted() {
    if (!this.currentOrg || Object.keys(this.currentOrg).length === 0) {
      console.log('No org found');
      this.$refs.errorDialog.show();
    }
  },
};
</script>
