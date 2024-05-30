<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Add Hero
      </v-card-title>
      <v-card-text>
        <v-text-field label="Public Name" v-model="publicName" required></v-text-field>
        <v-text-field label="Real Name" v-model="realName" required></v-text-field>
        <v-row v-for="(power, index) in power" :key="index">
          <v-col cols="12">
            <v-card class="mb-5">
              <v-card-title>Power {{ index + 1 }}</v-card-title>
              <v-card-text>
                <v-text-field
                    prepend-icon="mdi-account"
                    label="Power Name"
                    v-model="power.name"
                    required
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-account"
                    label="Power Type"
                    v-model="power.type"
                    required
                ></v-text-field>
                <v-text-field
                    prepend-icon="mdi-account"
                    label="Power Level"
                    v-model="power.level"
                    type="number"
                    required
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="emitHeroData()">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditHeroDialog',
  data() {
    return {
      dialog: false,
      publicName: '',
      realName: '',
      power: []
    };
  },
  methods: {
    show(member) {
      this.publicName = member[0].publicName;
      this.realName = member[0].realName;
      if (member[0].powers && member[0].powers.length > 0) {
        this.power = member[0].powers;
      } else {
        this.power = [{
          name: '',
          type: '',
          level: 0
        }];
      }
      console.log('power', this.power);

      this.dialog = true;
    },
    emitHeroData() {
      this.$emit('edit-hero', {
        publicName: this.publicName,
        realName: this.realName,
        power: this.power
      });
      console.log('power emit', this.power);
      this.dialog = false;
    }
  },
};
</script>