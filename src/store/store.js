import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    categories: [], // trivia categories
    currentCategory: { // chosen category
      name: 'Random',
      id: 9,
    },
    currentView: 'app-intro',
    questions: [], // current list of questions in game
    running: false, // game state
    round: 0, // round counter, starts at 0, ends at 9. Linked to display of current question
    scores: {
      playerOne: 0,
      playerTwo: 0,
    },
    solo: true, // Game mode, solo or multiplayer?
  },
  actions: {
    // Called by Starter.vue.
    startGame(context) {
      // Fetch batch of questions for specific category
      let api;
      // Determine if random (default) or chosen category
      if (context.state.currentCategory.name === 'Random') {
        api = 'https://opentdb.com/api.php?amount=10';
      } else {
        api = 'https://opentdb.com/api.php?amount=10&category=' + context.state.currentCategory.id;
      }
      console.log(api);
      Vue.http.get(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          context.commit('startGame', data.results);
        });
    },
  },
  getters: {
    // Get solo or multiplayer
    mode: state => {
      return state.solo;
    },
    round: state => {
      return state.round;
    },
  },
  mutations: {
    // Set game mode from Starter.vue
    selectMode: (state, payload) => {
      payload === true ? state.solo = true : state.solo = false;
    },
    // Set current category from Starter.vue
    setCurrentCategory: (state, payload) => {
      state.currentCategory.name = payload.name;
      state.currentCategory.id = payload.id;
    },
    startGame: (state, payload) => {
      // Set questions to payload from http request in startGame action
      state.questions = payload;
      // Set view to game board
      state.currentView = 'app-game-board';
      state.running = true;
    },
    // Set questions to payload from fetching in startGame action
    // setQuestions: (state, payload) => {
    //   state.questions = payload;
    // }
  }
});
