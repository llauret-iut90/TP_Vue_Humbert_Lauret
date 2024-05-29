<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Select an existing Hero
      </v-card-title>
      <v-card-text>
        <v-select
            :items="heroes"
            v-model="selectedHero"
            label="Select"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="emitSelectedHero()">Select</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'AddExistingHeroDialog',
  data() {
    return {
      dialog: false,
      selectedHero: null
    };
  },
  computed: {
    ...mapGetters(['heroesAliases', 'currentTeam', 'currentOrg']),
    heroes() {
      // Trouver l'équipe actuelle dans currentOrg
      const currentTeam = this.currentOrg.teams.find(team => team._id === this.currentTeam._id);
      if (!currentTeam) {return this.heroesAliases.map(hero => hero.publicName);}
      // Obtenir les IDs des membres de l'équipe actuelle
      const currentTeamMemberIds = currentTeam.members;
      // Filtrer heroesAliases pour exclure les membres de l'équipe actuelle
      return this.heroesAliases
          .filter(hero => !currentTeamMemberIds.includes(hero._id))
          .map(hero => hero.publicName);
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    emitSelectedHero() {
      this.$emit('add-existing-hero', this.selectedHero);
      console.log('Hero selected', this.selectedHero);
      this.dialog = false;
    }
  },
};
</script>