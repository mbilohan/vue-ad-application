import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyAdModalComponent from '@/components/Ads/BuyAdModal'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-ad-modal', BuyAdModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBDP36fpgPiWdwVSXO8IqsN0KfEsm2pgf8',
      authDomain: 'vue-ad-project-6a32f.firebaseapp.com',
      databaseURL: 'https://vue-ad-project-6a32f.firebaseio.com',
      projectId: 'vue-ad-project-6a32f',
      storageBucket: 'vue-ad-project-6a32f.appspot.com',
      messagingSenderId: '866903339748'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
