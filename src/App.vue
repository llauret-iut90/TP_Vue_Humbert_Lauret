<template>
  <v-app>
    <app-snackbar></app-snackbar>

    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-btn @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <div>
        <v-btn to="/hero-info" :color="isLoggedIn ? 'blue' : 'grey'">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        &nbsp;
      </div>
      &nbsp;
      <div>
        <v-btn to="/register" color="purple">Register</v-btn>
        &nbsp;
        <v-btn v-if="!isLoggedIn" to="/login" color="green"> Login</v-btn>
        <v-btn v-if="isLoggedIn" color="red" @click="myTimeHasCome"> Logout</v-btn>

        &nbsp;
        <v-btn to="/auth">Org secret</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        dark
        color="primary"
        width="250"
    >
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.title" :to="link.to">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppSnackbar from "@/components/snackbar.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {AppSnackbar},

  data() {
    return {
      drawer: false,
      links: [
        {title: 'Organisations', icon: 'mdi-domain', to: '/orgList'},
        {title: 'Current organisation', icon: 'mdi-domain', to: '/org'},
        {title: 'Teams', icon: 'mdi-account-group', to: '/teamList'},
        {title: 'Current team', icon: 'mdi-account-group', to: '/team'},
      ]
    }
  }, computed: {
    ...mapGetters(['isLoggedIn'])
  }, methods: {
    ...mapActions(['logout']),
    myTimeHasCome() {
      this.logout().then(() => {
        this.$router.push('/').catch(() => {
        });
      });
    }
  }
};
</script>

<style>
</style>
