<template>
  <v-dialog :value="dialog" max-width="500px" @click:outside="closeDialog">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDialog"> Cancel</v-btn>
        <v-btn text @click="closeDialog">{{ closeBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AlertDialog',
  props: {
    title: {
      type: String,
      required: true,
    },
    closeBtnText: {
      type: String,
      default: 'Close',
    },
    afterClosedFunc: {
      type: Function,
      default: () => {
      },
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.afterClosedFunc();
    },
  },
};
</script>