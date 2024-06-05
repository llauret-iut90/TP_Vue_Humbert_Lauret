<template>
  <v-container v-if="currentTeam.name">
    <v-card class="ma-lg-5">
      <v-card-title class="justify-lg-space-between">
        {{ currentTeam.name }}
        <div>
          <v-btn color="blue darken-1" @click="$refs.addHeroDialog.show()">
            <v-icon left>mdi-account-plus</v-icon>
            Create Member
          </v-btn>
          <v-btn color="green darken-1" @click="$refs.addExistingHeroDialog.show()">
            <v-icon left>mdi-account-multiple-plus</v-icon>
            Add existing hero
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        Number of Affiliations: <span style="color: blue">{{ currentTeam.nbAffiliations }}</span>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="4" v-for="member in teamMembers" :key="member._id">
        <v-card class="fixed-card">
          <v-card-title>
            {{ member[0].publicName }}
          </v-card-title>
          <v-card-subtitle>
            Real Name: {{ member[0].realName }}
          </v-card-subtitle>
          <v-card-text>
            <v-row v-for="(power, index) in member[0].powers" :key="index">
              <v-col cols="4">
                Power name: {{ power.name }}
              </v-col>
              <v-col cols="4">
                Power level: {{ power.level }}
              </v-col>
              <v-col cols="4">
                Power type: {{ power.type }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions style="position: absolute; bottom: 0; right: 0;">
            <v-spacer></v-spacer>
            <v-btn small color="blue darken-1" @click="$refs.editHeroDialog.show(member)">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
            <v-btn small color="red darken-1" @click="confirmRemoveMemberFromTeam(member)">
              <v-icon left>mdi-delete</v-icon>
              Remove from Team
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <alert-dialog ref="confirmDialog"
                  title="Confirm Delete"
                  :afterClosedFunc="removeConfirmedMemberFromTeam"
                  closeBtnText="Confirm">
      Are you sure you want to remove <span
        class="red">{{ this.memberToRemove ? this.memberToRemove[0].publicName : '' }}</span> from the team?
    </alert-dialog>

    <add-hero-dialog ref="addHeroDialog" @add-hero="addHero"></add-hero-dialog>
    <add-existing-hero-dialog ref="addExistingHeroDialog"
                              @add-existing-hero="addExistingHero"></add-existing-hero-dialog>
    <edit-hero-dialog ref="editHeroDialog" @edit-hero="editMember"></edit-hero-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import AddHeroDialog from "@/components/add-hero-dialog.vue";
import AddExistingHeroDialog from "@/components/add-existing-hero-dialog.vue";
import EditHeroDialog from "@/components/edit-team-member-dialog.vue";
import AlertDialog from "@/components/alert-dialog.vue";

export default {
  name: 'TeamView',
  components: {
    AlertDialog,
    EditHeroDialog,
    AddHeroDialog,
    AddExistingHeroDialog
  },
  data() {
    return {
      teamMembers: [],
      memberToRemove: null
    };
  },
  computed: {
    ...mapGetters(['currentTeam', 'teamList', 'currentOrg', 'heroesAliases'])
  },
  async created() {
    //Pour remplir le heroesAliases
    console.log('teammembers', this.teamMembers);
    await this.fetchHeroes();
    await this.fetchTeamMembers();
  },
  methods: {
    ...mapActions(['createHero', 'addHeroToTeam', 'fetchHeroes', 'fetchOrgById', 'removeHeroFromTeam', 'editHero', 'fetchHeroById']),
    ...mapMutations(['pushNotifMessage']),
    async addHero(heroData) {
      const {publicName, realName, powers} = heroData;
      const hero = {
        publicName,
        realName,
        powers
      };
      console.log('Hero to create', hero);
      const res = await this.createHero(hero);
      if (res.error === 0) {
        console.log('Hero created', res.data);
        await this.addHeroToTeam(res.data._id);
        await this.fetchTeamMembers();
        this.pushNotifMessage('Hero created and added to team');
      } else {
        this.pushNotifMessage('Error:' + res.data.data);
      }
    },
    async fetchTeamMembers() {
      try {
        console.log('Fetching team members');
        this.teamMembers = [];
        if (this.currentOrg._id !== undefined) {
          const res = await this.fetchOrgById(this.currentOrg._id);
          if (res.data.length > 0) {
            const teams = res.data[0].teams;
            // Trouver l'équipe actuelle
            const currentTeam = teams.find(team => team.name === this.currentTeam.name);
            console.log('Current team', currentTeam);
            if (currentTeam) {
              // Utiliser les identifiants des membres de l'équipe actuelle
              const memberIds = currentTeam.members;
              console.log('Member IDs of current team', memberIds);
              for (let i = 0; i < memberIds.length; i++) {
                try {
                  const res = await this.fetchHeroById(memberIds[i]);
                  console.log('Hero fetched', res.data);
                  this.teamMembers.push(res.data);
                } catch (error) {
                  console.error(`Error fetching hero with id ${memberIds[i]}: ${error}`);
                }
              }
              console.log('Team members', this.teamMembers);
            } else {
              console.log('No team members');
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching team members: ${error}`);
      }
    },
    async addExistingHero(selectedHero) {
      console.log('selectedHero', selectedHero);
      console.log('Add existing hero');
      // Recherche du héros dans heroesAliases en fonction du nom
      console.log('Heroes aliases', this.heroesAliases);
      const hero = this.heroesAliases.find(h => h.publicName === selectedHero);
      console.log('Hero found', hero);
      if (hero) {
        await this.addHeroToTeam(hero._id);
        await this.fetchTeamMembers();
      }
    },
    async editMember(member) {
      console.log('Edit member', member);
      const {_id, publicName, realName, powers} = member;
      const hero = {
        _id,
        publicName,
        realName,
        powers
      };
      console.log('Hero to edit', hero);
      const res = await this.editHero(hero);
      console.log('Edit member RESSSSS', res);
      if (res.error === 0) {
        console.log('Hero edited', res.data);
        await this.fetchTeamMembers();
        this.pushNotifMessage('Hero edited');
      } else {
        this.pushNotifMessage('Error:' + res.data.data);
      }
    },
    confirmRemoveMemberFromTeam(member) {
      this.memberToRemove = member;
      this.$refs.confirmDialog.show();
    },
    async removeConfirmedMemberFromTeam() {
      if (this.memberToRemove) {
        await this.removeMemberFromTeam(this.memberToRemove);
        this.memberToRemove = null;
      }
    },
    async removeMemberFromTeam(member) {
      console.log('member', member)
      const res = await this.removeHeroFromTeam(member[0]._id);
      console.log('Remove member from team', res);
      if (res.error === 0) {
        this.teamMembers = this.teamMembers.filter(m => m._id !== member[0]._id);
        await this.fetchTeamMembers();
        this.pushNotifMessage('Member removed from team');
      } else {
        this.pushNotifMessage('Error:' + res.data.data);
      }
    }
  },
};
</script>

<style scoped>
.fixed-card {
  height: 300px;
  overflow: auto;
}
</style>