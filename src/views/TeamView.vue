<template>
  <v-container v-if="currentTeam.name">
    <v-card>
      <v-card-title class="justify-lg-space-between">
        {{ currentTeam.name }}
        <v-btn color="blue darken-1" @click="$refs.addHeroDialog.show()">Add Member</v-btn>
      </v-card-title>
      <v-card-text>
        Number of Affiliations: <span style="color: blue">{{ currentTeam.nbAffiliations }}</span>
      </v-card-text>
    </v-card>

    <v-card v-for="member in teamMembers" :key="member._id">
      <v-card-title>
        {{ member.publicName }}
      </v-card-title>
      <v-card-text>
        Real Name: {{ member.realName }}
        Powers: {{ member.powers.join(', ') }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" @click="editMember(member)">Edit</v-btn>
        <v-btn color="red darken-1" @click="removeMemberFromTeam(member)">Remove from Team</v-btn>
      </v-card-actions>
    </v-card>

    <add-hero-dialog ref="addHeroDialog" @add-hero="addHero"></add-hero-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AddHeroDialog from "@/components/add-hero-dialog.vue";

export default {
  name: 'TeamView',
  components: {
    AddHeroDialog
  },
  data() {
    return {
      heroesAliases: [],
      teamMembers: [],
      publicName: '',
      realName: '',
      powers: []
    };
  },
  computed: {
    ...mapGetters(['currentTeam', 'teamList', 'currentOrg'])
  },
  methods: {
    ...mapActions(['createHero', 'addHeroToTeam', 'fetchHeroes', 'fetchOrgById', 'removeHeroFromTeam', 'editHero']),
    async addHero(heroData) {
      const res = await this.createHero(heroData);
      if (res.error === 0) {
        console.log('Hero created', res.data);
        await this.addHeroToTeam(res.data._id);
        this.teamMembers.push(res.data);
      }
    },
    async fetchTeamMembers() {
      console.log('Fetching team members');
      const res = await this.fetchOrgById(this.currentOrg._id);
      if (res.error === 0 && res.data[0].teams && res.data[0].teams.length > 0) {
        this.teamMembers = res.data[0].teams.find(t => t._id === this.currentTeam._id).members;
      }
      console.log('Team members', this.teamMembers);
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
  created() {
    this.fetchTeamMembers();
  }
};
</script>