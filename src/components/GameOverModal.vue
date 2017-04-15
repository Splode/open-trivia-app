<template lang="html">
  <div class="modal fade-in">
    <div class="container slide-in">
      <div v-if="mode">
        <h1>Game Over!</h1>
        <h2>Score: {{ scores.playerOne }}/10</h2>
        <p>{{ scoreMessage }}</p>
      </div>
      <div v-if="!mode">
        <h1 v-if="scores.playerOne > scores.playerTwo">Player One Wins!</h1>
        <h1 v-if="scores.playerTwo > scores.playerOne">Player Two Wins!</h1>
        <h1 v-if="scores.playerOne === scores.playerTwo">Draw!</h1>
        <h2>Player One: <span :class="scores.playerOne >= scores.playerTwo ? 'score-high' : 'score-low'">{{ scores.playerOne }}</span></h2>
        <h2>Player Two: <span :class="scores.playerTwo >= scores.playerOne ? 'score-high' : 'score-low'">{{ scores.playerTwo }}</span></h2>
      </div>
      <button @click="newGame(true)">New Game</button>
      <button v-if="!mode" @click="newGame(false)">Rematch!</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    scores() {
      return this.$store.state.scores;
    },
    // Award message for solo mode
    scoreMessage() {
      const cases = {
        0: "Ouch. Well, at least you can't go down from here.",
        1: 'Time to brush up on your trivia game.',
        2: 'Were you just guessing?',
        3: "Google is your friend. Consider it today's Encyclopedia Britannica.",
        4: "Don't worry — a 4/10 is average.",
        5: 'So-so performance. Not bad. Not great. Maybe better luck next time.',
        6: 'You may one day be a wealth of trivial knowledge. Just not today.',
        7: 'Not bad. Can you perform this well a second time?',
        8: "You're on your way to becoming a trivia master.",
        9: 'A regular trivia wiz. Nice work.',
        10: 'Holy snikes!! A perfect score! Excellent work.',
      };
      let score = this.scores.playerOne;
      if (score) {
        return cases[score];
      } else {
        return '';
      }
    }
  },
  methods: {
    newGame(payload) {
      this.$store.commit('resetGame');
      if (payload) {
        this.$store.commit('newGame');
      } else {
        this.$store.dispatch('startGame');
      }
    },
  },
}
</script>

<style lang="scss" scoped>@import ".././main.scss";

@media (hover:hover) {
  button:hover {
    background-color: $color-white;
    border: 2px solid $color-med;
    color: $color-med;
  }
}

@media (max-width: 600px) {
  .container {
    width: 85%;
  }
}

@media (min-width: 600px) {
  .container {
    width: 500px;
  }
}

button {
  background-color: $color-med;
  border: 2px solid $color-med;
  color: $color-white;
  width: 90%;
  &:first-child {
    margin-top: 2em;
  }
}

h1, p {
  color: $color-darkest;
}

h2 {
  color: $color-dark;
}

.container {
  background-color: $color-white;
  border-radius: 25px;
  color: $color-med;
  margin-top: 4em;
  padding: 2em 2.5%;
  //height: 500px;
}

.modal {
  align-items: center;
  animation: fade-in .75s ease forwards; // defined in main.scss
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.slide-in {
  animation: slide-in .75s ease forwards;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-400px);
  }
  25% {
    transform: translateY(100px);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
</style>
