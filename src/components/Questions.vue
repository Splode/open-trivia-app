<template lang="html">
  <div>
    <h3>{{ questions[round].category }}</h3>
    <h2>{{ decoded }}</h2>
    <ul>
      <li v-for="choice in choices">
        <button
        @click="answer(choice)"
        :disabled="isPaused"
        :class="choice.classes">{{ choice.text }}</button>
      </li>
    </ul>
    <button v-if="isPaused" @click="advance">Next</button>
  </div>
</template>

<script>
export default {
  computed: {
    choices() {
      return this.questions[this.round].choices;
    },
    // Decode HTML entities in question
    decoded() {
      return String(this.questions[this.round].question).replace(/&[#039]*;/g, "'").replace(/&[amp]*;/g, '&').replace(/&[quote]*;/g, '"');
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
    },
    // Resolve answer
    answer(choice) {
      // Pause game state (effects buttons)
      this.$store.commit('pauseGame', 'pause');
      // Apply button styles for correct / incorrect
      this.$store.commit('styleButtons');
      // Check for correct answer and score
      let payload;
      if (choice.answer) {
        if (this.mode || this.turn === 'playerOne') {
          payload = 'playerOne';
        } else if (this.turn === 'playerTwo') {
          payload = 'playerTwo'
        }
        // Increase score if correct
        this.$store.commit('incrementScore', payload);
      } else {
        console.log('incorrect');
      }
      // Check if game is over
      this.$store.commit('isGameOver');
    },
  },
}
</script>

<style lang="scss">
@import ".././main.scss";
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
