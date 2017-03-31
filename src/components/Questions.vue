<template lang="html">
  <div>
    <h3>{{ questions[round].category }}</h3>
    <h2>{{ decoded }}</h2>
    <ul>
      <li v-for="choice in choices" @click="answer(choice)">{{ choice }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    // Combine and shuffle choices
    choices() {
      // Combine
      let choices = this.questions[this.round].incorrect_answers;
      choices.push(this.questions[this.round].correct_answer);
      // Shuffle
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
    // Decode HTML entities in question
    decoded() {
      return String(this.questions[this.round].question).replace(/&[#039]*;/g, "'").replace(/&[amp]*;/g, '&').replace(/&[quote]*;/g, '"');
    },
    // Access questions from store
    questions() {
      return this.$store.state.questions;
    },
    // Access round from store
    round() {
      return this.$store.getters.round;
    },
  },
  methods: {
    // Resolve answer
    answer(choice) {
      console.log(choice);
    },
  }
}
</script>

<style lang="scss">
@import ".././main.scss";
</style>
