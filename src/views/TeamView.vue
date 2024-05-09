<template>
  <v-container>
    {{ currentTeam }}
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'TeamView',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {},
};
</script>
