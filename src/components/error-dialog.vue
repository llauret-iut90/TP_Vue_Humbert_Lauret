<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false; afterClosedFunc();">{{ closeBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ErrorDialog',
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
  },
};
</script>
