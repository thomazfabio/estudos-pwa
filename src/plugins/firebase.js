// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseApp = firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
});

//Aqui setamos o tipo de persistencia escolhida pelo usuario, PERSISTENCIA LOCAL ou PERSISTENCIA DE SESSÃO
const AuthPersistence = localStorage.AuthPersistence == 'true'
if (AuthPersistence) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
} else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}
//Fim bloco que seta persistencia

export default function install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase',
        {
            get() {
                return firebaseApp
            }
        })
}