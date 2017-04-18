<template lang="html">
  <div>
    <h3>{{ questions[round].category }}</h3>
    <h2>{{ decodedQuestion }}</h2>
    <ul>
      <li v-for="choice in choices">
        <button
        @click="answer(choice)"
        :disabled="isPaused"
        :class="choice.classes">{{ decode(choice.text) }}</button>
      </li>
    </ul>
    <button v-if="isPaused" @click="advance">Next</button>
  </div>
</template>

<script>
import { htmlEntity } from '.././htmlEntityMixin';

export default {
  mixins: [htmlEntity],
  computed: {
    aboutShow() {
      return this.$store.state.aboutShow;
    },
    choices() {
      return this.questions[this.round].choices;
    },
    // Decode HTML entities in question. Based on htmlEntity mixin
    decodedQuestion() {
      return this.decode(this.questions[this.round].question);
    },
    isPaused() {
      return this.$store.state.isPaused;
    },
    mode() {
      return this.$store.getters.mode;
    },
    // Access questions from store
    questions() {
      return this.$store.state.questions;
    },
    // Access round from store
    round() {
      return this.$store.getters.round;
    },
    turn() {
      return this.$store.getters.turn;
    },
  },
  methods: {
    // Reset board, present next question
    advance() {
      // Proceed if less than 10 rounds
      if (this.round <= 8) {
        this.$store.commit('pauseGame');
        this.$store.commit('incrementRound');
      }
      // Close About menu if open
      if (this.aboutShow) {
        this.$store.commit('aboutToggle');
      }
    },
    // Resolve answer
    answer(choice) {
      // Pause game state (effects buttons)
      this.$store.commit('pauseGame', 'pause');
      // Close About menu if open
      if (this.aboutShow) {
        this.$store.commit('aboutToggle');
      }
      // Apply button styles for correct / incorrect
      this.$store.commit('styleButtons');
      // Check mode for payload
      let mode;
      if (this.mode || this.turn === 'playerOne') {
        mode = 'playerOne';
      } else if (this.turn === 'playerTwo') {
        mode = 'playerTwo'
      }
      // Check for correct answer and score
      if (choice.answer) {
        // Score correctly
        this.$store.commit('score', {true, mode});
        // Call down the stars!
        this.$store.dispatch('starPower');
      } else {
        // Score incorrectly
        this.$store.commit('score', {false, mode});
      }
      // Check if game is over
      this.$store.commit('isGameOver');
    },
  },
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

// Desktop
@media (min-width: 600px) {
  div {
    border-radius: 25px;
    min-width: 320px;
    padding: 1em 2em 4em;
  }
}

div {
    background-color: #0277BD;
    margin-bottom: 2em;
    padding: 1em 1em 4em;
}

h3 {
    color: $color-med;
    font-size: 2.33
}

.correct {
    background-color: $color-green;
    border: 2px solid $color-green;
    color: $color-white;
}

.incorrect {
    background-color: $color-red;
    border: 2px solid $color-red;
    color: $color-white;
}
</style>
