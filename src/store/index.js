import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseApp } from '../plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: false,
    currentUserPerfil: false,
    isSpinnerVisible: true,
    uploadImageStatus: null,
    editUser: false,
    updateUserPerfilStatus: null,
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    currentUserPerfil(state) {
      return state.currentUserPerfil
    },
    isSpinnerVisible(state) {
      return state.isSpinnerVisible
    },
    uploadImageStatus(state) {
      return state.uploadImageStatus
    },
    updateUserPerfilStatus(state) {
      return state.updateUserPerfilStatus
    },
  },
  mutations: {
    currentUser(state, payload) {
      state.currentUser = payload
    },
    addProfileToUser(state, payload) {
      state.currentUserPerfil = payload
    },
    isSpinnerVisible(state, payload) {
      state.isSpinnerVisible = payload
    },
    uploadImageStatus(state, payload) {
      state.uploadImageStatus = payload
    },
    updateUserPerfilStatus(state, payload) {
      state.updateUserPerfilStatus = payload
    },
    editUser(state, payload) {
      state.editUser = payload
    }
  },
  actions: {
    //aqui seleciona qual dados do usuario vai ser editado
    setEditUser(context, payload) {
      context.commit("editUser", payload)
    },

    //atualiza dados do usuario no banco firebase
    updateUserDataFirebase(context, payload) {
      const database = firebaseApp.database()
      const user = firebaseApp.auth().currentUser;
      const userId = payload.userId
      const dataType = payload.typeValue

      //caso o dado a ser atualizado seja o nome
      if (dataType == "userName") {
        let path = payload.path
        let dataToUp = payload.dataToUp
        database.ref(path).update(dataToUp).then(() => {
          user.updateProfile({
            displayName: payload.fullName
          }).then(() => {
            context.commit("updateUserPerfilStatus", "success")
          })
        }).catch((error) => { console.log(error) })
      }

      //caso o dado a ser atualizado seja o telefone
      if (dataType == "cellPhone") {
        let userdata = payload.cellPhone
        database.ref("users/" + userId).update({ cellPhone: userdata },
          //retorna erro ou sucesso
          (error) => {
            if (error) { console.log(error) }
            else {
              context.commit("updateUserPerfilStatus", "success")
              }
          }).then(() => {
          }).catch((error) => { console.log(error) });
      }
    },
    //adiciona o perfil baixado do reltimedabase ao state de userPerfil
    addProfileToUser(context, payload) {
      context.commit("addProfileToUser", payload)
    },
    setStatusUploadImage(context, payload) {
      context.commit("uploadImageStatus", payload)
    },
    setStatusUpdateUserProfile(context, payload) {
      context.commit("updateUserPerfilStatus", payload)
    },
    currentUser(context, payload) {
      context.commit("currentUser", payload)
    },
    isSpinnerVisible(context, payload) {
      context.commit("isSpinnerVisible", payload)
    },
    upImgFirebase(context, payload) {
      var storageRef = firebaseApp.storage().ref()
      var mountainsRef = storageRef.child(payload.RefImg + "/" + payload.nameImg);
      // 'file' comes from the Blob or File API
      mountainsRef.put(payload.img).on(
        "STATE_CHANGED",
        (snapshot) => {
          context.commit("uploadImageStatus", "uploading")
          //algo em tempo real sobre o upload
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
        }, (error) => {
          context.commit("uploadImageStatus", "error")
          console.log(error) // se ocorrer algum erro
        }, () => {
          // quando estiver feito o upload com sucesso
          context.commit("uploadImageStatus", "success")
        });
    },

    // deleta conta do usuario
    deleteAccount(context, payload) {
      const user = firebaseApp.auth().currentUser;
      const userUid = payload
      // deleta usuario
      user.delete().then(function () {
        // deleta dados do usuario no banco
        const database = firebaseApp.database()
        database.ref("users/" + userUid).remove().then(() => {
          context.commit("currentUser", false);
          console.log("User deleted.")
        }).catch((error) => { console.log(error) });
      }).catch(function (error) {
        console.log(error)
      });
    },
}})