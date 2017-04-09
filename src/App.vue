<template>
<div class="container">
  <app-game-over-modal v-if="isGameOver"></app-game-over-modal>
  <main>
    <header>
      <h1 :class="classHeader">Winsome Trivia</h1>
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
import Loader from './components/Loader.vue';
export default {
  components: {
    'app-game-board': GameBoard,
    'app-game-over-modal': GameOverModal,
    'app-intro': Intro,
    'app-loader': Loader,
  },
  computed: {
    currentView() {
      return this.$store.state.currentView;
    },
    isGameOver() {
      return this.$store.state.isGameOver;
    },
    classHeader() {
      let classHeader = {
        grow: this.currentView === 'app-intro',
        small: this.currentView !== 'app-intro',
      }
      return classHeader;
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
    background-color: $color-dark;
    //background-image: $back-gradient;
    color: $color-white;
    display: flex;
    font-family: 'Quicksand', sans-serif;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

header {
    background-color: $color-darkest;
    color: $color-white;
    width: 100%;
}

main {
    align-items: center;
    animation: fade-in 1.5s ease; // defined in main.scss
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.container {
    width: 100%;
}

.grow {
    animation: grow 0.5s ease forwards;
}

.small {
    animation: squeeze 0.5s ease forwards;
}
@keyframes grow {
    from {
        margin: 0.25em 0;
    }
    to {
        margin: 1em;
    }
}
@keyframes squeeze {
    from {
        margin: 1em;
    }
    to {
        margin: 0.25em 0;
    }
}
</style>
