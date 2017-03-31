<template>
<main>
  <header>
    <h1>Open Trivia App</h1>
  </header>

  <button @click="currentView === 'app-intro' ? currentView = 'app-game-board' : currentView = 'app-intro'">Change game</button>
  <transition name="fade" mode="out-in">
    <component :is="currentView"></component>
  </transition>

</main>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import Intro from './components/Intro.vue';
export default {
  data() {
    return {
      currentView: 'app-intro',
      running: false,
    }
  },
  components: {
    'app-game-board': GameBoard,
    'app-intro': Intro,
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
    animation: fade-in 1.5s ease;
}
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
