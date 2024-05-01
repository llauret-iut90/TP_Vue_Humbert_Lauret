<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon left>mdi-office-building</v-icon>
        Organisation : {{ currentOrg }}
      </v-card-title>
      <v-card-subtitle>
        <v-chip color="red" text-color="white">
          ID: {{ $route.params.orgId }}
        </v-chip>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'OrgView',
  data() {
    return {};
  },
  computed: {
    ...mapState(['currentOrg'])
  },
  methods: {},
};
</script>
