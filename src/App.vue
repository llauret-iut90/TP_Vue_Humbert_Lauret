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
        {title: 'Organisations', icon: 'mdi-home', to: '/'},
        {title: 'Org??', icon: 'mdi-information', to: '/about'},
        {title: 'Ekip667', icon: 'mdi-information', to: '/about'},
        {title: 'Ekip667??', icon: 'mdi-information', to: '/about'},
      ]
    }
  }
};
</script>

<style>
.v-btn {
  background: #fafafa;
  color: black;
}

.v-navigation-drawer {
  background-color: #fafafa;
}

.v-list-item {
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: #e0e0e0;
}
</style>
