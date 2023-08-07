import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase, { firebaseApp } from '../src/plugins/firebase'


Vue.use(firebase)
Vue.config.productionTip = false




new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

//service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

