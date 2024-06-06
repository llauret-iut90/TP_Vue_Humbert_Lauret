<template>
  <v-snackbar :value="isNotifMessage" @input="popNotifMessage">
    {{ notifMessage }}

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
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'AppSnackbar',
  computed: {
    ...mapGetters(['isNotifMessage', 'notifMessage'])
  },
  methods: {
    ...mapMutations(['popNotifMessage'])
  }
};
</script>
