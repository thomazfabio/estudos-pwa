<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 90vh"
  >
    <v-card class="personal_bg_card pa-5" :width="width" style="margin: 0 auto">
      <v-row>
        <v-col>
          <h1 class="d-flex justify-center primary--text">Cadastrar</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p
            class="d-flex justify-center font-weight-bold"
            style="font-size: small"
          >
            Preencha os campos abaixo para criar sua conta
          </p>
        </v-col>
      </v-row>

      <v-form v-model="valid">
        <v-alert
          dense
          outlined
          type="error"
          v-if="detectedRulesErrors.length > 0"
        >
          Todos os campos devem ser <strong>preenchidos corretamente</strong>
        </v-alert>
        <v-row dense>
          <v-col>
            <v-text-field
              label="Nome"
              placeholder="Seu primeiro nome"
              outlined
              dense
              v-model="firstname"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              label="Sobrenome"
              placeholder="Seu sobrenome"
              outlined
              dense
              v-model="lastname"
              :rules="lastNameRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              label="E-mail"
              placeholder="Seu e-mail"
              outlined
              dense
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              label="Senha"
              placeholder="Sua senha"
              outlined
              dense
              :append-icon="showEyePass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showEyePass ? 'text' : 'password'"
              @click:append="showEyePass = !showEyePass"
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              outlined
              dense
              :append-icon="showEyePassCheck ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showEyePassCheck ? 'text' : 'password'"
              @click:append="showEyePassCheck = !showEyePassCheck"
              v-model="passwordCheck"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-alert dense outlined type="error" v-if="!passwordEquals">
          As senhas devem ser <strong>iguais</strong>
        </v-alert>

        <v-row>
          <v-col>
            <router-link style="text-decoration: none" to="register">
              <v-btn
                class="personal_action_1"
                style="color: white"
                large
                block
                elevation="4"
                depressed
                @click="register()"
                >Cadastrar</v-btn
              ></router-link
            >
          </v-col>
        </v-row>

        <v-row align-content="center" justify="center">
          <p class="pr-2" style="margin: 0; font-size: small">
            Já tem uma conta?
          </p>
          <router-link style="text-decoration: none" to="login">
            <p class="" style="margin: 0; color: primary; font-size: small">
              Entrar
            </p>
          </router-link>
        </v-row>
        <v-row align-content="center" justify="center">
          <p class="pr-2" style="margin: 0; font-size: small">ou</p>
        </v-row>
        <v-row align-content="center" justify="center">
          <p class="pr-2" style="margin: 0; font-size: small">
            Vá para a página inicial
          </p>
          <router-link style="text-decoration: none" to="home">
            <p class="" style="margin: 0; color: primary; font-size: small">
              Home
            </p>
          </router-link>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { updateProfile } from "@firebase/auth";

export default {
  name: "formNewUser",
  data: () => ({
    detectedRulesErrors: [],
    showEyePass: false,
    showEyePassCheck: false,
    valid: false,
    firstname: "",
    lastname: "",
    password: "",
    passwordCheck: "",
    email: "",
    nameRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) => v.length <= 20 || "O nome deve ter menos de 20 caracteres",
      (v) => v.length >= 3 || "O nome deve ter no mínimo 3 caracteres",
    ],
    lastNameRules: [
      (v) => !!v || "Sobrenome é obrigatório",
      (v) => v.length <= 30 || "O sobrenome deve ter menos de 30 caracteres",
      (v) => v.length >= 2 || "O sobrenome deve ter no mínimo 2 caracteres",
    ],
    passwordRules: [
      (v) => !!v || "Password é obrigatório",
      (v) => v.length >= 6 || "Password deve conter no mínimo 6 caracteres",
    ],
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/.test(v) ||
        "E-mail deve ser válido",
    ],
  }),
  methods: {
    // logica para testar as regras de validação
    register() {
      let rulesErros = [];
      this.nameRules.forEach((e) => {
        if (e(this.firstname) !== true) {
          rulesErros.push(e(this.firstname));
        }
      });
      this.lastNameRules.forEach((e) => {
        if (e(this.lastname) !== true) {
          rulesErros.push(e(this.lastname));
        }
      });
      this.passwordRules.forEach((e) => {
        if (e(this.password) !== true) {
          rulesErros.push(e(this.password));
        }
      });
      this.emailRules.forEach((e) => {
        if (e(this.email) !== true) {
          rulesErros.push(e(this.email));
        }
      });

      if (
        this.password === this.passwordCheck &&
        this.password != "" &&
        rulesErros.length == 0
      ) {
        // se tudo estiver ok
        this.registerFire(); //chama a função para registrar o usuario
      } else {
        if (this.password !== this.passwordCheck) {
          rulesErros.push("As senhas devem ser iguais");
        }
        // caso algo de errado
      }
      this.detectedRulesErrors = rulesErros;
    },
    //...

    // logica para registrar um novo usuario
    async registerFire() {
      const { firstname, lastname, password, email } = this;
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(email, password, firstname, lastname)
        .then((userCredential) => {
          // Signed in
          var userId = userCredential.user.uid;
          console.log(userCredential);
          const storage = this.$firebase.storage().ref();
          storage
            .child("avatar/avatar-default.png")
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              userCredential.user.updateProfile({
                displayName: firstname + " " + lastname,
                photoURL: url,
              });
            });
          // Guardar dados de perfil
          this.$firebase
            .database()
            .ref("users/" + userId)
            .set({
              id: userId,
              firstname: firstname,
              lastname: lastname,
              email: email,
            })
            .then(() => {
              this.$router.replace({ name: "home" });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    },
  },

  computed: {
    // teste se as senhas fornecidas no imput são iguais
    passwordEquals() {
      let passIsEqual = this.password === this.passwordCheck;
      return passIsEqual;
    },
    //...

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