<template lang="html">
  <div>
    <h3>{{ questions[round].category }}</h3>
    <h2>{{ decoded }}</h2>
    <ul>
      <li v-for="choice in choices">
        <button
        @click="answer(choice)"
        :disabled="choice.disabled"
        :class="choice.classes">{{ choice.text }}</button>
      </li>
    </ul>
    <button v-if="!active" @click="advance">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true, // Is game state paused?
    }
  },
  computed: {
    // Compile and shuffle choices for current question
    choices() {
      // Create array of choice objects, false answers
      // Object contains class, disabled property bind, text, and id
      let choices = this.questions[this.round].incorrect_answers.reduce((acc, item) => {
        acc.push({
          text: item,
          answer: false,
          disabled: !this.active,
          classes: {
            incorrect: this.active ? false : true,
          }
        });
        return acc;
      }, []);
      // Add correct answer
      choices.push({
        text: this.questions[this.round].correct_answer,
        answer: true,
        disabled: !this.active,
        classes: {
          correct: this.active ? false : true,
        }
      });
      return choices;
    },
    // Decode HTML entities in question
    decoded() {
      return String(this.questions[this.round].question).replace(/&[#039]*;/g, "'").replace(/&[amp]*;/g, '&').replace(/&[quote]*;/g, '"');
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
    shuffled() {
      // Shuffle choices
      let choices = this.choices;
      let i = choices.length, temp, rand;
      while (0 !== i) {
        rand = Math.floor(Math.random() * i);
        i -= 1;
        temp = choices[i];
        choices[i] = choices[rand];
        choices[rand] = temp;
      }
      return choices;
    },
    turn() {
      return this.$store.getters.turn;
    },
  },
  methods: {
    // Resolve answer
    // IDEA: check should be in answer()
    answer(choice) {
      // Pause game state (effects buttons)
      this.active = false;
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
    },
    // Reset board, present next question
    advance() {
      // Proceed if less than 10 rounds
      if (this.round <= 8) {
        this.active = true; // Unpause game state
        this.$store.commit('incrementRound');
      }
    },
  }
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
