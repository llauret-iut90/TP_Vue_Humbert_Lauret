<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        <v-icon left>mdi-office-building</v-icon>
        Organisation : {{ currentOrg.name }}
      </v-card-title>
      <v-card-subtitle>
        <v-chip color="red" text-color="white">
          ID: {{ currentOrg._id }}
        </v-chip>
      </v-card-subtitle>
    </v-card>

    <error-dialog title="Error" close-btn-text="Return to org list"
                  :after-closed-func="() => {this.$router.push('/orgList')}" ref="errorDialog">
      Nothing to show
    </error-dialog>

  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import ErrorDialog from "@/components/error-dialog.vue";

export default {
  name: 'OrgView',
  components: {ErrorDialog},
  data() {
    return {};
  },
  computed: {
    // un getter sinon ce petit con est undefined
    ...mapGetters(['currentOrg']),
  },
  methods: {},
  mounted() {
    if (!this.currentOrg || Object.keys(this.currentOrg).length === 0) {
      console.log('No org found');
      this.$refs.errorDialog.show();
    }
  },
};
</script>
