import Vue from "vue";
import "./plugins/vuetify";
import * as firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import DateFilter from "./filters/date";
import { store } from "./store";

import AlertComp from "./components/Shared/Alert.vue";

Vue.filter("date", DateFilter);

Vue.config.productionTip = false;

Vue.component("app-alert", AlertComp);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyArDHXEvusspWWCjjQcYEZVYOUKWQEQmvI",
      authDomain: "meetup-b0a3b.firebaseapp.com",
      databaseURL: "https://meetup-b0a3b.firebaseio.com/",
      projectId: "meetup-b0a3b",
      storageBucket: "gs://meetup-b0a3b.appspot.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignin", user);
      }
    });
    this.$store.dispatch("loadAllMeetups");
  }
}).$mount("#app");
