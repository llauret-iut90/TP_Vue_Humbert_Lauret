<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="light-blue lighten-4" dark max-width="600">
          <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Hero Info</v-card-title>
          </v-img>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Public Name</v-list-item-title>
                  <v-list-item-subtitle>{{ user.hero.publicName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Real Name</v-list-item-title>
                  <v-list-item-subtitle>{{ user.hero.realName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-title>Super Powers</v-card-title>
              <v-list-item v-for="(power, index) in user.hero.powers" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ power.name }}</v-list-item-title>
                  <v-list-item-subtitle>Level: {{ power.level }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-btn color="blue" @click="$refs.editHeroDialog.show(user.hero)">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <edit-hero-dialog ref="editHeroDialog" @edit-hero="editHero"></edit-hero-dialog>
  </v-container>


</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import EditHeroDialog from "@/components/edit-auth-hero.vue";

export default {
  name: 'HeroInfoView',
  components: {EditHeroDialog},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['currentUser', 'user']),
  },
  methods: {
    ...mapActions(['getUser', 'authEditHero']),
    ...mapMutations(['pushNotifMessage']),
    async editHero(member) {
      console.log('Edit member', member);
      const {_id, publicName, realName, powers} = member;
      const hero = {
        _id,
        publicName,
        realName,
        powers
      };
      const res = await this.authEditHero(hero);
      if (res.error === 0) {
        this.pushNotifMessage('Hero edited');
      } else {
        this.pushNotifMessage('Error:' + res.data.data);
      }
    },
  },
  async mounted() {
    await this.getUser(this.currentUser);
    console.log('currentUser', this.currentUser);
    console.log('user', this.user.hero)
  },
};
</script>