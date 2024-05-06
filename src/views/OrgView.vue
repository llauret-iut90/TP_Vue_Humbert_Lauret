<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon left>mdi-office-building</v-icon>
        Organisation : {{ currentOrg.name }}
      </v-card-title>
      <v-card-subtitle>
        <v-chip color="red" text-color="white">
          ID: {{ currentOrg._id }}
        </v-chip>
      </v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item v-for="team in currentOrg.teams" :key="team._id"
                       @click="$refs.confirmDeleteDialog.show(); selectedTeamId = team._id;">
            <v-list-item-content>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item-content>
            <v-btn small color="error" @click.stop="deleteTeam(team._id)">Delete</v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <alert-dialog title="Error" close-btn-text="Return to org list"
                  :after-closed-func="() => {this.$router.push('/orgList')}" ref="errorDialog">
      Nothing to show
    </alert-dialog>

    <alert-dialog title="Confirmation" close-btn-text="Are you sure do you want to delete this team?"
                  :after-closed-func="() => {this.changeCurrentTeam()}" ref="confirmDeleteDialog">
      Nothing to show
    </alert-dialog>

    <app-snackbar ref="snackbar"></app-snackbar>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AlertDialog from "@/components/alert-dialog.vue";
import AppSnackbar from "@/components/snackbar.vue";

export default {
  name: 'OrgView',
  components: {AppSnackbar, AlertDialog},
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
    async changeCurrentTeam() {
      await this.setCurrentTeamFromId(this.selectedTeamId);
      await this.$router.push('/team');
    },
    async deleteTeam(teamId) {
      const res = await this.removeTeam(teamId);
      if (res.error === 0) {
        this.$refs.snackbar.show(`Team with id ${teamId} deleted`);
      } else {
        this.$refs.snackbar.show(`Error deleting team with id ${teamId}`);
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
