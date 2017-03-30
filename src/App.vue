<template>
<main>
  <header>
    <h1>Open Trivia App</h1>
  </header>
  <app-intro v-if="!running"></app-intro>
  <app-game-board v-if="running"></app-game-board>
</main>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import Intro from './components/Intro.vue';
export default {
  data() {
    return {
      running: false,
    }
  },
  components: {
    'app-game-board': GameBoard,
    'app-intro': Intro,
  }
}
</script>

<style lang="scss">@import "main.scss";
body {
    background-color: $color-med;
    color: $color-white;
    display: flex;
    font-family: 'Quicksand', sans-serif;
    justify-content: center;
    text-align: center;
}
</style>
