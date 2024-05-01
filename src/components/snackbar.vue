<template>
  <v-snackbar :value="snackbar">
    {{ textSnackbar }}

    <template v-slot:action="{ attrs }">
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AppSnackbar',
  data() {
    return {
      snackbar: false,
      textSnackbar: '',
    };
  },
  methods: {
    show(text) {
      this.textSnackbar = text;
      this.snackbar = true;
    },
  },
};
</script>
