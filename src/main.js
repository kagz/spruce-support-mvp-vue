window._ = require('lodash');
//window.axios = require('axios');
window.jQuery = window.$ = require('jquery');
import Vue from 'vue'
import 'metismenu'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import 'jquery-slimscroll/jquery.slimscroll.min'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.min.css";
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'
import './assets/js/inspinia'


// Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VuetifyDialog, { context: { vuetify } })
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCa2VuBK_54uSIygqegmguYVJiaCk9gliU',
      authDomain: 'kamagera-aa372.firebaseapp.com',
      databaseURL: 'https://kamagera-aa372.firebaseio.com/',
      projectId: 'kamagera-aa372',
      storageBucket: 'gs://kamagera-aa372.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')

// /* eslint-disable no-new */
// new Vue({
//   /* eslint-disable */ 
//   //el: '#app',
 
// })
