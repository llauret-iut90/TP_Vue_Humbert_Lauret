<template>
  <v-container>

    <v-card
        max-width="400"
        class="mx-auto"
    >

      <v-card-title class="headline">
        Auth
      </v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
        >
          <v-text-field
              v-model="loginName"
              :rules="loginRules"
              :error-messages="nameError"
              @input="nameError=null"
              label="Login"
          ></v-text-field>

          <v-text-field
              v-model="password"
              :rules="passwordRules"
              :error-messages="passError"
              label="Password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              counter
              @click:append="showPass = !showPass"
              @input="passError=null"
          ></v-text-field>

        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
          Ok
        </v-btn>

        <v-btn
            color="error"
            class="mr-4"
            @click="reset"
        >
          Reset
        </v-btn>

        <v-btn
            color="warning"
            @click="toHome"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'DirectLogin',
  data: () => ({
    loginName: "",
    loginRules: [
      v => !!v || 'Nom obligatoire'
    ],
    password: "",
    passwordRules: [
      v => !!v || 'mot de passe obligatoire',
    ],
    valid: false,
    showPass: false,
    nameError: null,
    passError: null,
  }),
  computed: {},
  methods: {
    ...mapMutations(['pushNotifMessage']),
    ...mapActions(['login']),
    async validate() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        let user = {
          login: this.loginName,
          password: this.password
        };
        let response = await this.login(user);
        console.log(response)
        if (response.error === 0) {
          this.toHeroInfo()
        } else {
          this.pushNotifMessage('Invalid login')
          this.reset()
        }
      }
    },
    reset() {
      this.valid = false;
      this.$refs.form.reset();
    },
    toHeroInfo() {
      this.$router.push('/hero-info').catch(() => {})
    },
    toHome() {
      this.$router.push('/').catch(() => {})
    }
  },
};
</script>
