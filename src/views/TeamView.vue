<template>
  <v-container>
    {{ currentTeam }}
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'TeamView',
  data() {
    return {};
  },
  computed: {
    ...mapState(['currentTeam'])
  },
  methods: {},
};
</script>
