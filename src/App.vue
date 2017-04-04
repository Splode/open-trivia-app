<template>
<div class="container">
  <app-game-over-modal v-if="isGameOver"></app-game-over-modal>
  <main>
    <header>
      <h1>Open Trivia App</h1>
    </header>

    <transition name="fade" mode="out-in">
      <component :is="currentView"></component>
    </transition>

  </main>
</div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import GameOverModal from './components/GameOverModal.vue';
import Intro from './components/Intro.vue';
export default {
  components: {
    'app-game-board': GameBoard,
    'app-game-over-modal': GameOverModal,
    'app-intro': Intro,
  },
  computed: {
    currentView() {
      return this.$store.state.currentView;
    },
    isGameOver() {
      return this.$store.state.isGameOver;
    }
  },
  created() {
    // Fetch categories from open trivia using vue-resource, send to store
    this.$http.get('https://opentdb.com/api_category.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.$store.state.categories = data.trivia_categories;
      });
  }
}
</script>

<style lang="scss">@import "main.scss";
body {
    //background-color: $color-med;
    background-image: $back-gradient;
    color: $color-white;
    display: flex;
    font-family: 'Quicksand', sans-serif;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

main {
    animation: fade-in 1.5s ease; // defined in main.scss
}

.container {
  width: 100%;
}
</style>
