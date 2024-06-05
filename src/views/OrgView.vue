<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon left>mdi-office-building</v-icon>
        Organisation : {{ currentOrg.name }}
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.addTeamDialog.show();">Add</v-btn>
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
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import AlertDialog from "@/components/alert-dialog.vue";
import AddTeamDialog from "@/components/add-team-dialog.vue";

export default {
  name: 'OrgView',
  components: {AddTeamDialog, AlertDialog},
  data() {
    return {
      selectedTeamId: '',
    };
  },
  computed: {
    // un getter sinon ce petit con est undefined
    ...mapGetters(['currentOrg', 'teamList']),
  },
  methods: {
    ...mapActions(['removeTeam', 'setCurrentTeamFromId', "fetchTeams"]),
    ...mapMutations(['pushNotifMessage']),
    async changeCurrentTeam(teamId) {
      await this.fetchTeams();
      console.log('teamList', this.teamList)
      console.log('changeCurrentTeam', teamId);
      await this.setCurrentTeamFromId(teamId);
      await this.$router.push('/team').catch(() => {});
    },
    async deleteTeam() {
      console.log('delete team with id', this.selectedTeamId);
      const res = await this.removeTeam(this.selectedTeamId);
      if (res.error === 0) {
        this.pushNotifMessage(`Team with id ${this.selectedTeamId} deleted`);
      } else {
        this.pushNotifMessage(`Error deleting team with id ${this.selectedTeamId}`);
      }
    },
  },
  async mounted() {
    if (!this.currentOrg || Object.keys(this.currentOrg).length === 0) {
      console.log('No org found');
      this.$refs.errorDialog.show();
    }
  },
};
</script>
