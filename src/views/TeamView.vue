<template>
  <v-container v-if="currentTeam.name">
    <v-card>
      <v-card-title class="justify-lg-space-between">
        {{ currentTeam.name }}
        <div>
          <v-btn color="blue darken-1" @click="$refs.addHeroDialog.show()">Create Member</v-btn>
          <v-btn color="green darken-1" @click="$refs.addExistingHeroDialog.show()">Add existing hero</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        Number of Affiliations: <span style="color: blue">{{ currentTeam.nbAffiliations }}</span>
      </v-card-text>
    </v-card>

    <v-card v-for="member in teamMembers" :key="member._id">
      <v-card-title>
        {{ member[0].publicName }}
      </v-card-title>
      <v-card-text>
        Real Name: {{ member[0].realName }}
        <div v-if="member[0].powers.length > 0">
          Power name: {{ member[0].powers[0].name }}
          <br>
          Power level: {{ member[0].powers[0].level }}
          <br>
          Power type: {{ member[0].powers[0].type }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" @click="editMember(member)">Edit</v-btn>
        <v-btn color="red darken-1" @click="removeMemberFromTeam(member)">Remove from Team</v-btn>
      </v-card-actions>
    </v-card>

    <add-hero-dialog ref="addHeroDialog" @add-hero="addHero"></add-hero-dialog>
    <add-existing-hero-dialog ref="addExistingHeroDialog"
                              @add-existing-hero="addExistingHero"></add-existing-hero-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AddHeroDialog from "@/components/add-hero-dialog.vue";
import AddExistingHeroDialog from "@/components/add-existing-hero-dialog.vue";

export default {
  name: 'TeamView',
  components: {
    AddHeroDialog,
    AddExistingHeroDialog
  },
  data() {
    return {
      teamMembers: [],
    };
  },
  computed: {
    ...mapGetters(['currentTeam', 'teamList', 'currentOrg', 'heroesAliases'])
  },
  async created() {
    //Pour remplir le heroesAliases
    await this.fetchHeroes();
    await this.fetchTeamMembers();
  },
  methods: {
    ...mapActions(['createHero', 'addHeroToTeam', 'fetchHeroes', 'fetchOrgById', 'removeHeroFromTeam', 'editHero', 'fetchHeroById']),

    async addHero(heroData) {
      const {publicName, realName, power} = heroData;
      const hero = {
        publicName,
        realName,
        power: power
      };
      const res = await this.createHero(hero);
      if (res.error === 0) {
        console.log('Hero created', res.data);
        await this.addHeroToTeam(res.data._id);
      }
    },
    async fetchTeamMembers() {
      try {
        console.log('Fetching team members');
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
                  console.log('Team members', this.teamMembers);
                } catch (error) {
                  console.error(`Error fetching hero with id ${memberIds[i]}: ${error}`);
                }
              }
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
    editMember(member) {
      console.log('Edit member', member);
    },
    async removeMemberFromTeam(member) {
      const res = await this.removeHeroFromTeam(member._id);
      if (res.error === 0) {
        this.teamMembers = this.teamMembers.filter(m => m._id !== member._id);
      }
    }
  },
};
</script>