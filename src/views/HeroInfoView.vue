<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Hero Info
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Public Name</v-list-item-title>
                  <v-list-item-subtitle>publicName</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Real Name</v-list-item-title>
                  <v-list-item-subtitle>realName</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Powers</v-list-item-title>
                  <v-list-item-subtitle>powers</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
export default {
  name: 'HeroInfoView',
  data() {return {}},
};
</script>
