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
            Équipes
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = true">Add</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="team in filteredSearch" :key="team._id" @click="changeCurrentTeam(team._id)">
                <v-list-item-content>
                  <v-list-item-title>{{ team.name }}</v-list-item-title>
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
          Add a team
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addTeam()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {
  name: 'TeamListView',
  data() {
    return {
      search: '',
      dialog: false,
      name: '',
      members: [],
    };
  },
  computed: {
    ...mapState({
      filteredSearch: function (state) {
        return state.team.teamList.filter(team => team.name.toLowerCase().includes(this.search.toLowerCase()));
      },
    }),
  },
  methods: {
    ...mapGetters(['currentTeam']),
    ...mapActions(['fetchTeams', 'createTeam', 'setCurrentTeamFromId']),
    ...mapMutations(['pushNotifMessage']),
    async addTeam() {
      const res = await this.createTeam(this.name);
      this.dialog = false;

      if (res.error !== 0) {
        this.pushNotifMessage('Error:' + res.data.data);
      } else {
        this.pushNotifMessage('Success for team creation');
      }
    },
    async changeCurrentTeam(teamId) {
      await this.setCurrentTeamFromId(teamId);
      await this.$router.push('/team').catch(() => {});
    },
  },
  async created() {
    console.log('currentTeam', this.currentTeam);
    const res = await this.fetchTeams();
    if (res.error !== 0) {
      this.pushNotifMessage('Error:' + res.data.data);
    }
  },
};
</script>
