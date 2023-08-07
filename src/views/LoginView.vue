<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 90vh"
  >
    <v-card
      :width="width"
      rounded
      class="personal_bg_card elevation-4 pa-2"
      style="margin: 0 auto"
    >
      <v-row no-gutters justify="center">
        <v-col>
          <p class="primary--text text--accent-4 d-flex display-1">Login</p>

          <v-alert dense outlined type="error" v-if="notificationUser">
            {{ notificationUser }}
          </v-alert>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Email"
                  placeholder="Seu email cadastrado"
                  outlined
                  dense
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  placeholder="Digite sua senha"
                  v-model="password"
                  :rules="passRules"
                  :append-icon="showEyePass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showEyePass ? 'text' : 'password'"
                  label="Senha"
                  required
                  @click:append="showEyePass = !showEyePass"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-checkbox
                class="mt-0"
                v-model="persist"
                :label="`Manter conectado`"
              ></v-checkbox>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-btn
                  large
                  @click="login()"
                  block
                  elevation="4"
                  depressed
                  color="personal_action_1"
                  style="color: white"
                  v-on:click="logged = true"
                  >Login</v-btn
                >
              </v-col>
            </v-row>
            <p class="d-flex justify-center" style="margin: 0">ou</p>
            <v-row>
              <v-col>
                <router-link style="text-decoration: none" to="register">
                  <v-btn
                    large
                    block
                    elevation="4"
                    depressed
                    color="personal_action_2"
                    style="color: white"
                    >Cadastrar</v-btn
                  ></router-link
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    persist: false,
    showEyePass: false,
    notificationUser: null,
    valid: true,
    password: "",
    email: "",
    nameRules: [
      (v) => !!v || "Password é requerido",
      (v) => v.length >= 6 || "Passwords não pode ter menos de 6 caracteres",
    ],
    passRules: [(v) => !!v || "Password é obrigatório"],
    emailRules: [
      (v) => !!v || "E-mail é requerido",
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/.test(v) ||
        "E-mail está inválido",
    ],
  }),
  methods: {
    async login() {
      const { email, password } = this;
      localStorage.AuthPersistence = this.persist;
      await this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.$router.replace({ name: "home" });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.notificationUser = errorMessage;
          console.log(errorMessage);
        });
    },
  },

  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100vw";
        case "sm":
          return "70vw";
        case "md":
          return "60vw";
        case "lg":
          return "30vw";
        case "xl":
          return "30vw";
      }
    },
  },
};
</script>