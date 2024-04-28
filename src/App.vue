<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-btn @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn>Auth</v-btn>
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
export default {
  name: 'App',

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
  }
};
</script>

<style>
</style>
