<template>
  <v-app style="background-color: #EBEBEB;">
    <Spinner />
    <v-main>
      <v-card  style="border-radius: 0px" class="mx-auto overflow-auto personal_bg_1" height="100vh">
        <v-app-bar height="40px" color="primary" dark>
          <v-app-bar-nav-icon v-if="isLogged" @click="drawer = true"></v-app-bar-nav-icon>
          <v-toolbar-title>Web App 1.0</v-toolbar-title>
        </v-app-bar>
        <router-view></router-view>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
              <router-link style="text-decoration: none" to="/">
                <v-list-item @click="drawer = false">
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link style="text-decoration: none" to="/account">
                <v-list-item @click="drawer = false">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Minha conta</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link style="text-decoration: none" to="/setup">
                <v-list-item @click="drawer = false">
                  <v-list-item-icon>
                    <v-icon>mdi-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Configuração</v-list-item-title>
                </v-list-item>
              </router-link>
              <v-list-item @click="logout()">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import { async } from "@firebase/util";

import Spinner from "./components/Spinner.vue";

export default {
  name: "App",
  components: {
    Spinner,
  },
  data: () => ({
    logged: null, //ainda não utilizado
    drawer: false,
    group: null,
  }),
  methods: {
    async logout() {
      localStorage.AuthPersistence = false;
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log("Sign-out successful");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
  computed: {
    //esta função que esta sendo utilizada para renderizar ou não o template do app
    isLogged: function () {
      return (this.logged = this.$store.getters.currentUser);
    },
  },
};
</script>