<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Add Hero
      </v-card-title>
      <v-card-text>
        <v-text-field label="Public Name" v-model="publicName" required></v-text-field>
        <v-text-field label="Real Name" v-model="realName" required></v-text-field>
        <div v-for="(power, index) in powers" :key="index">
          <v-text-field label="Power Name" v-model="power.name" required></v-text-field>
          <v-text-field label="Power Type" v-model="power.type" type="number" required></v-text-field>
          <v-text-field label="Power Level" v-model="power.level" type="number" required></v-text-field>
        </div>
        <v-btn color="blue darken-1" @click="addPower">Add Power</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="emitHeroData()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddHeroDialog',
  data() {
    return {
      dialog: false,
      publicName: '',
      realName: '',
      powers: [{name: '', type: 0, level: 0}, {name: '', type: 0, level: 0}]
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    addPower() {
      this.powers.push({name: '', type: 0, level: 0});
    },
    emitHeroData() {
      this.$emit('add-hero', {
        publicName: this.publicName,
        realName: this.realName,
        powers: this.powers
      });
      this.dialog = false;
      this.publicName = '';
      this.realName = '';
      this.powers = [{name: '', type: 0, level: 0}, {name: '', type: 0, level: 0}];
    }
  },
};
</script>