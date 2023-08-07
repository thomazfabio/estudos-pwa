<template>
  <v-container>
    <v-card style="margin: 0 auto; margin-top: 15px" :width="width" elevation="6" :loading="loading" class="pb-10">
      <v-card-title class="primary--text">Informações da conta</v-card-title>
      <v-divider></v-divider>
      <v-container class="d-flex" style="background: #f5f5f5"><v-avatar style="border: solid 1px #c5c5c5" size="105">
          <img :src="avatarURL" alt="" />
        </v-avatar>

        <v-btn style="margin-top: 75px; margin-left: 65px" absolute small color="personal_action_2 lighten-2" dark
          @click="btnUpAvatar()">
          <v-icon> mdi-camera </v-icon>
        </v-btn>
      </v-container>
      <v-divider></v-divider>
      <!--inicio codigo da tabela-->
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="text-left pr-2" width="10%">Nome:</th>
              <td class="text-left pl-0 pr-0">{{ userName }}</td>
              <td class="d-flex justify-end  align-center">
                <v-btn style="color: white" tile small color="personal_action_2 lighten-2"
                  @click="btnEditUser({ name: 'nome', value: '' + userName })">
                  <v-icon small> mdi-pencil </v-icon>
                </v-btn>
              </td>
            </tr>

            <tr>
              <th class="text-left pr-2">Email:</th>
              <td class="text-left pl-0 pr-0">{{ userEmail }}</td>
              <td class="d-flex justify-end  align-center">
                <v-btn style="color: white" tile small color="personal_action_2 lighten-2"
                  @click="btnEditUser({ name: 'email', value: null })">
                  <v-icon small> mdi-pencil </v-icon>
                </v-btn>
              </td>
            </tr>

            <tr>
              <th class="text-left pr-2">Telefone:</th>
              <td class="text-left pl-0 pr-0">{{ userPerfilCellPhone }}</td>
              <td class="d-flex justify-end  align-center">
                <v-btn style="color: white" tile small color="personal_action_2 lighten-2" @click="
                  btnEditUser({ name: 'telefone', value: '+556696112740' })
                  ">
                  <v-icon small> mdi-pencil </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!--fim codigo da tabela-->
      <v-divider></v-divider>
      <v-row>
        <v-btn class="ml-6 mt-10" small color="red" dark @click="deletar()">Deletar conta</v-btn>
      </v-row>
    </v-card>

    <!--Componente para editar dados de usuario-->
    <ModalEditUser :dataUser="dataEditUser" @closeModal="closeEditModal()" @updateUser="updateUser" v-if="editUser">
    </ModalEditUser>
    <!--###-->

    <ModalImgT :width="width" :isAvatar="true" typeImage="jpeg" :nameImage="userId" refImage="avatar" v-if="upAvatar"
      @closeModal="closeModal()">
    </ModalImgT>

    <!--Componente avançado ESDUDAR BEM-->
    <ModalAlert v-if="deleteAlert">
      <template v-slot:title> Tem certeza ? </template>

      <template v-slot:text>
        Apos deletar sua conta você será redirecinado para o inicio e não terá
        mais acesso a nenhuma de suas insformaçoes cadastradas aqui, você
        concorda?
      </template>

      <template v-slot:btn1>
        <v-btn outlined color="error" text @click="deleteAccount()">Confirmar</v-btn>
      </template>

      <template v-slot:btn2>
        <v-btn outlined color="success" text @click="fechaModalAlert()">Cancelar</v-btn>
      </template>
    </ModalAlert>
    <!--Componente avançado ESDUDAR BEM-->
  </v-container>
</template>


<script>
import { mapState } from "vuex";
import ModalImgT from "../components/ModalUpImage.vue"; // Modal para tratamento e upload da imagem
import ModalAlert from "../components/ModalAlert.vue";
import ModalEditUser from "../components/ModalEditUser.vue";
export default {
  components: {
    ModalAlert,
    ModalImgT,
    ModalEditUser,
  },
  name: "cardAccount",
  data: () => ({
    editUser: false,
    loading: false,
    deleteAlert: false,
    upAvatar: false,
    avatarURL: "",
  }),
  methods: {
    closeEditModal: function () {
      this.editUser = false;
    },
    btnEditUser: function (data) {
      this.$store.dispatch("setEditUser", data);
      this.editUser = true;
    },
    fechaModalAlert: function () {
      this.deleteAlert = false;
    },
    closeModal: function () {
      this.upAvatar = false;
    },
    deletar: function () {
      this.deleteAlert = true;
    },
    btnUpAvatar: function () {
      this.upAvatar = true;
    },
    deleteAccount: function () {
      this.$store.dispatch("deleteAccount", this.userId);
      this.fechaModalAlert();
    },
    // recupera dados do usuario no realtime database
    getDataUser() {
      const dataUserRef = this.$firebase.database().ref("users/" + this.userId);
      dataUserRef.on("value", (snapshot) => {
        const dataUser = snapshot.val();
        this.$store.dispatch("addProfileToUser", dataUser);
      });
    },
    getAvatarUrl() {
      var userId = this.userId;
      var imgRef = userId;
      var storageRef = this.$firebase.storage().ref();
      var avatarRef = storageRef.child("avatar/" + imgRef);
      avatarRef
        .getDownloadURL()
        .then((url) => {
          return (this.avatarURL = url);
        })
        .catch(() => {
          var imgRef = "avatar-default.png";
          var avatarRef = storageRef.child("avatar/" + imgRef);
          avatarRef.getDownloadURL().then((url) => {
            return (this.avatarURL = url);
          });
        });
    },
    //atualiza user
    updateUser(dataUserEdited) {
      
      try {
        //passa o nome a ser atualizado
        let firstName = dataUserEdited.firstName;
        let lastName = dataUserEdited.lastName;
        let path = "";
        
        //nome completo
        if (firstName != null && lastName != null && firstName.length > 0 && lastName.length > 0) {
          let fullName = firstName + " " + lastName;
          path = "users/" + this.userId;
          this.$store.dispatch("updateUserDataFirebase", {
            path: path,
            fullName: fullName,
            dataToUp: {
              firstname: firstName,
              lastname: lastName,
            },
            typeValue: "userName",
          });
        }//nome
        else if (firstName != null && firstName.length > 0) {
          let fullName = firstName + " " + this.userName.split(' ').slice(1).join(' ');
          path = "users/" + this.userId;
          this.$store.dispatch("updateUserDataFirebase", {
            path: path,
            fullName: fullName,
            dataToUp: {
              firstname: firstName,
            },
            typeValue: "userName",
          });
        }//sobrenome
        else if (lastName != null && lastName.length > 0) {
          let fullName = this.userName.split(' ')[0] + " " + lastName;
          path = "users/" + this.userId;
          this.$store.dispatch("updateUserDataFirebase", {
            path: path,
            fullName: fullName,
            dataToUp: {
              lastname: lastName,
            },
            typeValue: "userName",
          });
        }//nada
        else {
          console.log("nada");
        }
       
      
        //passa o telefone a ser atualizado
        if (dataUserEdited.cellPhone != null) {
          this.$store.dispatch("updateUserDataFirebase", {
            typeValue: "cellPhone",
            userId: this.userId,
            cellPhone: dataUserEdited.cellPhone,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapState({
      userId: (state) => {
        return state.currentUser.uid;
      },
      userEmail: (state) => {
        return state.currentUser.email;
      },
      userName: (state) => {
        return state.currentUser.displayName;
      },
      primaryAvatarURL: (state) => {
        return state.currentUser.photoURL;
      },
      dataEditUser: (state) => {
        return state.editUser;
      },
      //dados do estado userPerfil
      userPerfilCellPhone: (state) => {
        return state.currentUserPerfil.cellPhone;
      },
    }),

    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100vw";
        case "sm":
          return "70vw";
        case "md":
          return "60vw";
        case "lg":
          return "55vw";
        case "xl":
          return "50vw";
      }
    },
  },

  created() {
    this.getAvatarUrl();
    this.getDataUser();
  },
  updated() {
    this.getAvatarUrl();
  },
};
</script>