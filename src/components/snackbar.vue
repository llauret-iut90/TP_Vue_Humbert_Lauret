<template>
  <v-snackbar :value="isNotifMessage" @input="popNotifMessage">
    Error: {{ notifMessage }}

    <template v-slot:action="{ attrs }">
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="popNotifMessage"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'AppSnackbar',
  computed: {
    ...mapState(['isNotifMessage', 'notifMessage'])
  },
  methods: {
    ...mapMutations(['popNotifMessage'])
  }
};
</script>
