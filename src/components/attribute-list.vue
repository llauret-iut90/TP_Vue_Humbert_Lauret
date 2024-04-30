<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ nom_attribut }}
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = true">Ajouter</v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="element in elementData" :key="element._id" :to="'/org/' + element._id">
                <v-list-item-content>
                  <v-list-item-title>{{ element.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Ajouter {{ nom_attribut }}
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="name" required></v-text-field>
          <div v-if="hasPassword">
            <v-text-field label="Password" v-model="password" type="password" required
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Fermer</v-btn>
          <v-btn color="blue darken-1" text @click="addElement">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
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
  </v-container>
</template>

<script>

export default {
  name: 'AttributeList',
  data() {
    return {
      dialog: false,
      name: '',
      password: '',
      snackbar: false,
      textSnackbar: '',
    };
  },
  props: {
    nom_attribut: {
      type: String,
      required: true,
    },
    elementData: {
      type: Array,
      required: true,
    },
    hasPassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addElement() {
      console.log('add element');
      this.$emit('add-element', {
        name: this.name,
        password: this.password,
      });
    },
  },
};
</script>
