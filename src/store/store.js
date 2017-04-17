import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    aboutShow: false, // Show or hide About menu
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
      playerOne: {
        history: [],
        total: 0,
      },
      playerTwo: {
        history: [],
        total: 0,
      }
    },
    solo: true, // Game mode, solo or multiplayer?
    starPower: false, // show starPower animation
  },
  // =============== ACTIONS ===============
  actions: {
    // Call starPower mutation and set delay toggle
    starPower(context) {
      context.commit('starPower');
      let vm = context;
      setTimeout(() => {
        vm.state.starPower = false;
      }, 1600);
    },
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
  // ========== GETTERS ============
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
  // ============ MUTATIONS ===============
  mutations: {
    // Toggle display of about menu
    aboutToggle: state => {
      state.aboutShow = !state.aboutShow;
    },
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
      state.scores.playerOne.total = 0;
      state.scores.playerTwo.total = 0;
      state.scores.playerOne.history = [];
      state.scores.playerTwo.history = [];
    },
    // Score after answering question
    score: (state, payload) => {
      let player = payload.mode;
      if (payload.true) {
        state.scores[player].history.push({
          correct: true,
          incorrect: false,
        });
        state.scores[player].total += 1;
      } else {
        state.scores[player].history.push({
          correct: false,
          incorrect: true,
        });
      }
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
    // Call starPower
    starPower: (state) => {
      state.starPower = true;
    },
    startGame: (state, payload) => {
      // Set questions to payload from http request in startGame action
      state.questions = payload;
      // Create list of incorrect choices
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
