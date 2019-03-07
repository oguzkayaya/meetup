import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/40/11600_Ge%C3%A7itli-S%C3%B6%C4%9F%C3%BCt-Bilecik%2C_Turkey_-_panoramio_%2815%29.jpg",
        id: "qwe11231",
        title: "Bilecik Buluşması",
        date: "2020-07-12",
        location: "Bilecik Sultan Market Üstü",
        description: "Bilecik Buluşma Açıklaması"
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1280px-Paris_Night.jpg",
        id: "asdh121",
        title: "Meetup in Paris",
        date: "2019-09-11",
        location: "Paris",
        description: "Desctiptiron paris meetup"
      }
    ],
    user: null,
    loading: null,
    error: null
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id == meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearErrors(state) {
      state.error = null;
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: Math.random() * 1000
      };
      //Firebase ekle bunu kaydet
      commit("createMeetup", meetup);
    },
    signUpUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearErrors");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signInUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearErrors");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    clearErrors({ commit }) {
      commit("clearErrors");
    }
  }
});
