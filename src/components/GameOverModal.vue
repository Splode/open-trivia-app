<template lang="html">
  <div class="modal fade-in">
    <div class="container slide-in">
      <div v-if="mode">
        <h1>Game Over!</h1>
        <h2>Score: {{ scores.playerOne }}/10</h2>
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
  data() {
    return {
      modalClasses: {
        'slide-in': true,
        'slide-out': false,
      }
    }
  },
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    scores() {
      return this.$store.state.scores;
    },
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

button {
  background-color: $color-med;
  border: 2px solid $color-med;
  color: $color-white;
  &:hover {
    background-color: $color-white;
    border: 2px solid $color-med;
    color: $color-med;
  }
}

.container {
  background-color: $color-white;
  border-radius: 25px;
  color: $color-med;
  margin-top: 4em;
  width: 500px;
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
