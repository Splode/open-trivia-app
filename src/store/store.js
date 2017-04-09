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
    isGameOver: false, // game state
    isPaused: false,
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
      context.state.currentView = 'app-loader';
      // Fetch batch of questions for specific category
      let api;
      // Determine if random (default) or chosen category
      if (context.state.currentCategory.name === 'Random') {
        api = 'https://opentdb.com/api.php?amount=10';
      } else {
        api = 'https://opentdb.com/api.php?amount=10&category=' + context.state.currentCategory.id;
      }
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
    // Determine player turn
    turn: state => {
      let check = state.round % 2;
      if (check === 0 || state.round === 0) {
        return 'playerOne';
      } else {
        return 'playerTwo';
      }
    },
  },
  mutations: {
    // Set game over and show modal after 10 rounds
    isGameOver: state => {
      if (state.round === 9) {
        state.isGameOver = true;
      }
    },
    // Next round
    incrementRound: state => {
      state.round += 1;
    },
    // Increase player score upon correct answer
    incrementScore: (state, payload) => {
      if (payload === 'playerOne') {
        state.scores.playerOne += 1;
      } else {
        state.scores.playerTwo += 1;
      }
    },
    // Restart game with default state
    newGame: state => {
      state.currentCategory.name = 'Random';
      state.currentCategory.id = 9;
      state.currentView = 'app-intro';
      state.solo = true;
    },
    // Pause game state and disable answer buttons after submtting answer
    pauseGame: (state, payload) => {
      if (payload === 'pause') {
        state.isPaused = true;
      } else {
        state.isPaused = false;
      }
    },
    // Reset common default game parameters
    resetGame: state => {
      state.isGameOver = false;
      state.isPaused = false;
      state.questions = [];
      state.round = 0;
      state.scores.playerOne = 0;
      state.scores.playerTwo = 0;
    },
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
      // Creatd list of incorrect choices
      state.questions.forEach(el => {
        el.choices = el.incorrect_answers.reduce((acc, item) => {
          acc.push({
            text: item,
            answer: false,
            classes: {
              incorrect: false
            }
          });
          return acc;
        }, []);
        // Add correct answer
        el.choices.push({
          text: el.correct_answer,
          answer: true,
          classes: {
            correct: false,
          }
        });
        // Shuffle choices
        let i = el.choices.length, temp, rand;
        while (0 !== i) {
          rand = Math.floor(Math.random() * i);
          i -= 1;
          temp = el.choices[i];
          el.choices[i] = el.choices[rand];
          el.choices[rand] = temp;
        }

      });
      // Set view to game board
      state.currentView = 'app-game-board';
    },
    // Apply classes, which indicate correct or incorrect, to buttons after
    // submtting answer
    styleButtons: state => {
      state.questions[state.round].choices.forEach(el => {
        if (el.answer) {
          el.classes = { correct: true }
        } else {
          el.classes = { incorrect: true }
        }
      });
    }
  }
});
