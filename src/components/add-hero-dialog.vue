<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Add Hero
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Public Name" v-model="publicName"
                        :rules="[rules.required, rules.uniqueName]"></v-text-field>
          <v-text-field label="Real Name" v-model="realName" :rules="[rules.required]"></v-text-field>
          <div v-for="(power, index) in powers" :key="index">
            <v-text-field label="Power Name" v-model="power.name" :rules="[rules.required]"></v-text-field>
            <v-select
                :items="powerTypes"
                item-text="text"
                item-value="value"
                v-model="power.type"
                label="Power Type"
                :rules="[rules.required]"
            ></v-select>
            <v-text-field label="Power Level" v-model="power.level" type="number" :min="0" :max="100"
                          :rules="[rules.required]"></v-text-field>
          </div>
          <v-btn color="blue darken-1" @click="addPower">Add Power</v-btn>
          <v-btn color="red darken-1" @click="deletePower" v-if="powers.length > 2">Delete recent power</v-btn>
        </v-form>
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
import {mapGetters} from "vuex";

export default {
  name: 'AddHeroDialog',
  data() {
    return {
      powerTypes: [
        {text: 'Strengh', value: 1},
        {text: 'Speed', value: 2},
        {text: 'Stamina', value: 3},
        {text: 'Dark Magic', value: 4},
        {text: 'Frightening', value: 5},
        {text: 'THE SPY', value: 6},
        {text: 'Dumb af', value: 7},
      ],
      dialog: false,
      publicName: '',
      realName: '',
      powers: [{name: '', type: 0, level: 0}, {name: '', type: 0, level: 0}],
      rules: {
        required: value => !!value || 'Required.',
        uniqueName: value => !this.heroesAliases.some(hero => hero.publicName === value) || 'Name already exists.',
      },
    };
  },
  computed: {
    ...mapGetters(['heroesAliases']),
  },
  watch: {
    powers: {
      handler(powers) {
        powers.forEach(power => {
          if (power.level < 0) power.level = 0;
          if (power.level > 100) power.level = 100;
        });
      },
      deep: true
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    addPower() {
      this.powers.push({name: '', type: 0, level: 0});
    },
    deletePower() {
      if (this.powers.length > 2) {
        this.powers.pop();
      }
    },
    emitHeroData() {
      if (this.$refs.form.validate()) {
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
    }
  },
};
</script>