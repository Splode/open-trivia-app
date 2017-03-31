import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    categories: [], // trivia categories
    solo: true, // Game mode, solo or multiplayer?
  },
  mutations: {
    // Set game mode from Starter.vue
    selectMode: (state, payload) => {
      payload === true ? state.solo = true : state.solo = false;
    }
  }
});
