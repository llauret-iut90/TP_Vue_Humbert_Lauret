<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-text-field label="Name" v-model="name" required></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="emitNameAndPassword()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddOrgDialog',
  data() {
    return {
      dialog: false,
      name: '',
      password: '',
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    emitNameAndPassword() {
      this.$emit('add-event', {name: this.name, secret: this.password});
    }
  },
};
</script>