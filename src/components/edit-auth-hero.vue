<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Edit Hero
        </v-card-title>
        <v-card-text>
          <v-text-field label="Public Name" v-model="publicName" required></v-text-field>
          <v-text-field label="Real Name" v-model="realName" required></v-text-field>
          <v-row v-for="(power, index) in powers" :key="index">
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
                      :min="0"
                      :max="7"
                      type="number"
                      required
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-account"
                      label="Power Level"
                      v-model="power.level"
                      :min="0"
                      :max="100"
                      type="number"
                      required
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn color="blue darken-1" @click="addPower">Add Power</v-btn>
          <v-btn color="red darken-1" @click="deletePower" v-if="powers.length > 2">Delete recent power</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="confirmEditMember">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <alert-dialog ref="confirmDialog"
                  title="Confirm Edit"
                  :afterClosedFunc="emitHeroData"
                  closeBtnText="Confirm">
      Are you sure you want to edit this member?
    </alert-dialog>
  </div>
</template>

<script>
import AlertDialog from "@/components/alert-dialog.vue";

export default {
  name: 'EditHeroDialog',
  components: {AlertDialog},
  data() {
    return {
      dialog: false,
      id: '',
      publicName: '',
      realName: '',
      powers: [{name: '', type: 0, level: 0}, {name: '', type: 0, level: 0}]
    };
  },
  methods: {
    show(member) {
      this.id = member._id;
      this.publicName = member.publicName;
      this.realName = member.realName;
      if (member.powers && member.powers.length > 0) {
        // deep copy of array
        this.powers = [];
        for (const obj of member.powers) {
          this.powers.push({...obj});
        }
      } else {
        this.powers = [{
          name: '',
          type: '',
          level: 0
        }];
      }
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
    confirmEditMember() {
      this.$refs.confirmDialog.show();
    },
    emitHeroData() {
      if (this.dialog) {
        this.$emit('edit-hero', {
          _id: this.id,
          publicName: this.publicName,
          realName: this.realName,
          powers: this.powers
        });
        console.log('power emit', this.powers);
        this.dialog = false;
      }
    }
  },
};
</script>