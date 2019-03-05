import Vue from "vue";
import Vuex from "vuex";

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
        description: 'Bilecik Buluşma Açıklaması'
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1280px-Paris_Night.jpg",
        id: "asdh121",
        title: "Meetup in Paris",
        date: "2019-09-11",
        location: "Paris",
description: 'Desctiptiron paris meetup'
      }
    ],
    user: {
      id: "qqqqqqqe123s",
      registeredMeetups: ["qwe11231"]
    }
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
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
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
    }
  }
});
